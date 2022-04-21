import { useEffect, useState, useReducer } from "react";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  db,
  setDoc,
} from "../utils/firebase";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import {
  Div_Record,
  DivBeforeGame_Record,
  DivGameStart_Record,
} from "../utils/StyleComponent";
import "./App.css";
import Clock from "./Clock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Court3 from "./Court3";
import RecordRoom from "./RecordRoom";
import LiveRoom from "./LiveRoom";

function Nav() {
  const NavBar = styled.div`
    padding: 10px;
    background-color: #f44336;
    font-size: 30px;

    @media screen and (max-width: 992px) {
      width: 100vw;
    }
  `;
  return (
    <>
      <NavBar>
        <Link to="/">Record</Link>
        <span> | </span>
        <Link to="/live-room">LiveRoom</Link>
      </NavBar>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/live-room" element={<LiveRoom />} />
      </Routes>
    </>
  );
}

function App() {
  const [teams, setTeams] = useState([]);
  const [aTeam, setATeam] = useState("default");
  const [aTeamLogo, setATeamLogo] = useState();
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [aTeamData, setATeamData] = useState();

  const [bTeam, setBTeam] = useState("default");
  const [bTeamLogo, setBTeamLogo] = useState();
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const [bTeamData, setBTeamData] = useState();
  const [quarter, setQuarter] = useState(0); //選擇賽制
  const [eachTime, setEachTime] = useState();
  //time
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [stopTime, setStopTime] = useState();
  const [finishSetting, setFinishSetting] = useState(false);
  const [quarterNow, setQuarterNow] = useState(1);
  const five = [1, 2, 3, 4, 5];

  const [leftSide, setLeftSide] = useState(true);
  const [activePlayer, setActivePlayer] = useState();
  const [activePlayerId, setActivePlayerId] = useState();
  const [playerLocation, setPlayerLocation] = useState();
  const [playerLocationScoreNumber, setPlayerLocationScoreNumber] = useState();
  const [playerAxis, setPlayerAxis] = useState();

  const [liveAction, setLiveAction] = useState([]);

  //playactions
  const playerActionInitialState = {
    action: "",
    type: "none",
    actionWord: "",
    actionNumber: 0,
  };
  const reducerPlayActions = (state, action) => {
    switch (action.type) {
      case "initial":
        return { action: "", type: "none", actionWord: "", actionNumber: 0 };
      case "score2":
        return {
          action: "pts",
          type: "2pt",
          actionWord: "出手得分",
          actionNumber: 2,
        };
      case "score3":
        return {
          action: "pts",
          type: "3pt",
          actionWord: "出手得分",
          actionNumber: 3,
        };
      case "ft":
        return {
          action: "pts",
          type: "ft",
          actionWord: "罰球得分",
          actionNumber: 1,
        };
      case "miss3pts":
        return {
          action: "pts",
          type: "3pt",
          actionWord: "投籃未進",
          actionNumber: 0,
        };
      case "miss2pts":
        return {
          action: "pts",
          type: "2pt",
          actionWord: "投籃未進",
          actionNumber: 0,
        };
      case "missFt":
        return {
          action: "pts",
          type: "ft",
          actionWord: "罰球未進",
          actionNumber: 0,
        };
      case "defReb":
        return {
          action: "reb",
          type: "def",
          actionWord: "防守籃板",
          actionNumber: 1,
        };
      case "offReb":
        return {
          action: "reb",
          type: "off",
          actionWord: "進攻籃板",
          actionNumber: 1,
        };
      case "assist":
        return {
          action: "ast",
          type: "none",
          actionWord: "助攻",
          actionNumber: 1,
        };
      case "steal":
        return {
          action: "stl",
          type: "none",
          actionWord: "抄截",
          actionNumber: 1,
        };
      case "block":
        return {
          action: "blk",
          type: "none",
          actionWord: "火鍋",
          actionNumber: 1,
        };
      case "turnover":
        return {
          action: "to",
          type: "none",
          actionWord: "失誤",
          actionNumber: 1,
        };
      case "personalFoul":
        return {
          action: "pf",
          type: "none",
          actionWord: "犯規",
          actionNumber: 1,
        };
    }
  };
  const [playerActions, dispatchPlayerActions] = useReducer(
    reducerPlayActions,
    playerActionInitialState
  );

  useEffect(() => {
    const player = function (e) {
      if (e.keyCode === 192) {
        setLeftSide((prevState) => !prevState);
      }
      let activeTeam;
      if (leftSide) {
        console.log("active");
        activeTeam = aTeamPlayers;
      } else {
        activeTeam = bTeamPlayers;
      }

      if (e.keyCode === 49) {
        setActivePlayer(0);
        console.log("at", activeTeam);
        setActivePlayerId(activeTeam[0].id);
      }
      if (e.keyCode === 50) {
        setActivePlayer(1);
        setActivePlayerId(activeTeam[1].id);
      }
      if (e.keyCode === 51) {
        setActivePlayer(2);
        setActivePlayerId(activeTeam[2].id);
      }
      if (e.keyCode === 52) {
        setActivePlayer(3);
        setActivePlayerId(activeTeam[3].id);
      }
      if (e.keyCode === 53) {
        setActivePlayer(4);
        setActivePlayerId(activeTeam[4].id);
      }
    };

    if (activePlayer !== undefined) {
      if (leftSide) {
        setActivePlayerId(aTeamPlayers[activePlayer].id);
      } else {
        setActivePlayerId(bTeamPlayers[activePlayer].id);
      }
    }

    window.addEventListener("keydown", player);
    return () => {
      window.removeEventListener("keydown", player);
    };
  }, [leftSide, aTeamPlayers, bTeamPlayers]);

  //球員行為
  useEffect(() => {
    const action = function (e) {
      if (playerLocationScoreNumber === 2) {
        if (e.ctrlKey && e.key === "q") {
          console.log("222");
          dispatchPlayerActions({ type: "score2" });
        } else if (e.key === "q") {
          console.log("000");
          dispatchPlayerActions({ type: "miss2pts" });
        }
      } else if (playerLocationScoreNumber === 3) {
        if (e.ctrlKey && e.key === "q") {
          console.log("333");
          dispatchPlayerActions({ type: "score3" });
        } else if (e.key === "q") {
          console.log("000");
          dispatchPlayerActions({ type: "miss3pts" });
        }
      }
      if (e.ctrlKey && e.key === "z") {
        console.log("ft1");
        dispatchPlayerActions({ type: "ft" });
      } else if (e.key === "z") {
        console.log("ft0");
        dispatchPlayerActions({ type: "missFt" });
      }
      if (e.ctrlKey && e.key === "w") {
        console.log("offReb");
        dispatchPlayerActions({ type: "offReb" });
      } else if (e.key === "w") {
        console.log("defReb");
        dispatchPlayerActions({ type: "defReb" });
      }
      if (e.key === "a") {
        console.log("assist");
        dispatchPlayerActions({ type: "assist" });
      }
      if (e.key === "s") {
        console.log("steal");
        dispatchPlayerActions({ type: "steal" });
      }
      if (e.key === "d") {
        console.log("block");
        dispatchPlayerActions({ type: "block" });
      }
      if (e.key === "e") {
        console.log("turnover");
        dispatchPlayerActions({ type: "turnover" });
      }
      if (e.key === "f") {
        console.log("personalFoul");
        dispatchPlayerActions({ type: "personalFoul" });
      }
    };
    const submit = async function (e) {
      if (e.key === "Enter") {
        let data;
        let teamDataNow;
        if (leftSide) {
          data = aTeamPlayers;
          teamDataNow = [...aTeamData];
        } else {
          data = bTeamPlayers;
          teamDataNow = [...bTeamData];
        }

        const recordData = function (inf, num) {
          data[activePlayer][inf] += num;
          teamDataNow[quarterNow - 1][inf] += num;
          teamDataNow[quarter.length][inf] += num;
        };
        const recordPercent = function (rate, num, dem) {
          data[activePlayer][rate] =
            data[activePlayer][num] / data[activePlayer][dem];
          teamDataNow[quarterNow - 1][rate] =
            teamDataNow[quarterNow - 1][num] / teamDataNow[quarterNow - 1][dem];
          teamDataNow[quarter.length][rate] =
            teamDataNow[quarter.length][num] / teamDataNow[quarter.length][dem];
          console.log("rrr", teamDataNow[quarter.length][rate]);
        };

        if (playerActions.action === "pts") {
          if (playerActions.type === "ft") {
            if (playerActions.actionNumber === 1) {
              recordData("ftm", 1);
            }
            recordData("fta", 1);
            recordPercent("ftRate", "ftm", "fta");
          } else {
            if (playerActions.type === "3pt") {
              if (playerActions.actionNumber === 3) {
                recordData("threePtm", 1);
              }
              recordData("threePta", 1);
              recordPercent("threePtRate", "threePtm", "threePta");
            }
            if (playerActions.actionNumber > 0) {
              recordData("fgm", 1);
            }
            recordData("fga", 1);
            recordPercent("fgRate", "fgm", "fga");
          }
          // data[activePlayer][playerActions.action] +=
          //   playerActions.actionNumber;

          // teamDataNow[quarterNow - 1][playerActions.action] +=
          //   playerActions.actionNumber;

          // teamDataNow[quarter.length][playerActions.action] +=
          //   playerActions.actionNumber;
          recordData("pts", playerActions.actionNumber);
        } else if (playerActions.action === "reb") {
          if (playerActions.type === "def") {
            recordData("dreb", 1);
          } else {
            recordData("oreb", 1);
          }
          recordData("reb", 1);
        } else if (playerActions.action === "ast") {
          recordData("ast", 1);
        } else if (playerActions.action === "stl") {
          recordData("stl", 1);
        } else if (playerActions.action === "blk") {
          recordData("blk", 1);
        } else if (playerActions.action === "to") {
          recordData("to", 1);
        } else if (playerActions.action === "pf") {
          recordData("pf", 1);
        }

        if (leftSide) {
          setATeamPlayers([...data]);
          setATeamData([...teamDataNow]);
          await setDoc(
            doc(db, "game_data", "live_game"),
            {
              A_team_player: data,
              A_team_data: teamDataNow,
            },
            { merge: true }
          );
        } else {
          setBTeamPlayers([...data]);
          setBTeamData([...teamDataNow]);
          await setDoc(
            doc(db, "game_data", "live_game"),
            {
              B_team_player: data,
              B_team_data: teamDataNow,
            },
            { merge: true }
          );
        }

        setLiveAction((prev) => [
          ...prev,
          {
            quarterNow: quarterNow,
            team: leftSide,
            player: activePlayer,
            playerId: activePlayerId,
            location: playerLocation,
            axis: playerAxis,
            action: playerActions.action,
            actionWord: playerActions.actionWord,
            count: playerActions.actionNumber,
            minutes: timerMinutes,
            seconds: timerSeconds,
          },
        ]);
        let actionLive = [
          ...liveAction,
          {
            quarterNow: quarterNow,
            team: leftSide,
            player: activePlayer,
            playerId: activePlayerId,
            axis: playerAxis,
            location: playerLocation,
            action: playerActions.action,
            actionWord: playerActions.actionWord,
            count: playerActions.actionNumber,
            minutes: timerMinutes,
            seconds: timerSeconds,
          },
        ];

        await setDoc(
          doc(db, "game_data", "live_game"),
          {
            live_action: actionLive,
          },
          { merge: true }
        );
        //clear all action for next time

        setActivePlayer();
        setActivePlayerId();
        dispatchPlayerActions({ type: "intial" });
        setPlayerAxis();
        setPlayerLocation();
      }
    };

    window.addEventListener("keydown", action);
    window.addEventListener("keydown", submit);
    return () => {
      window.removeEventListener("keydown", action);
      window.removeEventListener("keydown", submit);
    };
  }, [
    leftSide,
    bTeamData,
    aTeamData,
    quarterNow,
    quarter,
    playerAxis,
    playerLocation,
    playerLocationScoreNumber,
    playerActions,
    liveAction,
  ]);

  async function chooseTeam() {
    const querySnapshot = await getDocs(collection(db, "team_data"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      setTeams((teams) => [...teams, doc.id]);
    });
  }

  useEffect(() => {
    chooseTeam();
  }, []);

  useEffect(() => {
    async function selectTeam() {
      const docRef = doc(db, "team_data", aTeam);
      const docSnap = await getDoc(docRef);
      let data = docSnap.data().players;
      let logo = docSnap.data().logo;
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        data[i].min = 0;
        data[i].fgm = 0;
        data[i].fga = 0;
        data[i].fgRate = 0;
        data[i].threePtm = 0;
        data[i].threePta = 0;
        data[i].threePtRate = 0;
        data[i].ftm = 0;
        data[i].fta = 0;
        data[i].ftRate = 0;
        data[i].oreb = 0;
        data[i].dreb = 0;
        data[i].reb = 0;
        data[i].ast = 0;
        data[i].stl = 0;
        data[i].blk = 0;
        data[i].to = 0;
        data[i].pf = 0;
        data[i].pts = 0;
        data[i].start = false;
        data[i].position = 6;
        newData.push(data[i]);
      }
      setATeamPlayers(newData);
      setATeamLogo(logo);

      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          A_team: aTeam,
          A_team_player: newData,
          A_team_logo: logo,
        },
        { merge: true }
      );
    }
    if (aTeam !== "default") {
      selectTeam();
    }
  }, [aTeam]);

  useEffect(() => {
    async function setTeamsData() {
      let newATeamData = [];
      let newBTeamData = [];
      for (let i = 0; i <= quarter.length; i++) {
        let a = {
          fgm: 0,
          fga: 0,
          fgRate: 0,
          threePtm: 0,
          threePta: 0,
          threePtRate: 0,
          ftm: 0,
          fta: 0,
          ftRate: 0,
          oreb: 0,
          dreb: 0,
          reb: 0,
          ast: 0,
          stl: 0,
          blk: 0,
          to: 0,
          pf: 0,
          pts: 0,
        };
        newATeamData.push({ ...a });
        newBTeamData.push({ ...a });
      }
      setATeamData([...newATeamData]);
      setBTeamData([...newBTeamData]);

      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          A_team_data: newATeamData,
          B_team_data: newBTeamData,
        },
        { merge: true }
      );
    }
    setTeamsData();
  }, [quarter]);

  useEffect(() => {
    async function selectTeam() {
      const docRef = doc(db, "team_data", bTeam);
      const docSnap = await getDoc(docRef);
      let data = docSnap.data().players;
      let logo = docSnap.data().logo;
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        data[i].min = 0;
        data[i].fgm = 0;
        data[i].fga = 0;
        data[i].fgRate = 0;
        data[i].threePtm = 0;
        data[i].threePta = 0;
        data[i].threePtRate = 0;
        data[i].ftm = 0;
        data[i].fta = 0;
        data[i].ftRate = 0;
        data[i].oreb = 0;
        data[i].dreb = 0;
        data[i].reb = 0;
        data[i].ast = 0;
        data[i].stl = 0;
        data[i].blk = 0;
        data[i].to = 0;
        data[i].pf = 0;
        data[i].pts = 0;
        data[i].start = false;
        data[i].position = 6;
        newData.push(data[i]);
      }
      setBTeamPlayers(newData);
      setBTeamLogo(logo);
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          B_team: bTeam,
          B_team_player: newData,
          B_team_logo: logo,
        },
        { merge: true }
      );
    }
    if (bTeam !== "default") {
      selectTeam();
    }
  }, [bTeam]);

  const finishGameSetting = function () {
    if ((aTeam === "default") | (bTeam === "default")) {
      alert("請選擇球隊");
      return;
    }

    for (let i = 0; i < 5; i++) {
      if (
        (aTeamPlayers[i].position - 1 !== i) |
        (bTeamPlayers[i].position - 1 !== i)
      ) {
        alert("請選擇先發球員");
        return;
      }
    }
    if (quarter === 0) {
      alert("請選擇賽制");
      return;
    }
    if (eachTime === undefined) {
      alert("請選擇單節時間");
      return;
    }
    if (stopTime === undefined) {
      alert("停錶模式");
      return;
    }

    async function systemSetting() {
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          quarter: quarter,
          quarterNow: quarterNow,
          quarter_minutes: Number(eachTime),
          stop_ime: stopTime,
          finishSetting: true,
        },
        { merge: true }
      );
    }
    systemSetting();
    setFinishSetting(true);
  };

  const selectStartFive = async function (player, position) {
    let players = [];
    let side = -1;
    let a_length = 0;
    let b_length = 0;
    let length;
    if (aTeamPlayers) {
      a_length = aTeamPlayers.length;
    }
    if (bTeamPlayers) {
      b_length = bTeamPlayers.length;
    }
    if (a_length < b_length) {
      length = b_length;
    } else {
      length = a_length;
    }
    for (let i = 0; i < length; i++) {
      if (aTeamPlayers) {
        if (aTeamPlayers[i].name === player) {
          side = 1;
        }
      }
    }
    if (side > 0) {
      players = [...aTeamPlayers];
    } else {
      players = [...bTeamPlayers];
    }

    for (let i = 0; i < players.length; i++) {
      if (players[i].position === position) {
        players[i].position = 6;
        players[i].start = false;
      }
      if (players[i].name === player) {
        players[i].position = position;
        players[i].start = true;
      }
    }
    players.sort(function (a, b) {
      return a.position - b.position;
    });

    if (side > 0) {
      setATeamPlayers(players);
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          A_team_player: players,
        },
        { merge: true }
      );
    } else {
      setBTeamPlayers(players);
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          B_team_player: players,
        },
        { merge: true }
      );
    }
  };

  return (
    <>
      <Div_Record>
        <DivBeforeGame_Record $setGame={finishSetting}>
          <div>
            A隊
            <select value={aTeam} onChange={(e) => setATeam(e.target.value)}>
              <option disabled value="default">
                Select team
              </option>
              {teams.map((team, index) =>
                team === bTeam ? (
                  <option disabled key={index}>
                    {team}
                  </option>
                ) : (
                  <option key={index}>{team}</option>
                )
              )}
            </select>
            {aTeam && (
              <div>
                {five.map((num, index) => (
                  <select
                    key={index}
                    defaultValue={"default"}
                    onChange={(e) => selectStartFive(e.target.value, num)}
                  >
                    <option disabled value="default">
                      Select Player
                    </option>
                    {aTeamPlayers?.map((player) =>
                      player.position === 6 ? (
                        <option key={player.name}>{player.name}</option>
                      ) : (
                        <option disabled key={player.name}>
                          {player.name}
                        </option>
                      )
                    )}
                  </select>
                ))}
              </div>
            )}
          </div>
          <div>
            B隊
            <select value={bTeam} onChange={(e) => setBTeam(e.target.value)}>
              <option disabled value="default">
                Select team
              </option>
              {teams.map((team, index) =>
                team === aTeam ? (
                  <option disabled key={index}>
                    {team}
                  </option>
                ) : (
                  <option key={index}>{team}</option>
                )
              )}
            </select>
            {bTeam && (
              <div>
                {five.map((num) => (
                  <select
                    defaultValue={"default"}
                    onChange={(e) => selectStartFive(e.target.value, num)}
                  >
                    <option disabled value="default">
                      Select Player
                    </option>
                    {bTeamPlayers?.map((player) =>
                      player.position === 6 ? (
                        <option key={player.name}>{player.name}</option>
                      ) : (
                        <option disabled key={player.name}>
                          {player.name}
                        </option>
                      )
                    )}
                  </select>
                ))}
              </div>
            )}
          </div>
          賽制
          <select
            onChange={(e) => {
              let quarters = [];
              for (let i = 1; i <= e.target.value; i++) {
                if (i === 1) {
                  quarters.push("1st");
                } else if (i === 2) {
                  quarters.push("2nd");
                } else if (i === 3) {
                  quarters.push("3rd");
                } else if (i === 4) {
                  quarters.push("4th");
                }
              }
              setQuarter([...quarters]);
            }}
          >
            <option>Select</option>
            <option value={4}>4 quarter</option>
            <option value={2}>2 half</option>
          </select>
          <select
            onChange={(e) => {
              setEachTime(e.target.value);
              setTimerMinutes(e.target.value);
            }}
          >
            <option>Select</option>
            <option value={10}>10 mins</option>
            <option value={12}>12 mins</option>
          </select>
          <select onChange={(e) => setStopTime(e.target.value)}>
            <option>Select</option>
            <option value={0}>停錶</option>
            <option value={1}>各節最後三分鐘停錶</option>
            <option value={2}>不停錶</option>
          </select>
          <button
            onClick={() => {
              finishGameSetting();
            }}
          >
            送出
          </button>
        </DivBeforeGame_Record>
        <DivGameStart_Record $set={finishSetting}>
          <div>
            <div>
              <div>
                <Clock
                  finishSetting={finishSetting}
                  eachTime={eachTime}
                  quarter={quarter}
                  quarteNow={quarterNow}
                  setQuarterNow={setQuarterNow}
                  timerMinutes={timerMinutes}
                  setTimerMinutes={setTimerMinutes}
                  timerSeconds={timerSeconds}
                  setTimerSeconds={setTimerSeconds}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                backgroundSize: "cover",
                height: "130px",
                width: "130px",
                backgroundImage: `url(${aTeamLogo})`,
              }}
            ></div>
            <table>
              <thead>
                <tr>
                  <th>隊伍</th>
                  {quarter
                    ? quarter.map((item, index) => <th key={index}>{item}</th>)
                    : null}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{aTeam}</td>
                  {quarter
                    ? quarter.map((item, index) => (
                        <td key={index}>
                          {aTeamData[0] ? aTeamData[index].pts : 0}
                        </td>
                      ))
                    : null}
                  <td>
                    {quarter
                      ? aTeamData[0]
                        ? aTeamData[quarter.length].pts
                        : 0
                      : null}
                  </td>
                </tr>
                <tr>
                  <td>{bTeam}</td>
                  {quarter
                    ? quarter.map((item, index) => (
                        <td key={index}>
                          {bTeamData[0] ? bTeamData[index].pts : 0}
                        </td>
                      ))
                    : null}
                  <td>
                    {quarter
                      ? bTeamData[0]
                        ? bTeamData[quarter.length].pts
                        : 0
                      : null}
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                backgroundSize: "cover",
                height: "130px",
                width: "130px",
                backgroundImage: `url(${bTeamLogo})`,
              }}
            ></div>
          </div>
          <div>OnTheGround</div>

          <div id="groundContainer">
            <TeamBox
              teamPlayers={aTeamPlayers}
              setTeamPlayers={setATeamPlayers}
            ></TeamBox>
            <Court3
              setPlayerLocation={setPlayerLocation}
              setPlayerAxis={setPlayerAxis}
              setPlayerLocationScoreNumber={setPlayerLocationScoreNumber}
              playerAxis={playerAxis}
            />
            <TeamBox
              teamPlayers={bTeamPlayers}
              setTeamPlayers={setBTeamPlayers}
            ></TeamBox>
          </div>

          <div>
            {aTeamPlayers
              ? playerActions
                ? aTeamPlayers[0][playerActions.action]
                : ""
              : ""}
            <br />
            {bTeamPlayers
              ? playerActions
                ? bTeamPlayers[0][playerActions.action]
                : ""
              : ""}
          </div>
          <div>{playerActions ? playerActions.actionWord : ""}</div>
          <div>
            <span>{leftSide ? aTeam : bTeam}</span>
            <span> , </span>
            <span>
              {leftSide
                ? activePlayer !== undefined
                  ? aTeamPlayers
                    ? aTeamPlayers[activePlayer].name
                    : ""
                  : ""
                : activePlayer !== undefined
                ? bTeamPlayers
                  ? bTeamPlayers[activePlayer].name
                  : ""
                : ""}
            </span>
            <span> {activePlayer !== undefined ? " , " : ""} </span>
            <span> {playerLocation} </span>
            <span> {playerLocation !== undefined ? " , " : ""} </span>
            <span> {playerActions && playerActions.actionWord} </span>
            <span>
              {" "}
              {playerActions && playerActions.actionWord !== undefined
                ? " , "
                : ""}{" "}
            </span>
            <span>
              {" "}
              {playerActions && playerActions.actionWord
                ? playerActions.actionNumber
                : ""}{" "}
            </span>
          </div>

          <div>
            <RecordRoom
              quarter={quarter}
              quarteNow={quarterNow}
              liveAction={liveAction}
              aTeam={aTeam}
              bTeam={bTeam}
              aTeamPlayers={aTeamPlayers}
              bTeamPlayers={bTeamPlayers}
              timerSeconds={timerSeconds}
              timerMinutes={timerMinutes}
            />
          </div>
          {/* <LiveRoom></LiveRoom> */}
        </DivGameStart_Record>
      </Div_Record>
    </>
  );
}

