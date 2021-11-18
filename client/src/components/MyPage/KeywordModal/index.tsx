import { FC, useRef, useEffect, useState, useCallback } from "react";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import Cookies from "js-cookie";
import Loading from "@/components/Common/Loading";
import useOnClickOutside from "@/lib/hooks/useOnClickOutside";
import { ModalOverlay, ModalWrapper, ModalInner } from "./index.style";
import { Edit, Cancle } from "@/assets";
import { alert } from "@/lib/utils/alert";
import { sendPost } from "@/lib/utils/api";

const Wrapper = styled.div`
  border: 0.5px solid #999999;
  margin-top: 1rem;
  padding: 1.2rem 2rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Keyword = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 1.3rem;
`;
const Icons = styled.div`
  display: flex;
  gap: 1.1rem;
`;
const Icon = styled.img`
  width: 1.1rem;
  height: 1.1rem;

  &:hover {
    transition: transform 0.3s;

    filter: invert(45%) sepia(32%) saturate(2122%) hue-rotate(217deg)
      brightness(99%) contrast(94%);

    transform: scale(1.2);
  }
`;

interface Props {
  visible: boolean;
  removeModal: () => void;
}

const KeywordModal: FC<Props> = ({ visible, removeModal }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useOnClickOutside(modalRef, () => {
    removeModal();
  });

  useEffect(() => {
    setLoading(true);
    sendPost("/user/getKeyword", { id: Cookies.get("id") }).then((res) => {
      if (!res.data) {
        setKeywords([]);
      } else {
        setKeywords(res.data.subscribe);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const handleInput = useCallback(
    (e: any) => {
      setInput(e.target.value);
    },
    [input]
  );

  const addKeyword = useCallback(
    (e: any) => {
      if (e.keyCode === 13) {
        if (keywords.includes(input)) {
          alert("Already Exist");
        } else {
          sendPost("/user/saveKeywords", {
            id: Cookies.get("id"),
            keywords: [...keywords, input],
          });
          setKeywords([...keywords, input]);
          setInput("");
        }
      }
    },
    [input]
  );

  const handleCancle = useCallback(
    (item: string) => {
      const idx = keywords.findIndex((i) => {
        return i === item;
      });
      const newKeywords = [...keywords];
      newKeywords.splice(idx, 1);
      sendPost("/user/saveKeywords", {
        id: Cookies.get("id"),
        keywords: newKeywords,
      });
      setKeywords(newKeywords);
    },
    [keywords]
  );

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible}>
        <ModalInner ref={modalRef} className="modal-inner">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <TextField
                fullWidth
                required
                placeholder="Add Keyword"
                variant="outlined"
                onChange={handleInput}
                onKeyDown={addKeyword}
                value={input}
              />
              <Wrapper>
                {keywords &&
                  keywords.length > 0 &&
                  keywords.map((item, index) => (
                    <Keyword key={index}>
                      <Title>{item}</Title>
                      <Icons>
                        <Icon
                          src={Cancle}
                          onClick={() => {
                            handleCancle(item);
                          }}
                        />
                      </Icons>
                    </Keyword>
                  ))}
              </Wrapper>
            </div>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default KeywordModal;
