import { FC, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { FrontItem, BackItem, Title, Company } from "./index.style";

interface Props {
  item: {
    idx: number;
    img: string;
    company: string;
    title: string;
  };
  size: "lg" | "sm";
}

const NewsItem: FC<Props> = ({ item, size }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <FrontItem
        img={item.img}
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
  );
};

export default NewsItem;
