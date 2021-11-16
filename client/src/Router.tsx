import { FC, useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "@/pages/Dashboard";
import News from "@/pages/News";
import Analyze from "@/pages/Analyze";
import MyPage from "@/pages/MyPage";
import NotFound from "@/pages/NotFound";
import AlertModal from "@/components/Common/AlertModal";

const RouteWrapper = styled.div`
  flex: 88%;
  height: 100vh;
  background-color: #f3f7fc;
`;

type Page = {
  path: string;
  order: number;
};

const pages: Page[] = [
  { path: "/", order: 1 },
  { path: "/news", order: 2 },
  { path: "/analyze", order: 3 },
  { path: "/mypage", order: 4 },
];

const findOrder = (path: string) => {
  let curPageOrder: Page[] = pages.filter((page) => {
    return page.path === path;
  });
  if (curPageOrder[0]) {
    return curPageOrder[0].order;
  }
};

interface Props {
  date: Date;
}

const MyRouter: FC<Props> = ({ date }) => {
  const location = useLocation();
  const [order, setOrder] = useState<number>(findOrder(location.pathname));
  const [page, setPage] = useState<string>(location.pathname);
  const [direction, setDirection] = useState<string>();

  useEffect(() => {
    let currentOrder = order;
    let currentPage = page;
    let newOrder = findOrder(location.pathname);
    let newPage = location.pathname;
    if (newPage !== currentPage) {
      let dir = currentOrder < newOrder ? "up" : "down";
      setOrder(newOrder);
      setPage(newPage);
      setDirection(dir);
    }
  });

  return (
    <RouteWrapper>
      <TransitionGroup className={`transition-group ${direction}`}>
        <CSSTransition key={location.pathname} classNames="fade" timeout={400}>
          <Switch location={location}>
            <Route path="/" exact render={() => <Dashboard date={date} />} />
            <Route path="/news" exact render={() => <News date={date} />} />
            <Route path="/analyze" exact component={Analyze} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <AlertModal />
    </RouteWrapper>
  );
};

export default MyRouter;
