import { FC, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
import { Good } from "@/assets";
import { sendPost } from "@/lib/utils/api";
import { alert } from "@/lib/utils/alert";

import {
  Header,
  NewsPaper,
  Title,
  Keywords,
  Keyword,
  Category,
  Buttons,
  Level,
  Flex,
  Date,
  Horizon,
  MainImg,
  ContentWrapper,
  Content,
  More,
} from "./index.style";

interface Props {
  newsItem: {
    category: any;
    company: any;
    confidence: any;
    content: any;
    created_at: any;
    date: any;
    idx: any;
    img_url: any;
    keywords: any;
    recommend: any;
    result: any;
    short_content: any;
    title: any;
    updated_at: any;
    url: any;
  };
}

const NewsContent: FC<Props> = ({ newsItem }) => {
  const [isEntire, setIsEntire] = useState<boolean>(false);

  const parsing = (keystr: any) => {
    if (typeof keystr === "string") {
      let sliced = keystr.slice(1, keystr.length - 1);
      sliced = sliced.replace(/'/gi, "");
      sliced = sliced.replace(/ /gi, "");
      return sliced.split(",").slice(0, 4);
    }

    if (keystr[0][0] === "[") {
      for (let i = 0; i < keystr.length; i += 1) {
        if (i === 0) {
          keystr[i] = keystr[i].slice(2, keystr[i].length - 1);
        } else if (i === keystr.length - 1) {
          keystr[i] = keystr[i].slice(2, keystr[i].length - 2);
        } else {
          keystr[i] = keystr[i].slice(2, keystr[i].length - 1);
        }
      }
      return keystr.slice(0, 4);
    }
    return keystr.slice(0, 4);
  };

  useEffect(() => {
    setIsEntire(false);
    if (Cookies.get("id")) {
      sendPost("/view/add", {
        article: newsItem.idx,
        user: Cookies.get("id"),
      });
    }
  }, [newsItem]);

  const handleScrap = () => {
    sendPost("/scrap/add", {
      user: Cookies.get("id"),
      article: newsItem.idx,
    }).then((res) => {
      if (res.data.message) {
        alert(res.data.message);
      } else {
        alert("scrap complete");
      }
    });
  };

  return (
    <>
      <Header>
        <Flex>
          <div>
            <NewsPaper>{newsItem.company}</NewsPaper>
            <Title>{newsItem.title}</Title>
          </div>
          <Level src={Good} />
        </Flex>
        <Flex>
          <Keywords>
            {parsing(newsItem.keywords).map((item, key) => (
              <Keyword key={key}>{item}</Keyword>
            ))}
          </Keywords>
          <Category>{newsItem.category}</Category>
        </Flex>
        <Flex>
          <Buttons>
            {newsItem.url && (
              <Button variant="outlined" color="primary">
                <a href={`${newsItem.url}`}>
                  <div>original</div>
                </a>
              </Button>
            )}
            {Cookies.get("id") && (
              <Button variant="outlined" color="primary">
                <div onClick={handleScrap}>scrap</div>
              </Button>
            )}
          </Buttons>
          <Date>{newsItem.date.split("T")[0]}</Date>
        </Flex>
      </Header>
      <Horizon />
      <MainImg src={newsItem.img_url || newsItem.imgUrl} />
      <ContentWrapper>
        {!isEntire ? (
          <div>
            <Content>{newsItem.short_content || newsItem.shortContent}</Content>
            <More
              onClick={() => {
                setIsEntire(true);
              }}
            >
              show full article
            </More>
          </div>
        ) : (
          <Content>{newsItem.content}</Content>
        )}
      </ContentWrapper>
    </>
  );
};

export default NewsContent;
