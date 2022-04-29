import LiveRoom from "./LiveRoom";
import PastGame from "./PastGame";
import TeamInf from "./TeamInf";
import Login from "./Login";
import App from "./App";
import Home from "./Home";
import Test from "./Test";
import GameData from "./GameData";
import Profile from "./Profile";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../utils/firebase";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import GameSchedule from "./GameSchedule";
import GameArrange from "./GameArrange";

const NavBar = styled.div`
  height: 50px;
  padding: 15px;
  background-color: #212529;
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
  ${"" /* border: 1px solid gray; */}
  text-align: center;
  background-color: #212529;
  color: ${(props) => (props.$focus ? "#adb5bd" : "white")};
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
  const [commingGame, setCommingGame] = useState("20220426_laker_nets");
  const [pastGameRoutes, setPastGameRoutes] = useState();
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
          $focus={navActive === -1}
          onClick={() => setNavActive(-1)}
          to="/"
        >
          Home
        </LinkComponet>
        <span> | </span>
        <LinkComponet
          $focus={navActive === 0}
          onClick={() => setNavActive(0)}
          to="/record"
        >
          Record
        </LinkComponet>
        <span> | </span>
        <LinkComponet to="/test">Test</LinkComponet>
        <span> | </span>
        <LinkComponet
          $focus={navActive === 1}
          onClick={() => {
            setNavActive(1);
          }}
          to="/game-data"
        >
          GameData
        </LinkComponet>
        <span> | </span>
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
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />

        <Route path="/record" element={<App commingGame={commingGame} />} />
        <Route
          path="/game-data"
          element={
            <GameData
              pastGameRoutes={pastGameRoutes}
              setPastGameRoutes={setPastGameRoutes}
            />
          }
        >
          {pastGameRoutes?.map((gameName) => (
            <Route
              path={`${gameName}`}
              element={<PastGame gameName={gameName} />}
            />
          ))}
        </Route>

        <Route
          path="/live-room"
          element={<LiveRoom commingGame={commingGame} />}
        />
        <Route path="/profile" element={<Profile userId={userId} />}>
          <Route path="game-schedule" element={<GameSchedule />} />
          <Route path="game-arrange" element={<GameArrange />} />
          <Route path="team-inf" element={<TeamInf userId={userId} />} />
        </Route>
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
