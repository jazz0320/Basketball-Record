import PropTypes from "prop-types";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../../utils/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.5);
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  @media (max-width: 1024px) {
    width: 90vw;
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
  height: 100vh;
`;

const FormDiv = styled.div`
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  width: 100%;
  @media (max-width: 768px) {
    width: 90%;
  }
  max-width: 450px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
`;

const RoleDivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RoleDiv = styled.div`
  cursor: pointer;
  border-radius: 5px;
  width: 50%;
  font-size: 30px;
  text-align: center;
  background-color: ${(props) => (props.userRoleRecorder ? "#6c757d" : null)};
  color: ${(props) => (props.userRoleRecorder ? "white" : null)};
`;

const InfContainer = styled.div`
  border-radius: 5px;
`;
const Input = styled.input`
  width: 100%;
  max-width: 400px;
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

const FullPageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #e9ecef;
`;

const TitleBox = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ButtonSubmit = styled.button`
  background-color: #343a40;
  border: 1px solid white;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  width: 180px;

  @media (max-width: 768px) {
    width: 40%;
  }
  height: 50px;
  transition: all 0.1s ease-in;
  ::-moz-focus-inner {
    border: 0;
  }
  &:hover {
    background-color: #495057;
    ${() => `transform: translateY(-3px)`}
  }
  &:active {
    background-color: ${() => "#212529"};
  }
`;

function Login(props) {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("testtest");
  const [error, setError] = useState();
  const [userRoleRecorder, setUserRoleRecorder] = useState(true);

  let redirect = useNavigate();

  useEffect(() => {
    if (props.logStatus === true) {
      redirect("/");
    }
  }, [props.logStatus]);

  const loginEmailPassword = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      props.setUserId(userCredential.user.email);

      props.setLogFirstTime(true);
      props.setNavActive(-1);
      redirect("/");
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
      props.setUserId(userCredential.user.email);
      props.setLogFirstTime(true);
      props.setNavActive(-1);
      redirect("/");
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
      <FullPageContainer>
        <Wrapper>
          <FormDiv>
            <RoleDivContainer>
              <RoleDiv
                userRoleRecorder={userRoleRecorder}
                onClick={() => {
                  setUserRoleRecorder(true),
                    setEmail("test@test.com"),
                    setPassword("testtest");
                }}
              >
                主辦方
              </RoleDiv>
              <RoleDiv
                userRoleRecorder={!userRoleRecorder}
                onClick={() => {
                  setUserRoleRecorder(false),
                    setEmail("test2@test.com"),
                    setPassword("testtest");
                }}
              >
                參賽者
              </RoleDiv>
            </RoleDivContainer>
            <InfContainer>
              <div>
                <TitleBox>信箱</TitleBox>
                <div>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></Input>
                </div>
              </div>
              <div>
                <TitleBox>密碼</TitleBox>
                <div>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></Input>
                </div>
              </div>
            </InfContainer>
            <ButtonContainer>
              <ButtonSubmit onClick={loginEmailPassword}>登入</ButtonSubmit>

              <ButtonSubmit onClick={createAccount}>註冊</ButtonSubmit>
            </ButtonContainer>
            <div>{error}</div>
          </FormDiv>
        </Wrapper>
      </FullPageContainer>
    </>
  );
}

Login.propTypes = {
  logStatus: PropTypes.bool,
  setUserId: PropTypes.func,
  setLogFirstTime: PropTypes.func,
  setNavActive: PropTypes.func,
};

export default Login;
