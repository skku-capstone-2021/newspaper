import { FC, useState, useEffect } from "react";
import Category from "@/components/Dashboard/Category";
import { Wrapper, Top, Bottom } from "./index.style";
import Keyword from "@/components/Dashboard/Keyword";
import Rate from "@/components/Dashboard/Rate";
import Loading from "@/components/Common/Loading";

interface Props {
  date: Date;
}

const Dashboard: FC<Props> = ({ date }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
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
            <Keyword date={date} />
          </Top>
          <Bottom>
            <Category date={date} />
            <Rate date={date} />
          </Bottom>
        </>
      )}
    </Wrapper>
  );
};

export default Dashboard;