function TeamBox(props) {
  function handleOnDragEnd(result) {
    console.log("gdfgdg", result);
    if (!result.destination) return;
    const items = Array.from([...props.teamPlayers]);
    const itemsLength = items.length;
    const [reorderedItemSource] = items.splice(result.source.index, 1);
    let reorderedItemDestination;
    if (result.destination.index === itemsLength - 1) {
      let reorderedItemDestinations = [
        ...items.splice(result.destination.index - 1, 1),
      ];
      reorderedItemDestination = reorderedItemDestinations[0];
    } else {
      let reorderedItemDestinations = [
        ...items.splice(result.destination.index, 1),
      ];
      reorderedItemDestination = reorderedItemDestinations[0];
    }
    items.splice(result.destination.index, 0, reorderedItemSource);
    items.splice(result.source.index, 0, reorderedItemDestination);
    props.setTeamPlayers(items);
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="team">
        {(provided) => (
          <div
            id="teambox"
            // style={{ display: "flex" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.teamPlayers &&
              props.teamPlayers.map((player, index) => (
                <Draggable
                  key={player.name}
                  draggableId={player.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      // key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        style={{
                          backgroundSize: "cover",
                          height: "100px",
                          width: "130px",
                          backgroundImage: `url(${player.pic})`,
                        }}
                      ></div>
                      {player.name}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Nav;
