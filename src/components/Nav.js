import LiveRoom from "./LiveRoom";
import TeamInf from "./TeamInf";
import Login from "./Login";
import App from "./App";
import Profile from "./Profile";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../utils/firebase";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

const NavBar = styled.div`
  padding: 10px;
  background-color: #f44336;
  font-size: 30px;

  @media screen and (max-width: 992px) {
    width: 100vw;
  }
`;

const Container = styled.div`
  width: 70vw;
  margin: auto;
  margin-top: 5vw;
`;

const HeadContainer = styled.div`
  width: 70vw;
  display: flex;
  border: 1px solid gray;
  border-radius: 5px;
  position: relative;
`;

const LinkComponet = styled(Link)`
  width: 7vw;
  border: 1px solid gray;
  text-align: center;
  background-color: ${(props) => (props.$focus ? "gray" : "white")};
  color: black;
  text-decoration: none;
  :active {
    background-color: rgb(41, 41, 41);
  }
  :last-child {
    position: absolute;
    right: 0px;
  }
`;

function Nav() {
  const [navActive, setNavActive] = useState();
  const [logStatus, setLogStatus] = useState(false);
  const [logFirstTime, setLogFirstTime] = useState(false);
  const [userId, setUserId] = useState();
  let redirect = useNavigate();

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("登入中");
        setUserId(user.email);
        setLogStatus(true);
      } else {
        console.log("已登出");
      }
    });
  };
  useEffect(() => {
    monitorAuthState();
  }, [logStatus]);

  useEffect(() => {
    if (logStatus) {
      redirect("/profile");
    }
  }, [logFirstTime]);

  const logout = async () => {
    await signOut(auth);
  };

  const logInOut = function () {
    if (logStatus === false) {
      // setNavActive(3);
    } else if (logStatus === true) {
      logout();
      setLogStatus(false);
      // setNavActive(3);
    }
  };

  return (
    <>
      <NavBar>
        <LinkComponet
          $focus={navActive === 2}
          onClick={() => {
            logStatus ? setNavActive(2) : setNavActive(3);
          }}
          to="/live-room"
        >
          LiveRoom
        </LinkComponet>
        <span> | </span>
        <LinkComponet
          $focus={navActive === 3}
          onClick={() => {
            logStatus ? setNavActive(3) : setNavActive(4);
          }}
          to="/profile"
        >
          Profile
        </LinkComponet>
        <span> | </span>
        <LinkComponet
          $focus={navActive === 4}
          onClick={() => {
            logInOut();
          }}
          to="/login"
        >
          {logStatus ? "Logout" : "Login"}
        </LinkComponet>
      </NavBar>

      <Routes>
        <Route path="/team-inf" element={<TeamInf userId={userId} />} />
        <Route path="/record" element={<App />} />
        <Route path="/live-room" element={<LiveRoom />} />
        <Route path="/profile" element={<Profile userId={userId} />} />
        <Route
          path="/login"
          element={
            <Login
              setLogFirstTime={setLogFirstTime}
              setNavActive={setNavActive}
              setUserId={setUserId}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Nav;
