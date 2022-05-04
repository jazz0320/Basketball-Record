import LiveRoom from "./LiveRoom";
import PastGame from "./PastGame";
import TeamInf from "./TeamInf";
import MemberFile from "./MemberFile";
import Login from "./Login";
import App from "./App";
import Home from "./Home";
import Test from "./Test";

import Profile from "./Profile";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  auth,
  onAuthStateChanged,
  signOut,
  getDocs,
  collection,
  db,
} from "../utils/firebase";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import GameSchedule from "./GameSchedule";
import GameArrange from "./GameArrange";

const NavBar = styled.div`
  width: 100vw;
  height: 80px;
  padding: 15px;
  background-color: #212529;
  font-size: 30px;

  @media screen and (max-width: 992px) {
    width: 100vw;
  }
`;

const LinkComponet = styled(Link)`
  width: 7vw;
  text-align: center;
  background-color: #212529;
  color: ${(props) => (props.$focus ? "#adb5bd" : "white")};
  text-decoration: none;
  :active {
    background-color: rgb(41, 41, 41);
  }
  :last-child {
    position: absolute;
    right: 15px;
  }
`;

function Nav() {
  const [navActive, setNavActive] = useState();
  const [logStatus, setLogStatus] = useState(false);
  const [logFirstTime, setLogFirstTime] = useState(false);
  const [userId, setUserId] = useState();
  const [scheduleGames, setScheduleGames] = useState([]);
  const [everyLiveGames, setEveryLiveGames] = useState([]);
  const [pastGameRoutes, setPastGameRoutes] = useState();
  const [liveGameRoutes, setLiveGameRoutes] = useState();
  const [comingGameRoutes, setComingGameRoutes] = useState();
  const liveGameName = useRef("none");
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

  async function loadGames() {
    const querySnapshot = await getDocs(collection(db, "game_schedule"));
    querySnapshot.forEach((doc) => {
      if (doc.data().gameStatus === "coming") {
        setScheduleGames((games) => [...games, doc.id]);
      } else if (doc.data().gameStatus === "live") {
        setEveryLiveGames((games) => [...games, doc.id]);
      }
    });
  }

  async function loadingDataLive() {
    let data = {};
    let gameIds = [];
    const querySnapshot = await getDocs(collection(db, "live_game"));
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
      gameIds.push(doc.id);
    });
    setLiveGameRoutes(gameIds);
  }

  async function loadingDataPast() {
    let data = {};
    let gameIds = [];
    const querySnapshot = await getDocs(collection(db, "past_data"));
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
      gameIds.push(doc.id);
    });
    setPastGameRoutes(gameIds);
  }

  useEffect(() => {
    loadGames();
    loadingDataLive();
    loadingDataPast();
  }, []);

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
        {/* <LinkComponet to="/test">Test</LinkComponet>
        <span> | </span> */}

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
        <Route
          path="/"
          element={<Home setComingGameRoutes={setComingGameRoutes} />}
        >
          {liveGameRoutes?.map((gameName, index) => (
            <Route
              ley={index}
              path={`live-now/${gameName}`}
              element={
                <LiveRoom gameName={gameName} liveGameRoutes={liveGameRoutes} />
              }
            />
          ))}
          {pastGameRoutes?.map((gameName, index) => (
            <Route
              key={index}
              path={`past-game/${gameName}`}
              element={<PastGame gameName={gameName} />}
            />
          ))}
          {comingGameRoutes?.map((gameName, index) => (
            <Route
              key={index}
              path={`coming-soon/${gameName}`}
              element={
                <LiveRoom gameName={gameName} liveGameRoutes={liveGameRoutes} />
              }
            />
          ))}
        </Route>

        {/* <Route path="/test" element={<Test />} /> */}

        <Route
          path="/record"
          element={
            <App
              scheduleGames={scheduleGames}
              everyLiveGames={everyLiveGames}
              liveGameName={liveGameName}
            />
          }
        />

        <Route path="/profile" element={<Profile userId={userId} />}>
          <Route path="member-file" element={<MemberFile />} />
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
