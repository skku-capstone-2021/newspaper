import { FC, useState } from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import Sidebar from "@/components/Common/Sidebar";
import "@/styles/app.css";

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const App: FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const changeDate = (d: Date) => {
    setDate(d);
  };

  return (
    <Main>
      <BrowserRouter>
        <Sidebar changeDate={changeDate} />
        <Router date={date} />
      </BrowserRouter>
    </Main>
  );
};

export default App;
