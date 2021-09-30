import styled from "styled-components";

export const SidebarWrapper = styled.div<{
  width: number;
  xPosition: number;
}>`
  position: fixed;
  top: 0;
  width: ${({ width }) => `${width}px`};
  right: ${({ width }) => `-${width}px`};
  height: 100vh;
  transform: ${({ xPosition }) => `translatex(${xPosition}px)`};
  border-right: 1px solid;
  border-radius: 0;
  border-color: rgba(64, 194, 133, 0.693);
  background-color: rgb(255, 255, 255);
  transition: 0.8s ease;
  z-index: 999;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const ToggleButton = styled.button`
  height: 50px;
  border-top-left-radius: 10rem;
  border-bottom-left-radius: 9rem;
  width: 10px;
  position: absolute;
  outline: none;
  z-index: 1;
  background-color: rgba(64, 194, 133, 0.693);
  border-color: rgba(64, 194, 133, 0.693);
  border-left: 0;
  cursor: pointer;
`;
export const Content = styled.div``;
