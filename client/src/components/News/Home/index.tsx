import { FC, useState, useCallback, useEffect } from "react";
import {
  Icon,
  TitleWrapper,
  Title,
  NewsDisplay,
  Left,
  Right,
  Bottom,
  Nodata,
} from "./index.style";
import { Search } from "@/assets";
import NewsItem from "@/components/News/Home/NewsItem";
import NewsModal from "@/components/Common/NewsModal";
import Loading from "@/components/Common/Loading";
import SearchSidebar from "@/components/News/Home/SearchSidebar";
import SearchSideContent from "./SearchSideContent";
import { sendPost } from "@/lib/utils/api";
import { Oops } from "@/assets/index";

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

interface Props {
  changeMode: (searchData: any) => void;
  date: Date;
}

const Home: FC<Props> = ({ changeMode, date }) => {
  const [MainNews, setMainNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewsOpen, SetIsNewsOpen] = useState<boolean>(false);
  const [currentNews, setCurrentNews] = useState<News>(null);

  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const handleNewsClick = useCallback(
    (item: News) => {
      SetIsNewsOpen(true);
      setCurrentNews(item);
    },
    [isNewsOpen, currentNews]
  );

  const getToday = (date: Date) => {
    let year = date.getFullYear();
    let month = `0${1 + date.getMonth()}`.slice(-2);
    let day = `0${date.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setLoading(true);

    sendPost("/article/main", { date: getToday(date) }).then((res) => {
      setMainNews(res.data.articles);
      setLoading(false);
    });
  }, [date]);

  const removeModal = () => {
    SetIsNewsOpen(false);
  };

  const closeSideBar = useCallback(() => {
    setSideOpen(!sideOpen);
  }, [sideOpen]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TitleWrapper>
            <Title>
              <span>Main </span>
              <span> news</span>
            </Title>
            <Icon
              src={Search}
              onClick={() => {
                setSideOpen(!sideOpen);
              }}
              alt="search"
              width="3.5"
              height="3.5"
            />
          </TitleWrapper>
          {MainNews.length > 0 ? (
            <NewsDisplay>
              <Left>
                <NewsItem
                  handleNewsClick={handleNewsClick}
                  item={MainNews[0]}
                  size="lg"
                />
                <Bottom>
                  <NewsItem
                    handleNewsClick={handleNewsClick}
                    item={MainNews[1]}
                    size="sm"
                  />
                  <NewsItem
                    handleNewsClick={handleNewsClick}
                    item={MainNews[2]}
                    size="sm"
                  />
                </Bottom>
              </Left>
              <Right>
                <NewsItem
                  handleNewsClick={handleNewsClick}
                  item={MainNews[3]}
                  size="sm"
                />
                <NewsItem
                  handleNewsClick={handleNewsClick}
                  item={MainNews[4]}
                  size="sm"
                />
              </Right>
            </NewsDisplay>
          ) : (
            <Nodata>
              <img src={Oops} alt="oops" />
              <div>No News Data</div>
            </Nodata>
          )}

          <NewsModal
            news={currentNews}
            removeModal={removeModal}
            visible={isNewsOpen}
          />
          <SearchSidebar
            width={500}
            sideOpen={sideOpen}
            sideBarClose={closeSideBar}
          >
            <SearchSideContent
              changeMode={changeMode}
              sideBarClose={closeSideBar}
            />
          </SearchSidebar>
        </>
      )}
    </>
  );
};

export default Home;
