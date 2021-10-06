import { FC, useEffect, useState, useCallback } from "react";
import { TextField, Button, InputLabel } from "@material-ui/core";
import {
  Wrapper,
  ModalWrapper,
  ModalInner,
  InputWrapper,
  ButtonWrapper,
  Toggle,
} from "./index.style";

interface Props {
  removeLoginModal: () => void;
}

const LoginModal: FC<Props> = ({ removeLoginModal }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verify, setVerify] = useState<string>("");

  const toogleMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  const handleSubmit = useCallback(() => {
    if (isLogin) {
      console.log("로그인 로직");
      removeLoginModal();
    } else {
      setIsLogin(true);
      console.log("회원가입 로직");
    }
  }, [isLogin]);

  return (
    <Wrapper>
      <ModalWrapper>
        <ModalInner className="modal-inner">
          <InputWrapper>
            <InputLabel style={{ marginBottom: "0.5rem" }}>Id</InputLabel>
            <TextField
              fullWidth
              required
              placeholder="Enter Id"
              variant="outlined"
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel style={{ marginBottom: "0.5rem" }}>Password</InputLabel>
            <TextField
              fullWidth
              required
              placeholder="Enter password"
              variant="outlined"
            />
          </InputWrapper>
          {!isLogin && (
            <InputWrapper>
              <InputLabel style={{ marginBottom: "0.5rem" }}>
                Verify password
              </InputLabel>
              <TextField
                fullWidth
                required
                placeholder="Enter password"
                variant="outlined"
              />
            </InputWrapper>
          )}
          <ButtonWrapper>
            <Button
              onClick={handleSubmit}
              fullWidth
              size="large"
              variant="outlined"
              color="primary"
            >
              {isLogin ? "Sign in" : "Sign up"}
            </Button>
          </ButtonWrapper>
          <Toggle onClick={toogleMode}>
            {isLogin ? "Sign up" : "Sign in"}
          </Toggle>
        </ModalInner>
      </ModalWrapper>
    </Wrapper>
  );
};

export default LoginModal;
