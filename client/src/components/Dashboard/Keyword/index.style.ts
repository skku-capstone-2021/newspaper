import styled from "styled-components";

export const Wrapper = styled.div``;

export const Title = styled.div`
  color: #47566b;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const WordCloud = styled.div`
  width: 60vw;
  height: 22rem;
  background-color: #eeeeee;
  border-radius: 20px;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export const Nodata = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
`;
