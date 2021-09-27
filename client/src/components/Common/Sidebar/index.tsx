import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Analyze, Dashboard, Mypage, News, Logo } from "@/assets";
import {
  Icon,
  Menu,
  SidebarWrapper,
  CalendarWrapper,
  DateLabel,
} from "./index.style";

const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const [date, setDate] = useState<Date>(new Date());

  return (
    <SidebarWrapper>
      <Link to="/">
        <Icon src={Logo} alt="logo" width="5" height="5" />
      </Link>
      <Menu>
        <Link to="/">
          <Icon
            src={Dashboard}
            alt="dashboard"
            width="2.3"
            height="2.3"
            className={pathname === "/" ? "selected" : ""}
            current={pathname === "/"}
          />
        </Link>
        <Link to="/news">
          <Icon
            src={News}
            alt="news"
            width="2.3"
            height="2.3"
            className={pathname === "/news" ? "selected" : ""}
            current={pathname === "/news"}
          />
        </Link>
        <Link to="/analyze">
          <Icon
            src={Analyze}
            alt="analyze"
            width="2.3"
            height="2.3"
            className={pathname === "/analyze" ? "selected" : ""}
            current={pathname === "/analyze"}
          />
        </Link>
        <Link to="/mypage">
          <Icon
            src={Mypage}
            alt="mypage"
            width="2.3"
            height="2.3"
            className={pathname === "/mypage" ? "selected" : ""}
            current={pathname === "/mypage"}
          />
        </Link>
      </Menu>
      <CalendarWrapper>
        <DateLabel htmlFor="date-pick">{date.getDate()}</DateLabel>
        <DatePicker
          id="date-pick"
          selected={date}
          onChange={(d: Date) => setDate(d)}
        />
      </CalendarWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
