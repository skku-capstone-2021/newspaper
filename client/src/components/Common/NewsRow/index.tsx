import { FC } from "react";
import styled from "styled-components";

interface Props {
  news: {
    idx: number;
    title: string;
    company: string;
    img: string;
    content: string;
  };
  handleNewsClick: () => void;
}

const NewsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  height: 13rem;
  cursor: pointer;
`;
const NewsImg = styled.img`
  border-radius: 10px;
  width: 30%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;
const Article = styled.div`
  position: relative;
  bottom: 1rem;
`;
const Sub = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Company = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
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
const Date = styled.div``;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Line = styled.div`
  color: white;
  border-bottom: 1px solid #b3b3b3;

  &:after {
    width: 100%;
  }
`;

const NewsRows: FC<Props> = ({ news, handleNewsClick }) => {
  return (
    <>
      <NewsWrapper
        onClick={() => {
          handleNewsClick();
        }}
      >
        <NewsImg src={news.img} alt="news" />
        <Content>
          <Title>{news.title}</Title>
          <Article>{news.content}</Article>
          <Sub>
            <Left>
              <Company>{news.company}</Company>
              <Category>society</Category>
            </Left>
            <Date>2021/10/02</Date>
          </Sub>
        </Content>
      </NewsWrapper>
      <Line />
    </>
  );
};

export default NewsRows;
