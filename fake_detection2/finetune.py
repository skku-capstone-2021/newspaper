import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from sklearn.model_selection import train_test_split
import torch.utils.data as data_utils
import torch.optim as optim
import gc #garbage collector for gpu memory 
from tqdm import tqdm
from transformers import BertForSequenceClassification, BertTokenizer
import logging
from sklearn.metrics import accuracy_score, f1_score
import pymysql

"""
Train + Finetune
"""


host = "capstone-2021-2.cpiljtsxt8un.ap-northeast-2.rds.amazonaws.com"
db = "capstone2"
user = "admin"
pw = "capstone423!"
conn = pymysql.connect(host=host, user=user, passwd=pw, db=db)
cursor = conn.cursor(pymysql.cursors.DictCursor)
logger = logging.getLogger("Roberta")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("./fake2.log")
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

kaggle_data = pd.read_csv("kaggle2_processed_v3.csv",header=None, error_bad_lines=False, skiprows=1, low_memory=False)
train_set = pd.DataFrame(kaggle_data, columns=[0, 1, 3, 4])
train_set.columns = ["source", "title", "text", "target"]

tokenizer = BertTokenizer.from_pretrained('bert-large-cased')
model = BertForSequenceClassification.from_pretrained('bert-large-cased')
model = nn.DataParallel(model)
tokenized_df = list(map(lambda t: ['[CLS]'] + tokenizer.tokenize(t)[:510] + ['[SEP]'], train_set['text']))

totalpadlength = 512
indexed_tokens = list(map(tokenizer.convert_tokens_to_ids, tokenized_df))
index_padded = np.array([xi+[0]*(totalpadlength-len(xi)) for xi in indexed_tokens])

target = train_set['target'].values
target_variable =  [1 if value == "REAL" else 0 for value in target] # 0 = Fake   1 = Real
target_variable = np.array(target_variable)

all_words = []
for l in tokenized_df:
  all_words.extend(l)
all_indices = []
for i in indexed_tokens:
  all_indices.extend(i)

word_to_ix = dict(zip(all_words, all_indices))
ix_to_word = dict(zip(all_indices, all_words))
mask_variable = [[float(i>0) for i in ii] for ii in index_padded]


def format_tensors(text_data, mask, labels, batch_size):
    X = torch.from_numpy(text_data)
    X = X.long()
    mask = torch.tensor(mask)
    y = torch.from_numpy(labels)
    y = y.long()
    tensordata = data_utils.TensorDataset(X, mask, y)
    loader = data_utils.DataLoader(tensordata, batch_size=batch_size, shuffle=False)
    return loader

BATCH_SIZE = 24
TRAINING_EPOCHS = 10
data_path = "./"

X_train, X_test, y_train, y_test = train_test_split(index_padded, target_variable, 
                                                    test_size=0.1, random_state=42)
train_masks, test_masks, _, _ = train_test_split(mask_variable, index_padded, 
                                                       test_size=0.1, random_state=42)
trainloader = format_tensors(X_train, train_masks, y_train,BATCH_SIZE)
testloader = format_tensors(X_test, test_masks, y_test, BATCH_SIZE)





def compute_score(model, dataloader, device):
    model.eval()
    with torch.no_grad():
        for i, batch in enumerate(dataloader):
            token_ids, masks, labels = tuple(t.to(device) for t in batch)
            res = model(input_ids=token_ids, attention_mask=masks, labels=labels)
            yhat = res["logits"]
            res = 0
            prediction = (torch.sigmoid(yhat[:,1]) > 0.5).long()
            return accuracy_score(prediction.cpu(), labels.long().cpu()), f1_score(prediction.cpu(), labels.long().cpu())
        torch.cuda.empty_cache() 
        gc.collect() 

# Train
torch.cuda.empty_cache() 
gc.collect() 


logger.info("--Training--")
torch.cuda.empty_cache()
gc.collect()

loss_function = nn.BCEWithLogitsLoss()
losses = []
model.to(device)
optimizer = optim.Adam(model.parameters(), lr=3e-6)


def format_tensors2(text_data, mask, labels):
    X = torch.from_numpy(text_data)
    X = X.long()
    mask = torch.tensor(mask)
    y = torch.from_numpy(labels)
    y = y.long()
    return X, mask, y
X_test, test_masks, y_test = format_tensors2(X_test, test_masks, y_test) 


for epoch in range(TRAINING_EPOCHS):
    model.train()
    running_loss = 0.0
    iteration = 0
    for i, batch in enumerate(trainloader):
        iteration += 1
        token_ids, masks, labels = tuple(t.to(device) for t in batch)
        optimizer.zero_grad()
        res = model(input_ids=token_ids, attention_mask=masks, labels=labels)
        loss = res["loss"]
        yhat = res["logits"]
        res = 0
        loss.sum().backward()
        optimizer.step()
        running_loss += float(loss.sum().item())
        del token_ids, masks, labels
    
        if not i%25:
            print(f'Epoch: {epoch+1:03d}/{TRAINING_EPOCHS:03d} | '
                  f'Batch {i+1:03d}/{len(trainloader):03d} | '
                  f'Average Loss in last {iteration} iteration(s): {(running_loss/iteration):.4f}')

            logger.info(f'Epoch: {epoch+1:03d}/{TRAINING_EPOCHS:03d} | '
                  f'Batch {i+1:03d}/{len(trainloader):03d} | '
                  f'Average Loss in last {iteration} iteration(s): {(running_loss/iteration):.4f}')
            running_loss = 0.0
            iteration = 0

        if not i%50 and i!=0:
            with torch.set_grad_enabled(False):
                acc, f1 = compute_score(model, trainloader, device)
                logger.info(f"f1 score: {f1*100:.2f}%")
                logger.info(f"Accuracy: {acc*100:.2f}%")
                torch.save(model, f"./checkpoint/epoch{epoch+1}_cp{i}.pt")
        torch.cuda.empty_cache()
        gc.collect()
        losses.append(float(loss.sum().item()))
    with torch.set_grad_enabled(False):
        acc, f1 = compute_score(model, trainloader, device)
        logger.info(f"f1 score: {f1*100:.2f}%")
        logger.info(f"Accuracy: {acc*100:.2f}%")
    
    torch.save(model, f"./checkpoint/epoch{epoch+1}.pt")

