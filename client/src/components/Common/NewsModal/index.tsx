import { FC, useRef, useEffect, useState } from "react";
import useOnClickOutside from "@/lib/hooks/useOnClickOutside";
import Loading from "../Loading";
import { ModalOverlay, ModalWrapper, ModalInner } from "./index.style";
import NewsContent from "@/components/Common/NewsContent";

interface NewsItem {
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
  news: NewsItem;
  visible: boolean;
  removeModal: () => void;
}

const NewsModal: FC<Props> = ({ news, visible, removeModal }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newsItem, setNewsItem] = useState<NewsItem>();

  useOnClickOutside(modalRef, () => {
    removeModal();
  });

  return (
    <>
      <>
        <ModalOverlay visible={visible} />
        <ModalWrapper visible={visible}>
          <ModalInner ref={modalRef} className="modal-inner">
            {loading ? <Loading /> : news && <NewsContent newsItem={news} />}
          </ModalInner>
        </ModalWrapper>
      </>
    </>
  );
};

export default NewsModal;
