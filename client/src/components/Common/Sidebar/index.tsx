import { FC } from "react";
import { Link } from "react-router-dom";

import { Analyze, Calendar, Dashboard, Mypage, News, Logo } from "@/assets";

import { Icon, Menu, SidebarWrapper } from "./index.style";

const Sidebar: FC = () => {
  return (
    <SidebarWrapper>
      <Link to="/">
        <Icon src={Logo} alt="logo" width="5" height="5" />
      </Link>
      <Menu>
        <Link to="/">
          <Icon src={Dashboard} alt="dashboard" width="2.5" height="2.5" />
        </Link>
        <Link to="/news">
          <Icon src={News} alt="news" width="2.5" height="2.5" />
        </Link>
        <Link to="/analyze">
          <Icon src={Analyze} alt="analyze" width="2.5" height="2.5" />
        </Link>
        <Link to="/mypage">
          <Icon src={Mypage} alt="mypage" width="2.5" height="2.5" />
        </Link>
      </Menu>
      <Icon src={Calendar} alt="calendar" />
    </SidebarWrapper>
  );
};

export default Sidebar;
