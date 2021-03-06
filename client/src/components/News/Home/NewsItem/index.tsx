import { FC, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FrontItem, BackItem, Title, Company } from "./index.style";

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
  item: News;
  size: "lg" | "sm";
  handleNewsClick: (item: News) => void;
}

const NewsItem: FC<Props> = ({ item, size, handleNewsClick }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <div
      onClick={() => {
        handleNewsClick(item);
      }}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <FrontItem
          img={item.img_url}
          size={size}
          onMouseOver={() => {
            setIsFlipped(true);
          }}
        />
        <BackItem
          size={size}
          onMouseLeave={() => {
            setIsFlipped(false);
          }}
        >
          <Title size={size}>{item.title}</Title>
          <Company size={size}>{item.company}</Company>
        </BackItem>
      </ReactCardFlip>
    </div>
  );
};

export default NewsItem;
