import { FC, useState, useEffect } from "react";
import Category from "@/components/Dashboard/Category";
import { Wrapper, Top, Bottom } from "./index.style";
import Keyword from "@/components/Dashboard/Keyword";
import Rate from "@/components/Dashboard/Rate";
import Loading from "@/components/Common/Loading";

const Dashboard: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log("로딩~");
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Top>
            <Keyword date="todays date" />
          </Top>
          <Bottom>
            <Category date="todays date" />
            <Rate date="todays date" />
          </Bottom>
        </>
      )}
    </Wrapper>
  );
};

export default Dashboard;
