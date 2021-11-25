# 실행 순서

## 1. 수경: 뉴스 데이터 가져오기
   pip install -r requirements.txt 실행  
   python get_news_data.py 실행  

![image](https://user-images.githubusercontent.com/90438627/143405519-a071362c-aead-4543-9bac-fad21870d2e7.png)
위 dataframe -> 같은 디렉토리에 "news.csv" 파일로 저장됨
    
## 2. 동환님  
   "short_content" 컬럼 채운 후 
   df.to_csv("news.csv",encoding="utf-8")
       
## 3. (이)병현님
   "result","confidence" 컬럼 채운 후 df.to_csv("news.csv",encoding="utf-8")  
       
## 4. 민우님   
   "stance" 컬럼 채운 후 df.to_csv("news.csv",encoding="utf-8")
   
       
## 5. 뉴스 데이터 저장   
   python store_news_data.py 실행
