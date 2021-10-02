import { FC, useState } from "react";
import { NewsWrapper } from "./index.style";
import Home from "@/components/News/Home";
import Search from "@/components/News/Search";

const News: FC = () => {
  const [mode, setMode] = useState<"home" | "search">("home");
  const [searchData, setSearchData] = useState<any>({});

  const changeMode = (searchData: any) => {
    setMode("search");
    setSearchData(searchData);
  };

  return (
    <NewsWrapper>
      {mode === "home" ? (
        <Home changeMode={changeMode} />
      ) : (
        <Search searchData={searchData} />
      )}
    </NewsWrapper>
  );
};

export default News;
