import { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: purple;
  width: 100%;
  height: 100vh;
`;

const My: FC = () => {
  return <Wrapper>마이페이지</Wrapper>;
};

export default My;
