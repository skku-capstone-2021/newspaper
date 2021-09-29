import styled from "styled-components";

export const FrontItem = styled.div<{
  img: string;
  size: "lg" | "sm";
}>`
  border-radius: 10px;
  background: ${({ img }) => `center / cover no-repeat url(${img})`};
  width: ${({ size }) => (size === "lg" ? "55rem" : "26.7rem")};
  height: ${({ size }) => (size === "lg" ? "26rem" : "18rem")};
  cursor: pointer;
`;

export const BackItem = styled.div<{
  size: "lg" | "sm";
}>`
  padding: 1.5rem;
  background-color: #7086aa;
  border-radius: 10px;
  width: ${({ size }) => (size === "lg" ? "55rem" : "26.7rem")};
  height: ${({ size }) => (size === "lg" ? "26rem" : "18rem")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

export const Title = styled.div<{
  size: "lg" | "sm";
}>`
  font-weight: bold;
  font-size: ${({ size }) => (size === "lg" ? "2rem" : "1.5rem")};
`;

export const Company = styled.div<{
  size: "lg" | "sm";
}>`
  font-size: ${({ size }) => (size === "lg" ? "1.5rem" : "1rem")};
`;
