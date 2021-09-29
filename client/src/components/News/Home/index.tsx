import { FC } from "react";
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

const Home: FC = () => {
  return (
    <>
      <TitleWrapper>
        <Title>
          <span>Main </span>
          <span> news</span>
        </Title>
        <Icon src={Search} alt="search" width="3.5" height="3.5" />
      </TitleWrapper>
      <NewsDisplay>
        <Left>
          <NewsItem item={MOCK_NEWS[0]} size="lg" />
          <Bottom>
            <NewsItem item={MOCK_NEWS[1]} size="sm" />
            <NewsItem item={MOCK_NEWS[2]} size="sm" />
          </Bottom>
        </Left>
        <Right>
          <NewsItem item={MOCK_NEWS[3]} size="sm" />
          <NewsItem item={MOCK_NEWS[4]} size="sm" />
        </Right>
      </NewsDisplay>
      <NewsModal idx={1} visible={true} />
    </>
  );
};

export default Home;
