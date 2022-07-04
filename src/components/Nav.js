import LiveRoom from "./LiveRoom/LiveRoom";
import TeamInf from "./TeamInf/TeamInf";
import Login from "./Login/Login";
import App from "./Record/App";
import Home from "./Home/Home";
// import LoadingPage from "./LoadingPage/LoadingPage";
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
import GameSchedule from "./GameSchedule/GameSchedule";
import GameArrange from "./GameArrange/GameArrange";
import NotFoundPage from "./404/NotFoundPage";

const SideBar = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  width: 80px;
  position: fixed;
  top: 10px;
  right: 0px;
`;

const NavBar = styled.div`
  z-index: 10;
  padding: 20px;
  position: fixed;
  top: 0px;
  display: flex;
  width: 100vw;
  height: 100px;
  background-color: #f8f9fa;
  color: #f8f9fa;
  flex-wrap: wrap;
  font-size: 26px;
  box-shadow: rgb(0 0 0 / 18%) 0px 2px 2px;
`;

const LinkComponet = styled(Link)`
  width: 150px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.$focus ? "#343a40" : "#495057")};
  text-decoration: none;
  @media (max-width: 768px) {
    width: 90px;
  }
  @media (max-width: 414px) {
    width: 60px;
  }
  &:hover > div {
    border-bottom: 2px solid #cccccc;
  }
  div {
    border-bottom: ${(props) => props.$focus && "2px solid #343a40"};
  }
`;

const LinkImg = styled.img`
  width: 35px;
  height: 35px;
`;

const LinkImg1 = styled.img`
  margin-right: ${(props) => props.maginRight};
  width: 50px;
  height: 50px;
`;

const LogoImg = styled.img`
  filter: ${(props) =>
    props.$focus ? "drop-shadow(-10px 10px 2px rgba(0, 0, 0, 0.5))" : null};
  width: 60px;
  height: 60px;
`;

const RecordDiv = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
`;

const IconComponet = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 100%;
  color: ${(props) => (props.$focus ? "#adb5bd" : "white")};
  border: ${(props) => (props.$focus ? "5px solid black" : null)};
  text-decoration: none;
  span {
    position: absolute;
    right: 70px;
    visibility: hidden;
    font-size: 14px;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  }
  &:hover {
    span {
      visibility: visible;
    }
  }

  :active {
    background-color: rgb(41, 41, 41);
  }
`;

const MemberId = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  color: black;
  font-size: 22px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const RightSideContainer = styled.div`
  height: 70px;
  position: fixed;
  right: 0px;
  display: flex;
`;

const NavText = styled.div`
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 414px) {
    display: none;
  }
