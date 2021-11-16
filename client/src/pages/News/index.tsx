import { FC, useState, useEffect } from "react";
import { NewsWrapper } from "./index.style";
import Home from "@/components/News/Home";
import Search from "@/components/News/Search";

interface Props {
  date: Date;
}

const News: FC<Props> = ({ date }) => {
  const [mode, setMode] = useState<"home" | "search">("home");
  const [searchData, setSearchData] = useState<any>({});

  const changeMode = (searchData: any) => {
    setMode("search");
    setSearchData(searchData);
  };

  return (
    <NewsWrapper>
      {mode === "home" ? (
        <Home changeMode={changeMode} date={date} />
      ) : (
        <Search searchData={searchData} />
      )}
    </NewsWrapper>
  );
};

export default News;
