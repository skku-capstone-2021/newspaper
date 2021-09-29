import { FC } from "react";
import Loading from "../Loading";
import { ModalOverlay, ModalWrapper, ModalInner } from "./index.style";

interface Props {
  idx: number;
  visible: boolean;
}

const NewsModal: FC<Props> = ({ idx, visible }) => {
  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible}>
        <ModalInner className="modal-inner">
          <Loading />
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

export default NewsModal;
