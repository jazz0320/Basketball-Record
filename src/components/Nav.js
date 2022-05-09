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
import { GeneralDiv } from "../utils/StyleComponent";

const NavBar = styled.div`
  position: fixed;
  right: 50px;
  top: 30px;
  display: flex;
  width: 30px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30px;
`;

const LinkComponet = styled(Link)`
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
  :hover {
    width: 70px;
    height: 70px;
  }
  :active {
    background-color: rgb(41, 41, 41);
  }
`;

const LinkImg = styled.img`
  src: ${(props) => props.src};
  width: 40px;
  height: 40px;
`;

function Nav() {
  const [navActive, setNavActive] = useState();
  const [logStatus, setLogStatus] = useState(false);
  const [logFirstTime, setLogFirstTime] = useState(false);
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState();
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
        <GeneralDiv height="70px">
          <LinkComponet
            $focus={navActive === -1}
            onClick={() => setNavActive(-1)}
            to="/"
          >
            <LinkImg
              src="
          
          https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fhome.png?alt=media&token=a22b88c8-fc87-48d1-a7de-32e3cb9aa20b
          "
            />
          </LinkComponet>
        </GeneralDiv>
        {logStatus ? (
          <>
            {userRole === 2 && (
              <GeneralDiv height="70px">
                <LinkComponet
                  $focus={navActive === 0}
                  onClick={() => setNavActive(0)}
                  to="/record"
                >
                  <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Frecord.png?alt=media&token=17a10f94-10d7-4b71-bc65-fc1202eaf1b4          " />
                </LinkComponet>
              </GeneralDiv>
            )}
            {/* <GeneralDiv height="70px">
              <LinkComponet
                $focus={navActive === 3}
                onClick={() => {
                  logStatus ? setNavActive(3) : setNavActive(4);
                }}
                to="/member-file"
              >
                <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fprofile.png?alt=media&token=d8f8dd4b-79f8-402f-9260-38c47d6fc9f3" />
              </LinkComponet>
            </GeneralDiv> */}
            <GeneralDiv height="70px">
              <LinkComponet
                $focus={navActive === 5}
                onClick={() => setNavActive(5)}
                to="/game-schedule"
              >
                <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fcalendar.png?alt=media&token=411be2b9-84b9-435b-b9f6-40eba70de6c7" />
              </LinkComponet>
            </GeneralDiv>
            {userRole === 2 && (
              <GeneralDiv height="70px">
                <LinkComponet
                  $focus={navActive === 6}
                  onClick={() => setNavActive(6)}
                  to="/game-arrange"
                >
                  <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fplan.png?alt=media&token=c8f75623-527a-43d2-bc72-166689252eb8" />
                </LinkComponet>
              </GeneralDiv>
            )}
            <GeneralDiv height="70px">
              <LinkComponet
                $focus={navActive === 7}
                onClick={() => setNavActive(7)}
                to="/team-inf"
              >
                <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fteam.png?alt=media&token=0130a93d-5303-4d6a-b4f3-6b7b4f7ea729" />
              </LinkComponet>
            </GeneralDiv>
          </>
        ) : null}

        <GeneralDiv height="70px">
          <LinkComponet
            $focus={navActive === 4}
            onClick={() => {
              setNavActive(4);
              logInOut();
            }}
            to="/login"
          >
            {logStatus ? (
              <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Flogout.png?alt=media&token=1e2b01d5-2bcd-4498-b7ba-c22a148654f6" />
            ) : (
              <LinkImg src="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Flogin.png?alt=media&token=6be000e7-4df8-4262-8e80-e7ad1a054880" />
            )}
          </LinkComponet>
        </GeneralDiv>
      </NavBar>

      <Routes>
        <Route
          path="/"
          element={<Home setComingGameRoutes={setComingGameRoutes} />}
        ></Route>
        {liveGameRoutes?.map((gameName, index) => (
          <Route
            key={index}
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
            element={<LiveRoom gameName={gameName} pastGameName={gameName} />}
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

        <Route path="member-file" element={<MemberFile />} />
        <Route path="game-schedule" element={<GameSchedule />} />
        <Route path="game-arrange" element={<GameArrange />} />
        <Route path="team-inf" element={<TeamInf userId={userId} />} />
        <Route
          path="/login"
          element={
            <Login
              setLogFirstTime={setLogFirstTime}
              setUserRole={setUserRole}
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
