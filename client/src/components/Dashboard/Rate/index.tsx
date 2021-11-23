import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Wrapper, Title, Chart } from "./index.style";

interface Props {
  date: Date;
}

const getToday = (date: Date) => {
  let year = date.getFullYear();
  let month = `0${1 + date.getMonth()}`.slice(-2);
  let day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};

const Rate: FC<Props> = () => {
  return (
    <Wrapper>
      <Title>Todays Rates</Title>
      <Chart>
        <Doughnut
          type="doughnut"
          width={400}
          data={{
            labels: [
              "A1ratio",
              "A2ratio",
              "B1ratio",
              "B2ratio",
              "C1ratio",
              "C2ratio",
              "Nratio",
            ],
            datasets: [
              {
                backgroundColor: [
                  "#A22BFD",
                  "#FF426A",
                  "#36A2EB",
                  "#FFCD56",
                  "#F97D6D",
                  "#214572",
                  "#8BBD6C",
                ],
                data: [1, 2, 3, 4, 5, 6, 7],
              },
            ],
          }}
          options={{
            legend: {
              position: "right",
            },
          }}
        />
      </Chart>
    </Wrapper>
  );
};

export default Rate;