`;

function Nav() {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [isGameStart, setIsGameStart] = useState(false);
  const [navActive, setNavActive] = useState(-1);
  const [logStatus, setLogStatus] = useState(false);
  const [logFirstTime, setLogFirstTime] = useState(false);
  const [userId, setUserId] = useState();
  const [scheduleGames, setScheduleGames] = useState([]);
  const [everyLiveGames, setEveryLiveGames] = useState([]);
  const [pastGameRoutes, setPastGameRoutes] = useState();
  const [liveGameRoutes, setLiveGameRoutes] = useState();
  const liveGameName = useRef("none");
  let redirect = useNavigate();

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.email);
        setLogStatus(true);
      }
    });
  };

  useEffect(() => {
    monitorAuthState();
  }, [logStatus, logFirstTime]);

  const logout = async () => {
    await signOut(auth);
  };

  const logInOut = function () {
    if (logStatus === true) {
      logout();
      setLogStatus(false);
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
      {/* {isLoading && <LoadingPage />} */}
      {isGameStart ? (
        <SideBar>
          <IconComponet
            onClick={() => {
              redirect("/");
              setIsGameStart(false);
            }}
          >
            <LinkImg1
              src={require("../img/logout/logout1.png")}
              alt="Watch Record"
            />
            <span>回到首頁</span>
          </IconComponet>
        </SideBar>
      ) : (
        <NavBar>
          <LinkComponet
            $focus={navActive === -1}
            onClick={() => setNavActive(-1)}
            to="/"
          >
            <LogoImg
              $focus={navActive === -1}
              src={
                navActive === -1
                  ? require("../img/logoB.png")
                  : require("../img/logoG.png")
              }
            />
          </LinkComponet>

          {logStatus ? (
            <>
              {userId === "test@test.com" && (
                <RecordDiv>
                  <LinkComponet
                    $focus={navActive === 0}
                    onClick={() => setNavActive(0)}
                    to="/record"
                  >
                    <LinkImg1
                      src={
                        navActive === 0
                          ? require("../img/basketball.png")
                          : require("../img/basketballG.png")
                      }
                    />
                    <NavText>記錄</NavText>
                  </LinkComponet>
                </RecordDiv>
              )}

              {userId !== "test@test.com" && (
                <LinkComponet
                  $focus={navActive === 5}
                  onClick={() => setNavActive(5)}
                  to="/game-schedule"
                >
                  <LinkImg
                    src={
                      navActive === 5
                        ? require("../img/calendar/calendar.png")
                        : require("../img/calendar/calendarG.png")
                    }
                  />
                  <NavText>賽程</NavText>
                </LinkComponet>
              )}
              {userId === "test@test.com" && (
                <LinkComponet
                  $focus={navActive === 6}
                  onClick={() => setNavActive(6)}
                  to="/game-arrange"
                >
                  <LinkImg
                    src={
                      navActive === 6
                        ? require("../img/editCalendar/plan.png")
                        : require("../img/editCalendar/planG.png")
                    }
                  />
                  <NavText>賽程</NavText>
                </LinkComponet>
              )}
              {userId !== "test@test.com" && (
                <LinkComponet
                  $focus={navActive === 7}
                  onClick={() => setNavActive(7)}
                  to="/team-inf"
                >
                  <LinkImg
                    src={
                      navActive === 7
                        ? require("../img/basketball.png")
                        : require("../img/basketballG.png")
                    }
                  />
                  組隊
                </LinkComponet>
              )}
            </>
          ) : null}

          <RightSideContainer>
            <MemberId>
              {logStatus
                ? userId === "test@test.com"
                  ? "Hi, 主辦者 "
                  : "Hi, 參賽者"
                : null}
            </MemberId>
            <LinkComponet
              $focus={navActive === 4}
              onClick={() => {
                setNavActive(4);
                logInOut();
              }}
              to="/login"
            >
              <LinkImg
                src={
                  logStatus
                    ? navActive === 4
                      ? require("../img/logout/logout.png")
                      : require("../img/logout/signoutG.png")
                    : navActive === 4
                    ? require("../img/profile/profileB.png")
                    : require("../img/profile/profileG.png")
                }
              />
              <NavText>{logStatus ? "登出" : "登入"}</NavText>
            </LinkComponet>
          </RightSideContainer>
        </NavBar>
      )}

      <Routes>
        <Route path="/" element={<Home />}></Route>

        {liveGameRoutes?.map((gameName, index) => (
          <Route
            key={index}
            path={`live-now/${encodeURI(gameName)}`}
            element={
              <LiveRoom gameName={gameName} liveGameRoutes={liveGameRoutes} />
            }
          />
        ))}
        {pastGameRoutes?.map((gameName, index) => (
          <Route
            key={index}
            path={`past-game/${encodeURI(gameName)}`}
            element={<LiveRoom gameName={gameName} pastGameName={gameName} />}
          />
        ))}

        <Route
          path="/record"
          element={
            <App
              setIsGameStart={setIsGameStart}
              scheduleGames={scheduleGames}
              everyLiveGames={everyLiveGames}
              liveGameName={liveGameName}
            />
          }
        />

        <Route
          path="game-schedule"
          element={<GameSchedule userId={userId} />}
        />
        <Route path="game-arrange" element={<GameArrange />} />
        <Route path="team-inf" element={<TeamInf userId={userId} />} />
        <Route
          path="/login"
          element={
            <Login
              setLogFirstTime={setLogFirstTime}
              setNavActive={setNavActive}
              logStatus={logStatus}
              setUserId={setUserId}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default Nav;
