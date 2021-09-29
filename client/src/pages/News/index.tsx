import { FC, useState } from "react";
import { NewsWrapper } from "./index.style";
import Home from "@/components/News/Home";
import Search from "@/components/News/Search";

const News: FC = () => {
  const [mode, setMode] = useState<"home" | "search">("home");

  return <NewsWrapper>{mode === "home" ? <Home /> : <Search />}</NewsWrapper>;
};

export default News;
