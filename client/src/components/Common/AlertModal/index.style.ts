import styled from "styled-components";

export const AlertModalWrapper = styled.aside`
  opacity: 0;
  position: fixed;
  padding: 17px 33px;
  /* left: calc(50% - 155px); */
  bottom: calc(50% - 400px);
  height: 20px;
  font-size: 14px;
  background-color: #000;
  border-radius: 40px;
  transform: translateY(0px);
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  z-index: -1;
  display: flex;
  align-items: center;
  color: #000;
  justify-content: center;
  transition: all 0.7s ease;

  &.show {
    opacity: 1;
    transform: translateY(-20px);
    color: white;
    z-index: 1000;
  }
`;
