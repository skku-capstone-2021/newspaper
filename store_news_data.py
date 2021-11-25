import pymysql
import pandas as pd


# DB에 저장
def store_news(df):
  db=pymysql.connect(host='capstone-2021-2.cpiljtsxt8un.ap-northeast-2.rds.amazonaws.com',
                 user='admin',
                 password='capstone423!',
                 db='capstone2')
  cursor=db.cursor()
  cursor.execute("SELECT idx FROM article ORDER BY idx DESC LIMIT 1")
  last_id=cursor.fetchall()[0][0]

  # recommend id 부분 조정
  df['recommend']=df['recommend'].apply(lambda rec_list: [x+last_id+1 for x in rec_list])

  sql="INSERT INTO article (title,company,category,keywords,content,short_content,img_url,date,url,confidence,result,recommend,stance) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

  for i in range(len(df)):
    val=(df['title'][i],df['company'][i],df['category'][i],str(df['keywords'][i]),df['content'][i],df['short_content'][i],df['img_url'][i],df['date'][i],df['url'][i],df['confidence'][i],df['result'][i],str(df['recommend'][i]),df['stance'][i])
    cursor.execute(sql,val)
    db.commit()

  db.close()


df=pd.read_csv("news.csv",encoding="utf-8")
store_news(df)