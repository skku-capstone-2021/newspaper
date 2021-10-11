import { createPortal } from "react-dom";
import { AlertModalWrapper } from "./index.style";

const AlertModalComponent = () => (
  <AlertModalWrapper className="alert-modal">
    <span />
  </AlertModalWrapper>
);

export default () =>
  createPortal(AlertModalComponent(), document.getElementById("portal") as any);
