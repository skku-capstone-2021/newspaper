# -*- coding: utf-8 -*-
"""
Created on Sat Nov 27 19:21:16 2021

@author: minwoo
"""

import pandas as pd
import os

news = pd.read_csv("news.csv", encoding='utf-8')
news[['id', 'content']].rename(columns={'id':'Body ID', 'content':'articleBody'}).to_csv('./fnc-1/tree_model/test_bodies_processed.csv', index=False, encoding='utf-8')
news[['title','id']].rename(columns={'title':'Headline', 'id':'Body ID'}).to_csv('./fnc-1/tree_model/test_stances_unlabeled.csv', index=False, encoding='utf-8')
    
os.system('python2.7 ./fnc-1/tree_model/generateFeatures.py')
# a = os.popen('python2.7 ./fnc-1/tree_model/generateFeatures.py').read()
# print(a)
os.system('python2.7 ./fnc-1/tree_model/xgb_train_cvBodyId.py')
# b = os.popen('python2.7 ./fnc-1/tree_model/xgb_train_cvBodyId.py').read()
# print(b)

