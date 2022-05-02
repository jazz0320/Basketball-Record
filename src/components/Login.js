import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../utils/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ButtonSubmit } from "../utils/StyleComponent";

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  let redirect = useNavigate();

  const loginEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      props.setUserId(userCredential.user.email);
      props.setLogFirstTime(true);
      props.setNavActive(3);
      redirect("/profile");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("無效信箱");
      } else if (error.code === "auth/wrong-password") {
        setError("密碼錯誤");
      } else if (error.code === "auth/user-not-found") {
        setError("使用者不存在");
      } else {
        setError("我不知道");
      }
    }
  };

  const createAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      props.setLogFirstTime(true);
      props.setNavActive(3);
      redirect("/profile");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("無效信箱");
      } else if (error.code === "auth/email-already-in-use") {
        setError("信箱已用");
      } else if (error.code === "auth/weak-password") {
        setError("密碼太弱");
      } else {
        setError("我不知道");
      }
    }
  };

  return (
    <>
      <Wrapper>
        <FormDiv>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>信箱</div>
            <div>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>
            <span style={{ color: "#F8F9FA" }}>test@test.com</span>
          </div>
          <div>
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>密碼</div>
            <div>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </div>
            <span style={{ color: "#F8F9FA" }}>testtest</span>
          </div>
          <div>
            <ButtonSubmit
              onClick={loginEmailPassword}
              style={{
                width: "280px",
                height: "70px",
                marginLeft: "0px",
                padding: "10px",
              }}
            >
              登入
            </ButtonSubmit>

            <ButtonSubmit
              onClick={createAccount}
              style={{ width: "280px", height: "70px", padding: "10px" }}
            >
              註冊
            </ButtonSubmit>
          </div>
          <div>{error}</div>
        </FormDiv>
      </Wrapper>
    </>
  );
}
export default Login;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 100px);
  width: 100%;
  div {
    font-size: 24px;
  }
`;

const FormDiv = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 680px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  max-width: 565px;
  padding: 11px 13px;
  background: #f9f9fa;
  color: black;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 24px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;
