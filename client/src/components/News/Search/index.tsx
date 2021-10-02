import { FC, useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";
import Loading from "@/components/Common/Loading";
import { TitleWrapper, Title, NewsWrapper, PageWrapper } from "./index.style";
import NewsRows from "@/components/Common/NewsRow";

interface Props {
  searchData: any;
}

interface News {
  idx: number;
  title: string;
  company: string;
  img: string;
  content: string;
}

const MOCK_NEWS = [
  {
    idx: 1,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925750-2122745e-c554-4de6-abc1-bd57fae840c7.jpeg",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
  },
  {
    idx: 2,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925780-c72a7c33-c2bc-46e9-8e80-4ea1f6730f09.jpeg",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
  },
  {
    idx: 3,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925803-def90275-df33-4782-93c0-7b9757379613.jpeg",
    content:
      "content content content content content content content content content content content content content content content content content content content content content content content content content content content content",
  },
];

const Search: FC<Props> = ({ searchData }) => {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState<number>(1);
  const [per, setPer] = useState<number>(4);
  const [total, setTotal] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    return new Promise((resolve) => {
      resolve(MOCK_NEWS);
    });
  };

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => {
        const response = data as News[];
        setNews(response);
        setLoading(false);
      })
      .catch(() => {});
  }, [page]);

  const handlePageChange = (e: any, v: number) => {
    setPage(v);
  };

  return (
    <>
      <TitleWrapper>
        <Title>
          <span>Search </span>
          <span> results</span>
        </Title>
        <div>total: {total}</div>
      </TitleWrapper>
      <NewsWrapper>
        {news.map((item, index) => (
          <NewsRows key={index} news={item} />
        ))}
      </NewsWrapper>
      <PageWrapper>
        <Pagination
          count={Math.ceil(total / per)}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </PageWrapper>
    </>
  );
};

export default Search;
