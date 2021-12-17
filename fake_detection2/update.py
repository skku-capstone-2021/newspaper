import nltk
import requests
import pandas as pd
from newspaper import Article
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np
import torch
import torch.nn as nn
import torch.utils.data as data_utils
from transformers import BertTokenizer
import gc #garbage collector for gpu memory 
import pymysql
import argparse
import logging
from datetime import datetime
import time
import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import networkx as nx
import os

logger = logging.getLogger("update")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("./update.log")
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)



# API에서 오늘 뉴스 가져오는 함수
def get_news():
    # set Bing News Search API key and url
    subscription_key = "5983e63b7551479e960cbeb1cd62e616"

    # set parameters for query
    search_url = "https://api.bing.microsoft.com/v7.0/news/search"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}

    # save data into dataframe
    df = pd.DataFrame(
        columns=['title', 'company', 'category', 'keywords', 'content', 'img_url', 'date', 'url'])

    for i in range(3):
        offset = 100 * i
        params = {"mkt": "en-US", "count": "100", "offset": str(offset), "sortBy": "Date"}
        response = requests.get(search_url, headers=headers, params=params)

        jsonObjects = response.json().get("value")
        for object in jsonObjects:
            try:
                url = object.get("url")
                if url is None:
                    continue

                article = Article(url)
                article.download()
                article.parse()
                content = article.text

                article.nlp()
                keywords = article.keywords

                title = object.get("name")
                company = object.get("provider")[0].get("name")
                category = object.get("category")

                image = object.get("image")
                date = object.get("datePublished")[:19]

                # validation check
                if (title is None) or (company is None) or (category is None) or (keywords is None) or (
                        content is None) or (date is None) or (url is None):
                    continue

                if image is None:
                    df.loc[len(df)] = [title, company, category, keywords, content, image, date, url]

                else:
                    image = image.get("thumbnail")

                    # image width and height 조절
                    contentUrl = image.get("contentUrl")
                    height = image.get("height")
                    width = image.get("width")
                    img_url = contentUrl + "%height=" + str(height) + "%width=" + str(width)

                    df.loc[len(df)] = [title, company, category, keywords, content, img_url, date, url]

            except Exception:
                pass

    # 중복 제거
    df = df.drop_duplicates(['url'], keep='first', ignore_index=True)
    _len = len(df)
    now = datetime.now()
    hour = now.hour
    minute = now.minute
    day = now.day
    dup_idx = []
    for i in range(_len): # 12시 넘은것도 생각해야 함..
        _time = df.iloc[i]['date'].split('T')[-1]
        date = df.iloc[i]['date'].split('T')[0]
        t_h = int(_time.split(':')[0])
        t_m = int(_time.split(':')[1])
        t_d = int(date.split('-')[-1])

        if day == t_d: # 같은날짜. 그럼 시간만 비교하면 됨
            if hour - t_h <= 3:
                continue
            elif hour - t_h == 4:
                if t_m > minute:
                    continue

        elif day > t_d: # 어제 나온 뉴스. 그러면 0, 1, 2, 3시에만 효력이 있음
            if hour <= 3:
                if hour + 24 - t_h <=3:
                    continue
                elif hour + 24 - t_h == 4:
                    if t_m > minute:
                        continue

        dup_idx.append(i)
    
    df = df.drop(index=dup_idx, axis=0)
    logger.info(f"{len(dup_idx)} news are duplicated. They are dropped.")
    logger.info(f"{len(df)} news will be updated.")

    # 맨 앞에 id 컬럼 추가
    df['id'] = range(1, len(df) + 1)
    col1 = [df.columns[-1]]
    col2 = list(df.columns[:-1])
    df = df[col1 + col2]
    return df


# 뉴스의 인덱스를 받아 가장 유사한 3개의 뉴스의 인덱스 리턴
def recommend_news(index):
    sim_scores = list(enumerate(cosine_sim[index]))

    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:4]

    news_indices = [i[0] for i in sim_scores]
    return news_indices


#2. fake model 1
def format_tensors(text_data, mask, labels, batch_size):
    X = torch.from_numpy(text_data)
    X = X.long()
    mask = torch.tensor(mask)
    y = torch.from_numpy(labels)
    y = y.long()
    tensordata = data_utils.TensorDataset(X, mask, y)
    loader = data_utils.DataLoader(tensordata, batch_size=batch_size, shuffle=False)
    return loader

