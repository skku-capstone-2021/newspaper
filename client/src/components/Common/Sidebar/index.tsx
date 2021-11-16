import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import Tooltip from "@material-ui/core/Tooltip";
import { Dashboard, Mypage, News, Logo } from "@/assets";

import {
  Icon,
  Menu,
  SidebarWrapper,
  CalendarWrapper,
  DateLabel,
} from "./index.style";

interface Props {
  changeDate: (d: Date) => void;
}

const Sidebar: FC<Props> = ({ changeDate }) => {
  const { pathname } = useLocation();
  const [date, setDate] = useState<Date>(new Date());

  const handleDate = (d: Date) => {
    changeDate(d);
    setDate(d);
  };

  return (
    <SidebarWrapper>
      <Link to="/">
        <Icon src={Logo} alt="logo" width="5" height="5" />
      </Link>
      <Menu>
        <Link to="/">
          <Tooltip disableFocusListener disableTouchListener title="Dashboard">
            <Icon
              src={Dashboard}
              alt="dashboard"
              width="2.3"
              height="2.3"
              className={pathname === "/" ? "selected" : ""}
              current={pathname === "/"}
            />
          </Tooltip>
        </Link>
        <Link to="/news">
          <Tooltip disableFocusListener disableTouchListener title="News">
            <Icon
              src={News}
              alt="news"
              width="2.3"
              height="2.3"
              className={pathname === "/news" ? "selected" : ""}
              current={pathname === "/news"}
            />
          </Tooltip>
        </Link>
        <Link to="/mypage">
          <Tooltip disableFocusListener disableTouchListener title="Mypage">
            <Icon
              src={Mypage}
              alt="mypage"
              width="2.3"
              height="2.3"
              className={pathname === "/mypage" ? "selected" : ""}
              current={pathname === "/mypage"}
            />
          </Tooltip>
        </Link>
      </Menu>
      <CalendarWrapper>
        <DateLabel htmlFor="date-pick">{date.getDate()}</DateLabel>
        <DatePicker id="date-pick" selected={date} onChange={handleDate} />
      </CalendarWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
