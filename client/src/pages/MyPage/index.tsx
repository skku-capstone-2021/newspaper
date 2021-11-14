import { FC, useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import LogIn from "@/components/MyPage/Login";
import My from "@/components/MyPage/My";

const MyPage: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const removeLoginModal = useCallback(() => {
    setIsLogin(true);
  }, [isLogin]);

  useEffect(() => {
    if (Cookies.get("id")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>{!isLogin ? <LogIn removeLoginModal={removeLoginModal} /> : <My />}</>
  );
};

export default MyPage;
