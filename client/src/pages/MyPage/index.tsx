import { FC, useState } from "react";
import LogIn from "@/components/MyPage/Login";
import My from "@/components/MyPage/My";

const MyPage: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return <>{!isLogin ? <LogIn /> : <My />}</>;
};

export default MyPage;
