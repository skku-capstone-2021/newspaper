import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NewsPaper = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Keywords = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Keyword = styled.div`
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

export const Category = styled.div`
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

export const Buttons = styled.div`
  display: flex;
  gap: 2rem;
`;

export const Level = styled.img`
  width: 4rem;
  height: 4rem;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

export const Horizon = styled.div`
  border-bottom: 2px solid #999999;
  margin: 1rem 0;
`;

export const MainImg = styled.img`
  width: 100%;
  height: 40vh;
`;

export const ContentWrapper = styled.div`
  margin-top: 1rem;
`;

export const Content = styled.div`
  font-size: 1.1rem;
`;

export const More = styled.div`
  cursor: pointer;
  margin-top: 1rem;
  color: #999999;
`;
