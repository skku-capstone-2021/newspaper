import { FC } from "react";
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
  return (
    <Main>
      <BrowserRouter>
        <Sidebar />
        <Router />
      </BrowserRouter>
    </Main>
  );
};

export default App;
