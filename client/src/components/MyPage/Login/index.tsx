import { FC, useEffect, useState, useCallback } from "react";
import { TextField, Button, InputLabel } from "@material-ui/core";
import Cookies from "js-cookie";
import {
  Wrapper,
  ModalWrapper,
  ModalInner,
  InputWrapper,
  ButtonWrapper,
  Toggle,
} from "./index.style";
import { alert } from "@/lib/utils/alert";
import { sendPost } from "@/lib/utils/api";

interface Props {
  removeLoginModal: () => void;
}

const LoginModal: FC<Props> = ({ removeLoginModal }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verify, setVerify] = useState<string>("");

  const toogleMode = useCallback(() => {
    setIsLogin(!isLogin);
  }, [isLogin]);

  const handleSubmit = useCallback(() => {
    if (isLogin) {
      if (!id) {
        alert("please input id");
        return;
      }

      if (!password) {
        alert("please input password");
        return;
      }

      sendPost("/user/signin", {
        id,
        password,
      }).then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          Cookies.set("id", res.data.idx, { path: "/" });
          removeLoginModal();
        }
      });
    } else {
      if (!id) {
        alert("please input id");
        return;
      }

      if (!password) {
        alert("please input password");
        return;
      }

      if (!verify) {
        alert("please input verify password");
        return;
      }

      if (password !== verify) {
        alert("please input same password, verify password");
        return;
      }

      sendPost("/user/signup", {
        id,
        password,
      }).then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          setIsLogin(true);
        }
      });
    }
  }, [isLogin, id, password, verify]);

  const handleId = useCallback(
    (e: any) => {
      setId(e.target.value);
    },
    [id, password, verify]
  );

  const handlePassword = useCallback(
    (e: any) => {
      setPassword(e.target.value);
    },
    [id, password, verify]
  );

  const handleVerify = useCallback(
    (e: any) => {
      setVerify(e.target.value);
    },
    [id, password, verify]
  );

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
              onChange={handleId}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel style={{ marginBottom: "0.5rem" }}>Password</InputLabel>
            <TextField
              fullWidth
              required
              placeholder="Enter password"
              variant="outlined"
              type="password"
              onChange={handlePassword}
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
                type="password"
                onChange={handleVerify}
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
