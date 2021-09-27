import styled from "styled-components";

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
  margin: 6rem;

  > * {
    margin: 2.5rem;

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
