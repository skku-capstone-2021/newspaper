import { FC, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Wrapper, Title, Chart, Nodata } from "./index.style";
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

const Category: FC<Props> = ({ date }) => {
  const [label, setLabel] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [color, setColor] = useState<any>([]);

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

      res.data.articles.forEach((item: any) => {
        if (obj[item.category] === undefined) {
          obj[item.category] = 1;
        } else {
          obj[item.category] += 1;
        }
      });
      let label = [];
      let backgroundColor = [];
      let data = [];
      let r;
      let g;
      let b;

      for (const [key, value] of Object.entries(obj)) {
        label.push(key);
        data.push(value);
        r = Math.round(Math.random() * 255);
        g = Math.round(Math.random() * 255);
        b = Math.round(Math.random() * 255);
        backgroundColor.push(`rgb(${r}, ${g}, ${b})`);
      }
      setLabel(label);
      setColor(backgroundColor);
      setData(data);
    });
  }, [date]);

  return (
    <Wrapper>
      <Title>Todays Categorys</Title>
      <Chart>
        {label.length > 0 ? (
          <Doughnut
            type="doughnut"
            width={400}
            data={{
              labels: label,
              datasets: [
                {
                  backgroundColor: color,
                  data,
                },
              ],
            }}
            options={{
              legend: {
                position: "right",
              },
            }}
          />
        ) : (
          <Nodata>No News Data</Nodata>
        )}
      </Chart>
    </Wrapper>
  );
};

export default Category;
