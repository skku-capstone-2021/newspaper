import { FC, useEffect, useState, useCallback } from "react";
import { Pagination } from "@material-ui/lab";
import Loading from "@/components/Common/Loading";
import { TitleWrapper, Title, NewsWrapper, PageWrapper } from "./index.style";
import NewsRows from "@/components/Common/NewsRow";
import NewsModal from "@/components/Common/NewsModal";

interface Props {
  searchData: any;
}

interface News {
  category: any;
  company: any;
  confidence: any;
  content: any;
  created_at: any;
  date: any;
  idx: any;
  img_url: any;
  keywords: any;
  recommend: any;
  result: any;
  short_content: any;
  title: any;
  updated_at: any;
  url: any;
}

const Search: FC<Props> = ({ searchData }) => {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState<number>(1);
  const [per, setPer] = useState<number>(3);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewsOpen, SetIsNewsOpen] = useState<boolean>(false);
  const [currentList, setCurrentList] = useState<News[]>([]);
  const [currentNews, setCurrentNews] = useState<News>(null);

  useEffect(() => {
    if (searchData.data) {
      const { articles } = searchData.data;
      setNews(articles);
      setTotal(articles.length);
      setCurrentList(articles.slice((page - 1) * per, (page - 1) * per + per));
    }
  }, [searchData, page]);

  const handlePageChange = (e: any, v: number) => {
    setPage(v);
  };

  const handleNewsClick = useCallback(
    (item: News) => {
      SetIsNewsOpen(true);
      setCurrentNews(item);
    },
    [isNewsOpen, setCurrentNews]
  );

  const removeModal = () => {
    SetIsNewsOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleWrapper>
            <Title>
              <span>Search </span>
              <span> results</span>
            </Title>
            <div>total: {total}</div>
          </TitleWrapper>
          <NewsWrapper>
            {currentList.length &&
              currentList.map((item, index) => (
                <NewsRows
                  handleNewsClick={handleNewsClick}
                  key={index}
                  news={item}
                />
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
          <NewsModal
            news={currentNews}
            removeModal={removeModal}
            visible={isNewsOpen}
          />
        </>
      )}
    </>
  );
};

export default Search;