def fake_detection_1(test_set):
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    tokenizer = BertTokenizer.from_pretrained('bert-large-cased')
    model = torch.load("fake2.pt")
    tokenized_df = list(map(lambda t: ['[CLS]'] + tokenizer.tokenize(t)[:510] + ['[SEP]'], test_set['text']))

    totalpadlength = 512
    indexed_tokens = list(map(tokenizer.convert_tokens_to_ids, tokenized_df))
    index_padded = np.array([xi+[0]*(totalpadlength-len(xi)) for xi in indexed_tokens])
    target = test_set['target'].values
    target_variable =  [1 if value == "REAL" else 0 for value in target] # 0 = Fake   1 = Real
    target_variable = np.array(target_variable)

    all_words = []
    for l in tokenized_df:
        all_words.extend(l)
    all_indices = []
    for i in indexed_tokens:
        all_indices.extend(i)

    BATCH_SIZE = 16
    X_test = index_padded
    y_test = target_variable
    test_masks = index_padded
    testloader = format_tensors(X_test, test_masks, y_test, BATCH_SIZE)


    def format_tensors2(text_data, mask, labels):
        X = torch.from_numpy(text_data)
        X = X.long()
        mask = torch.tensor(mask)
        y = torch.from_numpy(labels)
        y = y.long()
        return X, mask, y
    X_test, test_masks, y_test = format_tensors2(X_test, test_masks, y_test)

    test_predictions = torch.zeros((len(y_test),1))
    test_predictions_percent = torch.zeros((len(y_test),1))
    with torch.no_grad():
        for i, batch in enumerate(testloader):
            token_ids, masks, labels = tuple(t.to(device) for t in batch)
            yhat = model(input_ids=token_ids, attention_mask=masks, labels=labels)
            yhat = yhat["logits"]
            prediction = (torch.sigmoid(yhat[:,1]) > 0.5).long().view(-1,1)
            test_predictions[i*BATCH_SIZE:(i+1)*BATCH_SIZE] = prediction
            test_predictions_percent[i*BATCH_SIZE:(i+1)*BATCH_SIZE] = torch.sigmoid(yhat[:,1]).view(-1,1)


    X_test_words = test_set['text']
    final_results = X_test_words.to_frame().reset_index(drop=True)
    final_results['predicted'] = np.array(test_predictions.reshape(-1), dtype=int).tolist()
    final_results['confidence'] = np.array(test_predictions_percent.reshape(-1), dtype=float).tolist()

    for i, t in enumerate(final_results["confidence"]):
        new_t = t
        if t < 0.5: # False인 애들..
            new_t = 1 - t
        new_t *= 100
        final_results["confidence"][i] = new_t


    pred = []
    confid = []
    for row in final_results.itertuples():
        pred.append(row[2])
        confid.append(row[3])
    
    return pred, confid

def store_news(df):
  db=pymysql.connect(host='capstone-2021-2.cpiljtsxt8un.ap-northeast-2.rds.amazonaws.com',
                 user='admin',
                 password='capstone423!',
                 db='capstone2')
  cursor=db.cursor()
  cursor.execute("SELECT idx FROM article ORDER BY idx DESC LIMIT 1")
  last_id=cursor.fetchall()[0][0]

  # recommend id 부분 조정
  df['recommend']=df['recommend'].apply(lambda rec_list: [x+last_id+1 for x in eval(rec_list)])
  df = df.where((pd.notnull(df)), None)
  sql="INSERT INTO article (title,company,category,keywords,content,short_content,img_url,date,url,confidence,result,recommend,stance) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

  for i in range(len(df)):
    val=(df['title'][i],df['company'][i],df['category'][i],str(df['keywords'][i]),df['content'][i],df['short_content'][i],df['img_url'][i],df['date'][i],df['url'][i],df['confidence'][i],df['result'][i],str(df['recommend'][i]),df['stance'][i])
    cursor.execute(sql,val)
    db.commit()

  db.close()

def tokenization(sentences):
    return [word_tokenize(sentence) for sentence in sentences]

def preprocess_sentence(sentence):
  sentence = [re.sub(r'[^a-zA-z\s]', '', word).lower() for word in sentence]
  return [word for word in sentence if word not in stop_words and word]

def preprocess_sentences(sentences):
    return [preprocess_sentence(sentence) for sentence in sentences]

glove_dict = dict()
def calculate_sentence_vector(sentence):
  if len(sentence) != 0:
    return sum([glove_dict.get(word, zero_vector) 
                  for word in sentence])/len(sentence)
  else:
    return zero_vector

def sentences_to_vectors(sentences):
    return [calculate_sentence_vector(sentence) 
              for sentence in sentences]


