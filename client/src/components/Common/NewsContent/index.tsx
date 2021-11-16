import { FC, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Good } from "@/assets";
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
  const parsing = (keystr: string) => {
    let sliced = keystr.slice(1, keystr.length - 1);
    sliced = sliced.replace(/'/gi, "");
    sliced = sliced.replace(/ /gi, "");
    return sliced.split(",").slice(0, 4);
  };

  useEffect(() => {
    setIsEntire(false);
  }, [newsItem]);

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
            <Button variant="outlined" color="primary">
              <a>scrap</a>
            </Button>
          </Buttons>
          <Date>{newsItem.date.split("T")[0]}</Date>
        </Flex>
      </Header>
      <Horizon />
      <MainImg src={newsItem.img_url} />
      <ContentWrapper>
        {!isEntire ? (
          <div>
            <Content>{newsItem.short_content}</Content>
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
