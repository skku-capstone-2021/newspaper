# -*- coding: utf-8 -*-
"""
Created on Sat Nov 27 19:21:16 2021

@author: minwoo
"""

import pandas as pd
import os

# test csv파일 생성
news = pd.read_csv("news.csv", encoding='utf-8')
news[['id', 'content']].rename(columns={'id':'Body ID', 'content':'articleBody'}).to_csv('./fnc-1/tree_model/test_bodies_processed.csv', index=False, encoding='utf-8')
news[['title','id']].rename(columns={'title':'Headline', 'id':'Body ID'}).to_csv('./fnc-1/tree_model/test_stances_unlabeled.csv', index=False, encoding='utf-8')

# 필요한 모듈 다운
os.system('pip install -r ./fnc-1/requirements.txt')

# pretrained word2vec 다운
os.system('wget -c https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz -O ./fnc-1/GoogleNews-vectors-negative300.bin.gz')
os.system('gzip -dc ./fnc-1/GoogleNews-vectors-negative300.bin.gz >> ./fnc-1/tree_model/GoogleNews-vectors-negative300.bin')

# pickle 파일 생성
os.system('python ./fnc-1/tree_model/generateFeatures.py')
# a = os.popen('python2.7 ./fnc-1/tree_model/generateFeatures.py').read()
# print(a)

# test 결
os.system('python ./fnc-1/tree_model/xgb_train_cvBodyId.py')
# b = os.popen('python2.7 ./fnc-1/tree_model/xgb_train_cvBodyId.py').read()
# print(b)