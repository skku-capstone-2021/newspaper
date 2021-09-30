import { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Good } from "@/assets";

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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsPaper = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Keywords = styled.div`
  display: flex;
  gap: 1rem;
`;

const Keyword = styled.div`
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.2rem;
  border-radius: 15px;
  font-size: 0.8rem;
  background-color: #e9e9e9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Category = styled.div`
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1.2rem;
  font-size: 0.8rem;
  border-radius: 15px;
  background-color: #9a76fd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
`;

const Level = styled.img`
  width: 4rem;
  height: 4rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const Horizon = styled.div`
  border-bottom: 2px solid #999999;
  margin: 1rem 0;
`;

const MainImg = styled.img`
  width: 100%;
  min-height: 40vh;
`;

const ContentWrapper = styled.div`
  margin-top: 1rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
`;

const More = styled.div`
  cursor: pointer;
  margin-top: 1rem;
  color: #999999;
`;

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
