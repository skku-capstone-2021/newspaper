import { FC, useState, useCallback } from "react";
import LogIn from "@/components/MyPage/Login";
import My from "@/components/MyPage/My";

const MyPage: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const removeLoginModal = useCallback(() => {
    setIsLogin(true);
  }, [isLogin]);

  return (
    <>{!isLogin ? <LogIn removeLoginModal={removeLoginModal} /> : <My />}</>
  );
};

export default MyPage;
