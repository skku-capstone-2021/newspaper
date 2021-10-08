import { FC, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Pagination } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import NewsRows from "@/components/Common/NewsRow";
import Loading from "@/components/Common/Loading";
import NewsModal from "@/components/Common/NewsModal";
import KeywordModal from "../KeywordModal";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 4.7rem 8rem;
`;

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
`;

const PageWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
`;

const Title = styled.div<{ selected: boolean }>`
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#47566B" : "#7086AA")};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Right = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  position: relative;
  top: 0.5rem;
`;

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

interface News {
  idx: number;
  title: string;
  company: string;
  img: string;
  content: string;
}

const My: FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [page, setPage] = useState<number>(1);
  const [per, setPer] = useState<number>(4);
  const [total, setTotal] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewsOpen, SetIsNewsOpen] = useState<boolean>(false);
  const [currentNewsIdx, setCurrentNewsIdx] = useState<number>(0);
  const [isKeywordModal, SetIsKeywordModal] = useState<boolean>(false);

  const [mode, setMode] = useState<
    "view" | "recommend" | "subscribe" | "scrap"
  >("subscribe");

  const getData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_NEWS);
      }, 1500);
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
  }, [page, mode]);

  const handlePageChange = (e: any, v: number) => {
    setPage(v);
  };

  const handleNewsClick = useCallback(() => {
    SetIsNewsOpen(true);
    setCurrentNewsIdx(1);
  }, [isNewsOpen, currentNewsIdx]);

  const handleKewordClick = useCallback(() => {
    SetIsKeywordModal(true);
  }, [isKeywordModal]);

  const removeModal = () => {
    SetIsNewsOpen(false);
  };

  const removeKeywordModal = () => {
    SetIsKeywordModal(false);
  };

  const handleMode = (e: any) => {
    setMode(e.currentTarget.innerText);
  };

  return (
    <Wrapper>
      <Header>
        <TitleWrapper>
          <Title selected={mode === "view"} onClick={handleMode}>
            view
          </Title>
          <Title selected={mode === "recommend"} onClick={handleMode}>
            recommend
          </Title>
          <Title selected={mode === "subscribe"} onClick={handleMode}>
            subscribe
          </Title>
          <Title selected={mode === "scrap"} onClick={handleMode}>
            scrap
          </Title>
        </TitleWrapper>
        <Right>
          <div>total: 100</div>
          {mode === "subscribe" && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleKewordClick}
            >
              EDIT KEYWORD
            </Button>
          )}
        </Right>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NewsWrapper>
            {news.map((item, index) => (
              <NewsRows
                handleNewsClick={handleNewsClick}
                key={index}
                news={item}
              />
            ))}
          </NewsWrapper>
        </div>
      )}
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
        idx={currentNewsIdx}
        removeModal={removeModal}
        visible={isNewsOpen}
      />
      <KeywordModal removeModal={removeKeywordModal} visible={isKeywordModal} />
    </Wrapper>
  );
};

export default My;
