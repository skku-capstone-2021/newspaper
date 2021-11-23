import { FC, useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import { Wrapper, Title, WordCloud, Nodata } from "./index.style";
import words from "./words";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { sendPost } from "@/lib/utils/api";

interface Props {
  date: Date;
}

const getToday = (date: Date) => {
  let year = date.getFullYear();
  let month = `0${1 + date.getMonth()}`.slice(-2);
  let day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};

const parsing = (keystr: any) => {
  if (typeof keystr === "string") {
    let sliced = keystr.slice(1, keystr.length - 1);
    sliced = sliced.replace(/'/gi, "");
    sliced = sliced.replace(/ /gi, "");
    return sliced.split(",");
  }

  if (keystr[0][0] === "[") {
    for (let i = 0; i < keystr.length; i += 1) {
      if (i === 0) {
        keystr[i] = keystr[i].slice(2, keystr[i].length - 1);
      } else if (i === keystr.length - 1) {
        keystr[i] = keystr[i].slice(2, keystr[i].length - 2);
      } else {
        keystr[i] = keystr[i].slice(2, keystr[i].length - 1);
      }
    }
    return keystr;
  }
  return keystr;
};

const Keyword: FC<Props> = ({ date }) => {
  const [tkeywords, settKeywords] = useState<any>([]);

  useEffect(() => {
    sendPost("/article/search", {
      title: null,
      startDate: getToday(date),
      endDate: getToday(date),
      newspaper: [],
      category: [],
      keyword: [],
    }).then((res) => {
      let obj = {} as any;
      let ret = [] as any;

      res.data.articles.forEach((item: any) => {
        parsing(item.keywords).forEach((k): any => {
          if (obj[k] === undefined) {
            obj[k] = 1;
          } else {
            obj[k] += 1;
          }
        });
      });

      for (const [key, value] of Object.entries(obj)) {
        if (value > 0) {
          ret.push({
            text: key,
            value,
          });
        }
      }
      settKeywords(ret);
    });
  }, [date]);

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [10, 50],
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
        {tkeywords.length === 0 ? (
          <Nodata>No News Data</Nodata>
        ) : (
          <ReactWordcloud words={tkeywords} options={options} />
        )}
      </WordCloud>
    </Wrapper>
  );
};

export default Keyword;
