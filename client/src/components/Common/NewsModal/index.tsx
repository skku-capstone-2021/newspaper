import { FC, useRef, useEffect, useState } from "react";
import useOnClickOutside from "@/lib/hooks/useOnClickOutside";
import Loading from "../Loading";
import { ModalOverlay, ModalWrapper, ModalInner } from "./index.style";
import NewsContent from "@/components/Common/NewsContent";

interface Props {
  idx: number;
  visible: boolean;
  removeModal: () => void;
}

interface NewsItem {
  company: string;
  title: string;
  keywords: string[];
  score: number;
  category: string;
  origin: string;
  date: string;
  img: string;
  shortContent: string;
  content: string;
}

const NewsModal: FC<Props> = ({ visible, removeModal }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [newsItem, setNewsItem] = useState<NewsItem>();

  useOnClickOutside(modalRef, () => {
    removeModal();
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNewsItem({
        company: "ABC NEWS",
        title: "This is News Title",
        keywords: ["keywords1", "keywords2", "keywords3"],
        score: 1,
        category: "society",
        origin:
          "https://www.notion.so/0491d1639de247a4b237638e2e319d7b?v=eea4ae3aeeaa43659db16ce211f5fab1&p=015e603b5299452aa7adce5630e678b7",
        date: "2021-09-24",
        img: "https://user-images.githubusercontent.com/47776356/134925803-def90275-df33-4782-93c0-7b9757379613.jpeg",
        shortContent:
          "short content short content short content short content short content short content short content short content short content",
        content:
          "long content long contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong contentlong content",
      });
      setLoading(false);
    }, 0);
  }, []);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible}>
        <ModalInner ref={modalRef} className="modal-inner">
          {loading ? (
            <Loading />
          ) : (
            newsItem && <NewsContent newsItem={newsItem} />
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default NewsModal;
