import styled from "styled-components";
import { Calendar } from "@/assets";

export const SidebarWrapper = styled.div`
  flex: 12%;
  height: 100vh;
  background-color: #ffffff;
  min-width: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 6.2rem;

  > * {
    margin: 2.4rem;

    &:hover {
      img:not(.selected) {
        filter: invert(45%) sepia(32%) saturate(2122%) hue-rotate(217deg)
          brightness(99%) contrast(94%);
        transition: transform 300ms;
        transform: scale(1.2);
      }
    }
  }
`;

export const Icon = styled.img<{
  width?: string;
  height?: string;
  current?: boolean;
}>`
  cursor: pointer;
  width: ${({ width }) => `${width}rem` || "100%"};
  height: ${({ height }) => `${height}rem` || "100%"};
  filter: ${({ current }) =>
    `${
      current &&
      `invert(45%) sepia(32%) saturate(2122%) hue-rotate(217deg)
        brightness(99%) contrast(94%)`
    }`};

  transform: ${({ current }) => `${current && `scale(1.2)`}`};
`;

export const CalendarWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  background: center / cover no-repeat url(${Calendar});

  input {
    display: none;
  }
`;

export const DateLabel = styled.label`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  justify-content: center;
  margin-top: 2.8rem;
`;
