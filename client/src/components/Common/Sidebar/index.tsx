import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Analyze, Calendar, Dashboard, Mypage, News, Logo } from "@/assets";
import { Icon, Menu, SidebarWrapper } from "./index.style";

const Sidebar: FC = () => {
  const { pathname } = useLocation();

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
            width="2.5"
            height="2.5"
            className={pathname === "/" ? "selected" : ""}
            current={pathname === "/"}
          />
        </Link>
        <Link to="/news">
          <Icon
            src={News}
            alt="news"
            width="2.5"
            height="2.5"
            className={pathname === "/news" ? "selected" : ""}
            current={pathname === "/news"}
          />
        </Link>
        <Link to="/analyze">
          <Icon
            src={Analyze}
            alt="analyze"
            width="2.5"
            height="2.5"
            className={pathname === "/analyze" ? "selected" : ""}
            current={pathname === "/analyze"}
          />
        </Link>
        <Link to="/mypage">
          <Icon
            src={Mypage}
            alt="mypage"
            width="2.5"
            height="2.5"
            className={pathname === "/mypage" ? "selected" : ""}
            current={pathname === "/mypage"}
          />
        </Link>
      </Menu>
      <div>
        <Icon
          src={Calendar}
          alt="calendar"
          width="4"
          height="4"
          current={true}
        />
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