def similarity_matrix(sentence_embedding):
  sim_mat = np.zeros([len(sentence_embedding), len(sentence_embedding)])
  for i in range(len(sentence_embedding)):
      for j in range(len(sentence_embedding)):
        sim_mat[i][j] = cosine_similarity(sentence_embedding[i].reshape(1, embedding_dim),
                                          sentence_embedding[j].reshape(1, embedding_dim))[0,0]
  return sim_mat


def calculate_score(sim_matrix):
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank_numpy(nx_graph)
    return scores
def ranked_sentences(sentences, scores, n=3):
    top_scores = sorted(((scores[i],s) 
                         for i,s in enumerate(sentences)), 
                                reverse=True)
    top_n_sentences = [sentence 
                        for score,sentence in top_scores[:n]]
    return " ".join(top_n_sentences)



if __name__ == "__main__":
    nltk.download('stopwords')
    nltk.download('punkt')

    stop_words = stopwords.words('english')
    f = open('glove.6B.100d.txt', encoding="utf8") 

    for line in f:
        word_vector = line.split()
        word = word_vector[0]
        word_vector_arr = np.asarray(word_vector[1:], dtype='float32') 
        glove_dict[word] = word_vector_arr
    f.close()

    embedding_dim = 100
    zero_vector = np.zeros(embedding_dim)
    while True:
        logger.info("update start")
        df = get_news()
        logger.info("Got news from Bing")
        data = df

        #0. summary
        data.rename(columns={'Unnamed: 0':'idx'}, inplace=True)
        nanidx = []
        for i in range(len(data)):
            if type(data.iloc[i]['content']) != str:
                nanidx.append(data.iloc[i]['idx'])
        data = data.drop(index=nanidx)

        data = data[['content']]
        data['sentences'] = data['content'].apply(sent_tokenize)

        data['tokenized_sentences'] = data['sentences'].apply(tokenization)
        data['tokenized_sentences'] = data['tokenized_sentences'].apply(preprocess_sentences)
        data['tokenized_sentences']

        embedding_dim = 100
        zero_vector = np.zeros(embedding_dim)
        data['SentenceEmbedding'] = data['tokenized_sentences'].apply(sentences_to_vectors)
        data[['SentenceEmbedding']]
        data['SimMatrix'] = data['SentenceEmbedding'].apply(similarity_matrix)

        data['score'] = data['SimMatrix'].apply(calculate_score)
        data['summary'] = data.apply(lambda x: 
                                    ranked_sentences(x.sentences, 
                                    x.score), axis=1)

        df['short_content'] = data['summary']

        logger.info("summarization done")
        print("summ done")


        # 1. 뉴스 추천
        result = df['keywords'].apply(lambda x: " ".join(x))
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(result)
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        recommend = []
        for i in range(len(df)):
            recommend.append(recommend_news(i))

        df['recommend'] = recommend
        logger.info("Recommendation done")

        data_fake2 = df[["id", "content"]]
        data_fake2.columns=["id", "text"]

        data_fake2["target"] = ""
        
        pred, confid = fake_detection_1(data_fake2)
        logger.info("Fake news detection 2 done")
        torch.cuda.empty_cache() 
        gc.collect() 
        label = ["REAL" if p == 1 else "FAKE" for p in pred]
        df["result"] = label
        df["confidence"] = confid
        print(type(df['recommend'].iloc[10]))
        print(df['recommend'].iloc[10])
        print(type(df['recommend'].iloc[10][0]))
        print(df['recommend'].iloc[10][0])

        df.to_csv("news.csv", encoding="utf-8") # 일단은 이렇게 해서 fake 1에 전달



        df[['id', 'content']].rename(columns={'id':'Body ID', 'content':'articleBody'}).to_csv('./fnc-1/tree_model/test_bodies_processed.csv', index=False, encoding='utf-8')
        df[['title','id']].rename(columns={'title':'Headline', 'id':'Body ID'}).to_csv('./fnc-1/tree_model/test_stances_unlabeled.csv', index=False, encoding='utf-8')
        os.system('python ./fnc-1/tree_model/generateFeatures.py') # 여기서 어떻게 df를 전달할까... 일단은 세ㅣㅇ브로 하자
        os.system('python ./fnc-1/tree_model/xgb_train_cvBodyId.py')
        df = pd.read_csv("news.csv", encoding='utf-8') # 이렇게 python2랑 주고받고 다시 df를 불러옴
        logger.info("Fake news detection 1 done")
        print("after!!!")
        print(type(df['recommend'].iloc[10]))
        print(df['recommend'].iloc[10])
        print(type(df['recommend'].iloc[10][0]))
        print(df['recommend'].iloc[10][0])
        store_news(df)


        logger.info("update done")
        print("sleep..")
        time.sleep(60*60*4)

        # csv 파일로 저장
