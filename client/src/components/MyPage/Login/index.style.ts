import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f7fb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalInner = styled.div`
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 30rem;
  padding: 2rem 2.5rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputWrapper = styled.div``;

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

export const Toggle = styled.div`
  cursor: pointer;
  text-align: center;
  color: #999999;
`;
