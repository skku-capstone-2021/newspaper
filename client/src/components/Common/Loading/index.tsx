import { FC } from "react";
import styled, { keyframes } from "styled-components";

const Spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  animation: ${Spin} 2s linear infinite;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 15px solid rgba(163, 151, 198, 0.2);
  border-top: 15px solid rgba(163, 151, 198, 1);
  border-radius: 50%;
`;

const Loading: FC = () => {
  return <Spinner />;
};

export default Loading;
