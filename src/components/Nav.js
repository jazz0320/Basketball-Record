import LiveRoom from "./LiveRoom";
import TeamInf from "./TeamInf";
import MemberFile from "./MemberFile";
import Login from "./Login";
import App from "./App";
import Home from "./Home";
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
import { GeneralDiv, IconComponet, GeneralImg } from "../utils/StyleComponent";

const SideBar = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  width: 80px;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const NavBar = styled.div`
  z-index: 10;
  padding: 20px;
  position: fixed;
  top: 0px;
  display: flex;
  width: 100vw;
  height: 100px;
  background-color: #212529;
  color: #f8f9fa;
  flex-wrap: wrap;

  font-size: 26px;
  box-shadow: 15px 5px 4px rgba(0, 0, 0, 0.7);
`;

const LinkComponet = styled(Link)`
  width: 150px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: white; */
  border-radius: 100%;
  color: ${(props) => (props.$focus ? "white" : "#adb5bd")};

  text-decoration: none;

  :active {
    background-color: rgb(41, 41, 41);
  }
`;

const LinkImg = styled.img`
  filter: ${(props) =>
    props.$focus
      ? "drop-shadow(30px 30px 1px rgba(255, 255, 255, 0.7))"
      : null};
  src: ${(props) => props.src};
  width: ${(props) => (props.width ? props.width : "35px")};
  height: ${(props) => (props.height ? props.height : "35px")};
`;

function Nav() {
  const [isGameStart, setIsGameStart] = useState(false);
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
    } else if (logStatus === true) {
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
      {isGameStart ? (
        <SideBar>
          <IconComponet
            onClick={() => {
              redirect("/");
              setIsGameStart(false);
            }}
          >
            <GeneralImg
              width="50px"
              height="50px"
              src={require("../img/logout/logout1.png")}
              alt="Watch Record"
            />
          </IconComponet>
        </SideBar>
      ) : (
        <NavBar>
          <GeneralDiv height="70px">
            <LinkComponet
              $focus={navActive === -1}
              onClick={() => setNavActive(-1)}
              to="/"
            >
              <LinkImg
                $focus={navActive === -1}
                height="60px"
                width="60px"
                src={require("../img/logo.png")}
              />
            </LinkComponet>
          </GeneralDiv>
          {logStatus ? (
            <>
              {userId === "test@test.com" && (
                <GeneralDiv height="70px">
                  <LinkComponet
                    $focus={navActive === 0}
                    onClick={() => setNavActive(0)}
                    to="/record"
                  >
                    <LinkImg
                      $focus={navActive === 0}
                      src={require("../img/basketballW.png")}
                      height="50px"
                      width="50px"
                    />
                    <GeneralDiv margin="5px">記錄</GeneralDiv>
                  </LinkComponet>
                </GeneralDiv>
              )}

              {userId !== "test@test.com" && (
                <GeneralDiv height="70px">
                  <LinkComponet
                    $focus={navActive === 5}
                    onClick={() => setNavActive(5)}
                    to="/game-schedule"
                  >
                    <LinkImg
                      $focus={navActive === 5}
                      src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fcalendar.png?alt=media&token=411be2b9-84b9-435b-b9f6-40eba70de6c7"
                    />
                    <GeneralDiv margin="10px">賽程</GeneralDiv>
                  </LinkComponet>
                </GeneralDiv>
              )}
              {userId === "test@test.com" && (
                <GeneralDiv height="70px">
                  <LinkComponet
                    $focus={navActive === 6}
                    onClick={() => setNavActive(6)}
                    to="/game-arrange"
                  >
                    <LinkImg
                      $focus={navActive === 6}
                      src={require("../img/editCalendar/planW.png")}
                    />
                    <GeneralDiv margin="10px">賽程</GeneralDiv>
                  </LinkComponet>
                </GeneralDiv>
              )}
              {userId !== "test@test.com" && (
                <GeneralDiv height="70px">
                  <LinkComponet
                    $focus={navActive === 7}
                    onClick={() => setNavActive(7)}
                    to="/team-inf"
                  >
                    <LinkImg
                      $focus={navActive === 7}
                      src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fteam.png?alt=media&token=0130a93d-5303-4d6a-b4f3-6b7b4f7ea729"
                    />
                    組隊
                  </LinkComponet>
                </GeneralDiv>
              )}
            </>
          ) : null}

          <GeneralDiv height="70px" position="fixed" right="0px" display="flex">
            <GeneralDiv
              display="flex"
              alignItems="center"
              height="60px"
              fontSize="22px"
            >
              {logStatus
                ? userId === "test@test.com"
                  ? "Hi, 主辦者 "
                  : "Hi, 參賽者"
                : null}
            </GeneralDiv>
            <LinkComponet
              $focus={navActive === 4}
              onClick={() => {
                setNavActive(4);
                logInOut();
              }}
              to="/login"
            >
              {logStatus ? (
                <>
                  <LinkImg
                    $focus={navActive === 4}
                    src={require("../img/logout/logoutW.png")}
                  />
                  <GeneralDiv margin="5px">登出</GeneralDiv>
                </>
              ) : (
                <>
                  <LinkImg
                    $focus={navActive === 4}
                    src={require("../img/profile/profileW.png")}
                  />
                  登入
                </>
              )}
            </LinkComponet>
          </GeneralDiv>
        </NavBar>
      )}

      <Routes>
        <Route
          path="/"
          element={<Home setComingGameRoutes={setComingGameRoutes} />}
        ></Route>

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

        <Route path="member-file" element={<MemberFile />} />
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
              setUserId={setUserId}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Nav;
