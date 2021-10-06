import { FC, useState } from "react";
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
    company: string;
    title: string;
    keywords: string[];
    score: number;
    category: string;
    origin: string;
    date: string;
    img: string;
    shortContent: string;
    content: string;
  };
}

const NewsContent: FC<Props> = ({ newsItem }) => {
  const [isEntire, setIsEntire] = useState<boolean>(false);

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
            {newsItem.keywords.map((item, key) => (
              <Keyword key={key}>{item}</Keyword>
            ))}
          </Keywords>
          <Category>{newsItem.category}</Category>
        </Flex>
        <Flex>
          <Buttons>
            <Button variant="outlined" color="primary">
              <a href="https://www.naver.com">
                <div>original</div>
              </a>
            </Button>
            <Button variant="outlined" color="primary">
              <a>scrap</a>
            </Button>
          </Buttons>
          <Date>{newsItem.date}</Date>
        </Flex>
      </Header>
      <Horizon />
      <MainImg src={newsItem.img} />
      <ContentWrapper>
        {!isEntire ? (
          <div>
            <Content>{newsItem.shortContent}</Content>
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
