import { FC } from "react";
import ReactWordcloud from "react-wordcloud";
import { Wrapper, Title, WordCloud } from "./index.style";
import words from "./words";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

interface Props {
  date: string;
}

const Keyword: FC<Props> = () => {
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };
  return (
    <Wrapper>
      <Title>Todays Keywords</Title>
      <WordCloud>
        <ReactWordcloud words={words} options={options} />
      </WordCloud>
    </Wrapper>
  );
};

export default Keyword;
