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

  > :first-child {
  }

  > :nth-child(2) {
  }

  > :last-child {
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7rem;

  > * {
    margin: 2.5rem;

    &:hover {
      filter: invert(45%) sepia(32%) saturate(2122%) hue-rotate(217deg)
        brightness(99%) contrast(94%);
    }
  }
`;

export const Icon = styled.img<{ width?: string; height?: string }>`
  cursor: pointer;
  width: ${({ width }) => `${width}rem` || "100%"};
  height: ${({ height }) => `${height}rem` || "100%"};
`;