torch.save(model.state_dict(), data_path + f"model_state_dict_{TRAINING_EPOCHS}.pt")
torch.save(model, data_path + f"model_{TRAINING_EPOCHS}.pt")

"""#### Finally, we score the final model on the test set"""


acc, f1 = compute_score(model, testloader, device)
print("Test-f1 score:", f"{f1*100:.2f}%")
logger.info(f"f1 score: {f1*100:.2f}%")
logger.info(f"Accuracy: {acc*100:.2f}%")
print("Test-Accuracy:", f"{acc*100:.2f}%")



## --- FINE TUNING



device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

mother = pd.read_csv("2nd_finetuning.csv",header=None, error_bad_lines=False, skiprows=1, low_memory=False)
finetuning_set = pd.DataFrame(mother, columns=[0, 1, 5])
finetuning_set.columns = ["source", "title", "text"]
finetuning_set["target"] = "REAL"
finetuning_set = finetuning_set

for i,t in enumerate(finetuning_set["text"]):
    if type(t) == float:
        finetuning_set = finetuning_set.drop(i)

tokenized_df = list(map(lambda t: ['[CLS]'] + tokenizer.tokenize(t)[:510] + ['[SEP]'], finetuning_set['text']))

totalpadlength = 512
indexed_tokens = list(map(tokenizer.convert_tokens_to_ids, tokenized_df))
index_padded = np.array([xi+[0]*(totalpadlength-len(xi)) for xi in indexed_tokens])

target = finetuning_set['target'].values
target_variable =  [1 if value == "REAL" else 0 for value in target] # 0 = Fake   1 = Real
target_variable = np.array(target_variable)


all_words = []
for l in tokenized_df:
  all_words.extend(l)
all_indices = []
for i in indexed_tokens:
  all_indices.extend(i)

word_to_ix = dict(zip(all_words, all_indices))
ix_to_word = dict(zip(all_indices, all_words))
mask_variable = [[float(i>0) for i in ii] for ii in index_padded]

X_train, X_test, y_train, y_test = train_test_split(index_padded, target_variable, 
                                                    test_size=0.1, random_state=42)


train_masks, test_masks, _, _ = train_test_split(mask_variable, index_padded, 
                                                       test_size=0.1, random_state=42)

trainloader = format_tensors(X_train, train_masks, y_train,BATCH_SIZE)
testloader = format_tensors(X_test, test_masks, y_test, BATCH_SIZE)



# Train
torch.cuda.empty_cache()
gc.collect() 

logger.info("--Finetuning--")
FINETUNING_EPOCHS = 3
loss_function = nn.BCEWithLogitsLoss()
losses = []
model.to(device)
optimizer = optim.Adam(model.parameters(), lr=3e-6)



for epoch in range(FINETUNING_EPOCHS):
    model.train()
    running_loss = 0.0
    iteration = 0
    for i, batch in enumerate(trainloader):
        iteration += 1
        token_ids, masks, labels = tuple(t.to(device) for t in batch)
        optimizer.zero_grad()
        res = model(input_ids=token_ids, attention_mask=masks, labels=labels)
        loss = res["loss"]
        yhat = res["logits"]
        res = 0
        
        loss.sum().backward()
        optimizer.step()
        running_loss += float(loss.sum().item())
        del token_ids, masks, labels
    
        if not i%5:
            print(f'Epoch: {epoch+1:03d}/{FINETUNING_EPOCHS:03d} | '
                  f'Batch {i+1:03d}/{len(trainloader):03d} | '
                  f'Average Loss in last {iteration} iteration(s): {(running_loss/iteration):.4f}')

            logger.info(f'Epoch: {epoch+1:03d}/{FINETUNING_EPOCHS:03d} | '
                  f'Batch {i+1:03d}/{len(trainloader):03d} | '
                  f'Average Loss in last {iteration} iteration(s): {(running_loss/iteration):.4f}')
            running_loss = 0.0
            iteration = 0

        if not i%5 and i!=0:
            torch.save(model, f"./checkpoint/epoch{epoch+1}.pt")
            with torch.set_grad_enabled(False):
                acc, f1 = compute_score(model, trainloader, device)
                logger.info(f"f1 score: {f1*100:.2f}%")
                logger.info(f"Accuracy: {acc*100:.2f}%")

                

        torch.cuda.empty_cache()
        gc.collect()
        losses.append(float(loss.sum().item()))
    with torch.set_grad_enabled(False):
        acc, f1 = compute_score(model, trainloader, device)
        logger.info(f"f1 score: {f1*100:.2f}%")
        logger.info(f"Accuracy: {acc*100:.2f}%")
    
    torch.save(model, f"./checkpoint/epoch{epoch+1}.pt")

torch.save(model, data_path + f"fake2.pt")

"""#### Finally, we score the final model on the test set"""


acc, f1 = compute_score(model, testloader, device)
print("Test-f1 score:", f"{f1*100:.2f}%")
logger.info(f"f1 score: {f1*100:.2f}%")
logger.info(f"Accuracy: {acc*100:.2f}%")
print("Test-Accuracy:", f"{acc*100:.2f}%")



