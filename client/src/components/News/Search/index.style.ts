import styled from "styled-components";

export const Icon = styled.img<{
  width?: string;
  height?: string;
  current?: boolean;
}>`
  cursor: pointer;
  width: ${({ width }) => `${width}rem` || "100%"};
  height: ${({ height }) => `${height}rem` || "100%"};

  &:hover {
    filter: invert(45%) sepia(32%) saturate(2122%) hue-rotate(217deg)
      brightness(99%) contrast(94%);
    transition: transform 300ms;
    transform: scale(1.1);
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: bold;

  > :first-child {
    font-size: 3.5rem;
    color: #47556b;
  }

  > :last-child {
    color: #7086aa;
    font-size: 2rem;
  }
`;

export const NewsDisplay = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const Bottom = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
`;

export const PageWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;
