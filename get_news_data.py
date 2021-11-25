import nltk
nltk.download('punkt')

import requests
import pandas as pd
from newspaper import Article
import nltk

nltk.download('punkt')

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# API에서 오늘 뉴스 가져오는 함수
def get_news():
    # set Bing News Search API key and url
    subscription_key = "5983e63b7551479e960cbeb1cd62e616"

    # set parameters for query
    search_url = "https://api.bing.microsoft.com/v7.0/news/search"
    headers = {"Ocp-Apim-Subscription-Key": subscription_key}

    # save data into dataframe
    df = pd.DataFrame(
        columns=['title', 'company', 'category', 'keywords', 'content', 'img_url', 'date', 'url', 'short'])

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
                short = object.get("description")

                # validation check
                if (title is None) or (company is None) or (category is None) or (keywords is None) or (
                        content is None) or (date is None) or (url is None) or (short is None):
                    continue

                if image is None:
                    df.loc[len(df)] = [title, company, category, keywords, content, image, date, url, short]

                else:
                    image = image.get("thumbnail")

                    # image width and height 조절
                    contentUrl = image.get("contentUrl")
                    height = image.get("height")
                    width = image.get("width")
                    img_url = contentUrl + "%height=" + str(height) + "%width=" + str(width)

                    df.loc[len(df)] = [title, company, category, keywords, content, img_url, date, url, short]

            except Exception:
                pass

    # 중복 제거
    df = df.drop_duplicates(['url'], keep='first', ignore_index=True)

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


# 뉴스 가져오기
df = get_news()

# 뉴스 3개 추천
result = df['keywords'].apply(lambda x: " ".join(x))

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(result)
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

recommend = []
for i in range(len(df)):
    recommend.append(recommend_news(i))

# 뉴스 컬럼 추가
df['recommend'] = recommend

# csv 파일로 저장
df.to_csv("news.csv", encoding="utf-8")