from flask import Flask 
import matplotlib.pyplot as plt
import json


app = Flask(__name__)

@app.route('/wordcloud', methods=['POST'])
def run_wordcloud():
    # keywords = request.files['files'] # keywords들은 파일의 형태로 전달된다고 가정.
    spwords = set(STOPWORDS)

    with open("./text.json", "r") as f: # 아직 keywords가 없으므로 test를 위해서 현재 디렉토리에 있는 text.json 파일을 사용.
        text = json.load(f)
    text = text[0]["text"]

    wc = WordCloud(max_font_size=200, stopwords=spwords, background_color='white', width=800, height=800)
    wc.generate(text)

    plt.figure(figsize=(10, 8))
    plt.imshow(wc)
    plt.tight_layout(pad=0)
    plt.axis('off')
    plt.savefig("./word.jpg")
    return "success" # 일단은 wordcloud를 이미지로 변환해서 로컬에 저장. 이미지 자체를 리턴해야 한다면 추후에 수정.
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8888, debug=False)
