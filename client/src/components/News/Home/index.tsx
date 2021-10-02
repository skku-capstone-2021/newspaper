import { FC, useState, useCallback, useEffect } from "react";
import {
  Icon,
  TitleWrapper,
  Title,
  NewsDisplay,
  Left,
  Right,
  Bottom,
} from "./index.style";
import { Search } from "@/assets";
import NewsItem from "@/components/News/Home/NewsItem";
import NewsModal from "@/components/Common/NewsModal";
import Loading from "@/components/Common/Loading";
import SearchSidebar from "@/components/News/Home/SearchSidebar";
import SearchSideContent from "./SearchSideContent";

interface News {
  idx: number;
  title: string;
  company: string;
  img: string;
}

interface Props {
  changeMode: (searchData: any) => void;
}

const MOCK_NEWS = [
  {
    idx: 1,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925750-2122745e-c554-4de6-abc1-bd57fae840c7.jpeg",
  },
  {
    idx: 2,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925780-c72a7c33-c2bc-46e9-8e80-4ea1f6730f09.jpeg",
  },
  {
    idx: 3,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925803-def90275-df33-4782-93c0-7b9757379613.jpeg",
  },
  {
    idx: 4,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134925828-c4f5de9d-c993-4f5f-ab33-d4efd9d42cf3.jpg",
  },
  {
    idx: 5,
    title:
      'Critic and programmer Geoff Andrew remembers reviewing the film for Time Out when it first came out. "I was not alone in being highly impressed ',
    company: "ABC news",
    img: "https://user-images.githubusercontent.com/47776356/134926033-2cd1f945-951c-456e-84a0-01423c4e168b.jpeg",
  },
];

const Home: FC<Props> = ({ changeMode }) => {
  const [MainNews, setMainNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewsOpen, SetIsNewsOpen] = useState<boolean>(false);
  const [currentNewsIdx, setCurrentNewsIdx] = useState<number>(0);
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const handleNewsClick = useCallback(
    (item: News) => {
      SetIsNewsOpen(true);
      setCurrentNewsIdx(item.idx);
    },
    [isNewsOpen, currentNewsIdx]
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMainNews(MOCK_NEWS);
      setLoading(false);
    }, 1500);
  }, []);

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
          <NewsDisplay>
            <Left>
              <NewsItem
                handleNewsClick={handleNewsClick}
                item={MOCK_NEWS[0]}
                size="lg"
              />
              <Bottom>
                <NewsItem
                  handleNewsClick={handleNewsClick}
                  item={MOCK_NEWS[1]}
                  size="sm"
                />
                <NewsItem
                  handleNewsClick={handleNewsClick}
                  item={MOCK_NEWS[2]}
                  size="sm"
                />
              </Bottom>
            </Left>
            <Right>
              <NewsItem
                handleNewsClick={handleNewsClick}
                item={MOCK_NEWS[3]}
                size="sm"
              />
              <NewsItem
                handleNewsClick={handleNewsClick}
                item={MOCK_NEWS[4]}
                size="sm"
              />
            </Right>
          </NewsDisplay>
          <NewsModal
            idx={currentNewsIdx}
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
