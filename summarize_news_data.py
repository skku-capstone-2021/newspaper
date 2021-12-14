# -*- coding: utf-8 -*-


import numpy as np
import gensim


glove_dict = dict()
f = open('glove.6B.100d.txt', encoding="utf8") 

for line in f:
    word_vector = line.split()
    word = word_vector[0]
    word_vector_arr = np.asarray(word_vector[1:], dtype='float32') 
    glove_dict[word] = word_vector_arr
f.close()

embedding_dim = 100
zero_vector = np.zeros(embedding_dim)

def calculate_sentence_vector(sentence):
  return sum([glove_dict.get(word, zero_vector) 
                  for word in sentence])/len(sentence)

import re
import pandas as pd
import matplotlib.pyplot as plt
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
import networkx as nx

import nltk 
nltk.download('stopwords')
nltk.download('punkt')

stop_words = stopwords.words('english')

data = pd.read_csv("news.csv", encoding= 'utf-8')

data.rename(columns={'Unnamed: 0':'idx'}, inplace=True)
nanidx = []
for i in range(len(data)):
  if type(data.iloc[i]['content']) != str:
    nanidx.append(data.iloc[i]['idx'])
print(nanidx)
data = data.drop(index=nanidx)

data = data[['content']]
data['sentences'] = data['content'].apply(sent_tokenize)


def tokenization(sentences):
    return [word_tokenize(sentence) for sentence in sentences]

def preprocess_sentence(sentence):
  sentence = [re.sub(r'[^a-zA-z\s]', '', word).lower() for word in sentence]
  return [word for word in sentence if word not in stop_words and word]

def preprocess_sentences(sentences):
    return [preprocess_sentence(sentence) for sentence in sentences]

data['tokenized_sentences'] = data['sentences'].apply(tokenization)
data['tokenized_sentences'] = data['tokenized_sentences'].apply(preprocess_sentences)
data['tokenized_sentences']

embedding_dim = 100
zero_vector = np.zeros(embedding_dim)

def calculate_sentence_vector(sentence):
  if len(sentence) != 0:
    return sum([glove_dict.get(word, zero_vector) 
                  for word in sentence])/len(sentence)
  else:
    return zero_vector

def sentences_to_vectors(sentences):
    return [calculate_sentence_vector(sentence) 
              for sentence in sentences]

data['SentenceEmbedding'] = data['tokenized_sentences'].apply(sentences_to_vectors)
data[['SentenceEmbedding']]

def similarity_matrix(sentence_embedding):
  sim_mat = np.zeros([len(sentence_embedding), len(sentence_embedding)])
  for i in range(len(sentence_embedding)):
      for j in range(len(sentence_embedding)):
        sim_mat[i][j] = cosine_similarity(sentence_embedding[i].reshape(1, embedding_dim),
                                          sentence_embedding[j].reshape(1, embedding_dim))[0,0]
  return sim_mat

data['SimMatrix'] = data['SentenceEmbedding'].apply(similarity_matrix)


def calculate_score(sim_matrix):
    nx_graph = nx.from_numpy_array(sim_matrix)
    scores = nx.pagerank_numpy(nx_graph)
    return scores

data['score'] = data['SimMatrix'].apply(calculate_score)

def ranked_sentences(sentences, scores, n=3):
    top_scores = sorted(((scores[i],s) 
                         for i,s in enumerate(sentences)), 
                                reverse=True)
    top_n_sentences = [sentence 
                        for score,sentence in top_scores[:n]]
    return " ".join(top_n_sentences)

data['summary'] = data.apply(lambda x: 
                            ranked_sentences(x.sentences, 
                            x.score), axis=1)


df = pd.read_csv("news.csv", encoding='utf-8')
df['short_content'] = data['summary']
df.to_csv("news.csv",encoding="utf-8")