import PropTypes from "prop-types";
import { useEffect, useReducer, useState, useRef } from "react";
import { getDoc, doc, db, setDoc, deleteDoc } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Clock from "./Clock";
import TeamBox from "./TeamBox";
import Court from "./Court";
import RecordRoom from "./RecordRoom";

const DivGameStartLogo = styled.div`
  pointer-events: none;
  width: 10vw;
  @media (max-width: 1024px) {
    width: 0vw;
  }
  height: 100%;
  background-size: cover;
  transition-duration: 0.5s;
  background-image: ${(props) => props.backgroundImage};
  background-position: ${(props) => props.backgroundPosition};
  opacity: ${(props) => props.opacity};
`;

const DivGameStartRecord = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #e9ecef;
`;

const DivGameStart_Container = styled.div`
  width: 80vw;
  @media (max-width: 1024px) {
    width: 100vw;
  }
  background-color: #f8f9fa;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow-y: scroll;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
`;

const ScoreTableContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  right: 10px;
  bottom: 70px;
  z-index: 10;
`;

const ScoreTable = styled.table`
  color: #f8f9fa;
  background-color: #343a40;
  text-align: center;
  border-radius: 0.25rem;
  border-style: none;
  border-collapse: separate;
`;

const GameRegulationContainer = styled.div`
  display: flex;
  box-shadow: 0px 0px 1px 3px rgba(108, 117, 125, 0.4);
  flex-wrap: nowrap;
  background-color: transparent;
  justify-content: space-around;
  width: 740px;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const GameActionButtonContainer = styled.div`
  height: 50px;
  width: 280px;
  background-color: #343a40;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0 5px 5px 0;
`;

const GameActionButton = styled.button`
  height: 30px;
  padding: 1px 4px;
  font-size: 16px;
  border: 1px solid white;
  background-color: #343a40;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
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

const ButtonSubmit = styled.button`
  width: 60px;
  height: 40px;
  font-size: 20px;
  margin: 0 10px;
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

const GroundContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
`;

const LiveActionBolck = styled.div`
  box-shadow: 0px 0px 1px 3px rgba(108, 117, 125, 0.3);
  margin-bottom: 5px;
  height: 50px;
  font-size: 20px;
  display: flex;
  border-radius: 5px;
  padding: 7px 10px;
  width: 740px;
  div {
    overflow-x: hidden;
    color: ${(props) => (props.ok ? "white" : "#6c757d")};
    height: 36px;
    padding: 1px 10px;
    margin-right: 3px;
    box-shadow: 0px 0px 1px 1px rgba(108, 117, 125, 0.4);
    border-radius: 5px;
    background-color: ${(props) => (props.ok ? "#343a40" : "#adb5bd")};
    animation-name: popup;
    animation-duration: 0.3s;

    @keyframes popup {
      0% {
        transform: translateY(20px);
        background-color: #343a40;
        color: white;
      }
      90% {
        transform: translateY(-10px);
        background-color: #6c757d;
        color: white;
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

const PopupBlur = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 6;
  background-color: rgba(0, 0, 0);
  opacity: 0.5;
`;

const PopupDiv = styled.div`
  height: 120px;
  font-size: 28px;
  top: 38vh;
  border-radius: 5px;
  background-color: rgba(206, 212, 218, 1);
  color: #343a40;
  position: fixed;
  box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.2);
  left: 40vw;
  width: 20vw;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  &:hover {
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.3);
  }
`;

function AppGameStart(props) {
  const whoWin = useRef();
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [affectTimeStopBehavior, setAffectTimeStopBehavior] = useState(true);
  const [affectShotClockBehavior, setAffectShotClockBehavior] = useState(true);
  const [exchangePlayer, setExchangePlayer] = useState(false);

  const [leftSide, setLeftSide] = useState(true);
  const [activePlayer, setActivePlayer] = useState();
  const [activePlayerId, setActivePlayerId] = useState();
  const [activePlayerPic, setActivePlayerPic] = useState();
  const [playerLocation, setPlayerLocation] = useState();
  const [playerLocationScoreNumber, setPlayerLocationScoreNumber] = useState();
  const [playerAxis, setPlayerAxis] = useState();

  const [openGradeButton, setOpenGradeButton] = useState(false);
  const [wantToCloseGame, setWantToCloseGame] = useState();

  let redirect = useNavigate();

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
        setActivePlayer();
        setActivePlayerId();
        setActivePlayerPic();
        dispatchPlayerActions({ type: "intial" });
        setPlayerAxis();
        setPlayerLocation();
      }
      let activeTeam;
      if (leftSide) {
        activeTeam = props.aTeamPlayers;
      } else {
        activeTeam = props.bTeamPlayers;
      }

      const playerChoose = (playerPosition) => {
        setActivePlayer();
        clearActionByChangePlayer();
        setActivePlayer(playerPosition);
        setActivePlayerId(activeTeam[playerPosition].id);
        setActivePlayerPic(activeTeam[playerPosition].pic);
      };

      const clearActionByChangePlayer = function () {
        setActivePlayerId();
        setActivePlayerPic();
        dispatchPlayerActions({ type: "intial" });
        setPlayerAxis();
        setPlayerLocation();
      };

      if (e.keyCode === 49) {
        playerChoose(0);
      }
      if (e.keyCode === 50) {
        playerChoose(1);
      }
      if (e.keyCode === 51) {
        playerChoose(2);
      }
      if (e.keyCode === 52) {
        playerChoose(3);
      }
      if (e.keyCode === 53) {
        playerChoose(4);
      }
    };

    if (activePlayer !== undefined) {
      if (leftSide) {
        setActivePlayerId(props.aTeamPlayers[activePlayer].id);
      } else {
        setActivePlayerId(props.bTeamPlayers[activePlayer].id);
      }
    }

    window.addEventListener("keydown", player);
    return () => {
      window.removeEventListener("keydown", player);
    };
  }, [leftSide, props.aTeamPlayers, props.bTeamPlayers]);

  useEffect(() => {
    const action = function (e) {
      if (playerLocationScoreNumber === 2) {
        if (e.ctrlKey && e.key === "q") {
          dispatchPlayerActions({ type: "score2" });
        } else if (e.key === "q") {
          dispatchPlayerActions({ type: "miss2pts" });
        }
      } else if (playerLocationScoreNumber === 3) {
        if (e.ctrlKey && e.key === "q") {
          dispatchPlayerActions({ type: "score3" });
        } else if (e.key === "q") {
          dispatchPlayerActions({ type: "miss3pts" });
        }
      }
      if (e.ctrlKey && e.key === "z") {
        dispatchPlayerActions({ type: "ft" });
      } else if (e.key === "z") {
        dispatchPlayerActions({ type: "missFt" });
      }
      if (e.ctrlKey && e.key === "w") {
        dispatchPlayerActions({ type: "offReb" });
      } else if (e.key === "w") {
        dispatchPlayerActions({ type: "defReb" });
      }
      if (e.key === "a") {
        dispatchPlayerActions({ type: "assist" });
      }
      if (e.key === "s") {
        dispatchPlayerActions({ type: "steal" });
      }
      if (e.key === "d") {
        dispatchPlayerActions({ type: "block" });
      }
      if (e.key === "e") {
        dispatchPlayerActions({ type: "turnover" });
      }
      if (e.key === "f") {
        dispatchPlayerActions({ type: "personalFoul" });
      }
    };
    const submit = async function (e) {
      if (e.key === "Enter") {
        if (
          (activePlayer === undefined) |
          (playerLocation === undefined) |
          (playerActions === undefined)
        ) {
          return;
        }
        let data;
        let teamDataNow;
        if (leftSide) {
          data = props.aTeamPlayers;
          teamDataNow = [...props.aTeamData];
        } else {
          data = props.bTeamPlayers;
          teamDataNow = [...props.bTeamData];
        }

        const recordData = function (inf, num) {
          data[activePlayer][inf] += num;
          teamDataNow[props.quarterNow - 1][inf] += num;
          teamDataNow[props.quarter.length][inf] += num;
        };
        const recordPercent = function (rate, num, dem) {
          data[activePlayer][rate] =
            data[activePlayer][num] / data[activePlayer][dem];
          teamDataNow[props.quarterNow - 1][rate] =
            teamDataNow[props.quarterNow - 1][num] /
            teamDataNow[props.quarterNow - 1][dem];
          teamDataNow[props.quarter.length][rate] =
            teamDataNow[props.quarter.length][num] /
            teamDataNow[props.quarter.length][dem];
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
                setAffectShotClockBehavior((prev) => !prev);
                setAffectTimeStopBehavior((prev) => !prev);
                recordData("threePtm", 1);
              }
              recordData("threePta", 1);
              recordPercent("threePtRate", "threePtm", "threePta");
            }
            if (playerActions.actionNumber > 0) {
              setAffectShotClockBehavior((prev) => !prev);
              setAffectTimeStopBehavior((prev) => !prev);
              recordData("fgm", 1);
            }
            recordData("fga", 1);
            recordPercent("fgRate", "fgm", "fga");
          }

          recordData("pts", playerActions.actionNumber);
        } else if (playerActions.action === "reb") {
          if (playerActions.type === "def") {
            setAffectShotClockBehavior((prev) => !prev);
            recordData("dreb", 1);
          } else {
            recordData("oreb", 1);
          }
          recordData("reb", 1);
        } else if (playerActions.action === "ast") {
          recordData("ast", 1);
        } else if (playerActions.action === "stl") {
          setAffectShotClockBehavior((prev) => !prev);
          recordData("stl", 1);
        } else if (playerActions.action === "blk") {
          recordData("blk", 1);
        } else if (playerActions.action === "to") {
          recordData("to", 1);
        } else if (playerActions.action === "pf") {
          setAffectTimeStopBehavior((prev) => !prev);
          recordData("pf", 1);
        }

        if (leftSide) {
          props.setATeamPlayers([...data]);
          props.setATeamData([...teamDataNow]);
          setDoc(
            doc(db, "live_game", props.liveGameName.current),
            {
              A_team_player: data,
              A_team_data: teamDataNow,
            },
            { merge: true }
          );
          if (playerActions.action === "pts") {
            setDoc(
              doc(db, "game_schedule", props.liveGameName.current),
              {
                aTeam_score: teamDataNow[props.quarter.length]["pts"],
              },
              { merge: true }
            );
          }
        } else {
          props.setBTeamPlayers([...data]);
          props.setBTeamData([...teamDataNow]);
          setDoc(
            doc(db, "live_game", props.liveGameName.current),
            {
              B_team_player: data,
              B_team_data: teamDataNow,
            },
            { merge: true }
          );
          if (playerActions.action === "pts") {
            setDoc(
              doc(db, "game_schedule", props.liveGameName.current),
              {
                bTeam_score: teamDataNow[props.quarter.length]["pts"],
              },
              { merge: true }
            );
          }
        }

        props.setLiveAction((prev) => [
          ...prev,
          {
            quarterNow: props.quarterNow,
            team: leftSide,
            player: activePlayer,
            playerId: activePlayerId,
            playerPic: activePlayerPic,
            location: playerLocation,
            axis: playerAxis,
            action: playerActions.action,
            actionWord: playerActions.actionWord,
            count: playerActions.actionNumber,
            minutes: props.timerMinutes,
            seconds: timerSeconds,
          },
        ]);
        let actionLive = [
          ...props.liveAction,
          {
            quarterNow: props.quarterNow,
            team: leftSide,
            player: activePlayer,
            playerId: activePlayerId,
            playerPic: activePlayerPic,
            axis: playerAxis,
            location: playerLocation,
            action: playerActions.action,
            actionWord: playerActions.actionWord,
            count: playerActions.actionNumber,
            minutes: props.timerMinutes,
            seconds: timerSeconds,
          },
        ];

        setDoc(
          doc(db, "live_game", props.liveGameName.current),
          {
            live_action: actionLive,
          },
          { merge: true }
        );
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
    props.bTeamData,
    props.aTeamData,
    props.quarterNow,
    props.quarter,
    playerAxis,
    playerLocation,
    playerLocationScoreNumber,
    playerActions,
    props.liveAction,
  ]);

  const endGame = async function () {
    let aTeamGrade;
    let bTeamGrade;
    if (
      props.aTeamData[props.quarter.length]["pts"] >
      props.bTeamData[props.quarter.length]["pts"]
    ) {
      aTeamGrade = [...props.aTeamWinLoss];
      aTeamGrade[0] = aTeamGrade[0] + 1;
      bTeamGrade = [...props.bTeamWinLoss];
      bTeamGrade[1] = bTeamGrade[1] + 1;
      props.setATeamWinLoss(aTeamGrade);
      props.setBTeamWinLoss(bTeamGrade);
      whoWin.current = props.aTeam;
    } else {
      aTeamGrade = [...props.aTeamWinLoss];
      aTeamGrade[1] = aTeamGrade[1] + 1;
      bTeamGrade = [...props.bTeamWinLoss];
      bTeamGrade[0] = bTeamGrade[0] + 1;
      props.setATeamWinLoss(aTeamGrade);
      props.setBTeamWinLoss(bTeamGrade);
      whoWin.current = props.bTeam;
    }

    const calculatePlayerGrade = function (
      team,
      players,
      playersPastData,
      teamWinLoss
    ) {
      let newGameData = [...players];
      let pastGameData = [...playersPastData];
      const pastGameNum = teamWinLoss[0] + teamWinLoss[1];
      function round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return (Math.round(m) / 100) * Math.sign(num);
      }
      for (let j = 0; j < newGameData.length; j++) {
        for (let i = 0; i < pastGameData.length; i++) {
          if (newGameData[j].id === pastGameData[i].id) {
            pastGameData[i].min = round(
              (pastGameData[i].min * pastGameNum + newGameData[j].min) /
                (pastGameNum + 1)
            );
            pastGameData[i].fgm = round(
              (pastGameData[i].fgm * pastGameNum + newGameData[j].fgm) /
                (pastGameNum + 1)
            );
            pastGameData[i].fga = round(
              (pastGameData[i].fga * pastGameNum + newGameData[j].fga) /
                (pastGameNum + 1)
            );
            if (pastGameData[i].fga > 0) {
              pastGameData[i].fgRate = round(
                (pastGameData[i].fgm / pastGameData[i].fga) * 100
              );
            } else {
              pastGameData[i].fgRate = 0;
            }

            pastGameData[i].threePtm = round(
              (pastGameData[i].threePtm * pastGameNum +
                newGameData[j].threePtm) /
                (pastGameNum + 1)
            );
            pastGameData[i].threePta = round(
              (pastGameData[i].threePta * pastGameNum +
                newGameData[j].threePta) /
                (pastGameNum + 1)
            );
            if (pastGameData[i].threePta > 0) {
              pastGameData[i].threePtRate = round(
                (pastGameData[i].threePtm / pastGameData[i].threePta) * 100
              );
            } else {
              pastGameData[i].threePtRate = 0;
            }
            pastGameData[i].ftm = round(
              (pastGameData[i].ftm * pastGameNum + newGameData[j].ftm) /
                (pastGameNum + 1)
            );
            pastGameData[i].fta = round(
              (pastGameData[i].fta * pastGameNum + newGameData[j].fta) /
                (pastGameNum + 1)
            );
            if (pastGameData[i].fta > 0) {
              pastGameData[i].ftRate = round(
                (pastGameData[i].ftm / pastGameData[i].fta) * 100
              );
            } else {
              pastGameData[i].ftRate = 0;
            }

            pastGameData[i].oreb = round(
              (pastGameData[i].oreb * pastGameNum + newGameData[j].oreb) /
                (pastGameNum + 1)
            );
            pastGameData[i].dreb = round(
              (pastGameData[i].dreb * pastGameNum + newGameData[j].dreb) /
                (pastGameNum + 1)
            );
            pastGameData[i].reb = round(
              (pastGameData[i].reb * pastGameNum + newGameData[j].reb) /
                (pastGameNum + 1)
            );
            pastGameData[i].ast = round(
              (pastGameData[i].ast * pastGameNum + newGameData[j].ast) /
                (pastGameNum + 1)
            );
            pastGameData[i].stl = round(
              (pastGameData[i].stl * pastGameNum + newGameData[j].stl) /
                (pastGameNum + 1)
            );
            pastGameData[i].blk = round(
              (pastGameData[i].blk * pastGameNum + newGameData[j].blk) /
                (pastGameNum + 1)
            );
            pastGameData[i].to = round(
              (pastGameData[i].to * pastGameNum + newGameData[j].to) /
                (pastGameNum + 1)
            );
            pastGameData[i].pf = round(
              (pastGameData[i].pf * pastGameNum + newGameData[j].pf) /
                (pastGameNum + 1)
            );
            pastGameData[i].pts = round(
              (pastGameData[i].pts * pastGameNum + newGameData[j].pts) /
                (pastGameNum + 1)
            );
          }
        }
      }
      setDoc(
        doc(db, "team_data", team),
        {
          players: pastGameData,
        },
        { merge: true }
      );
    };

    calculatePlayerGrade(
      props.aTeam,
      props.aTeamPlayers,
      props.aTeamPlayersPastData,
      props.aTeamWinLoss
    );
    calculatePlayerGrade(
      props.bTeam,
      props.bTeamPlayers,
      props.bTeamPlayersPastData,
      props.bTeamWinLoss
    );

    await setDoc(
      doc(db, "live_game", props.liveGameName.current),
      {
        endGame: true,
      },
      { merge: true }
    );
    await setDoc(
      doc(db, "game_schedule", props.liveGameName.current),
      {
        gameStatus: "past",
        whoWin: whoWin.current,
      },
      { merge: true }
    );

    const docSnap = await getDoc(
      doc(db, "live_game", props.liveGameName.current)
    );
    let data = docSnap.data();

    await setDoc(
      doc(db, "past_data", props.liveGameName.current),
      {
        ...data,
      },
      { merge: true }
    );

    await setDoc(
      doc(db, "team_data", props.aTeam),
      {
        winLoss: aTeamGrade,
      },
      { merge: true }
    );
    await setDoc(
      doc(db, "team_data", props.bTeam),
      {
        winLoss: bTeamGrade,
      },
      { merge: true }
    );
    await setDoc(
      doc(
        db,
        "team_data",
        props.aTeam,
        "past_data",
        props.liveGameName.current
      ),
      {
        player_data: props.aTeamPlayers,
      },
      { merge: true }
    );

    await setDoc(
      doc(
        db,
        "team_data",
        props.bTeam,
        "past_data",
        props.liveGameName.current
      ),
      {
        player_data: props.bTeamPlayers,
      },
      { merge: true }
    );

    const deleteLiveGame = async function () {
      await deleteDoc(doc(db, "live_game", props.liveGameName.current));
    };
    deleteLiveGame();
    setTimeout(redirect("/"), 1000);
    props.setIsGameStart(false);
  };

  return (
    <DivGameStartRecord>
      {wantToCloseGame ? (
        <PopupEndGameBlock
          endGame={endGame}
          setWantToCloseGame={setWantToCloseGame}
        />
      ) : null}
      <DivGameStartLogo
        backgroundImage={`url(${props.aTeamLogo})`}
        backgroundPosition="-200%"
        opacity={leftSide ? "0.7" : "0.3"}
      />
      <DivGameStart_Container>
        {openGradeButton && (
          <ScoreTableContainer>
            <ScoreTable
              cellPadding="10"
              border="2"
              style={{ fontSize: "20px" }}
            >
              <thead>
                <tr>
                  <th>隊伍</th>
                  {props.quarter
                    ? props.quarter.map((item, index) => (
                        <th style={{ width: "60px" }} key={index}>
                          {item}
                        </th>
                      ))
                    : null}
                  <th style={{ width: "60px" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.aTeam}</td>
                  {props.quarter
                    ? props.quarter.map((item, index) => (
                        <td key={index}>
                          {props.aTeamData[0] ? props.aTeamData[index].pts : 0}
                        </td>
                      ))
                    : null}
                  <td>
                    {props.quarter
                      ? props.aTeamData[0]
                        ? props.aTeamData[props.quarter.length].pts
                        : 0
                      : null}
                  </td>
                </tr>
                <tr>
                  <td>{props.bTeam}</td>
                  {props.quarter
                    ? props.quarter.map((item, index) => (
                        <td key={index}>
                          {props.bTeamData[0] ? props.bTeamData[index].pts : 0}
                        </td>
                      ))
                    : null}
                  <td>
                    {props.quarter
                      ? props.bTeamData[0]
                        ? props.bTeamData[props.quarter.length].pts
                        : 0
                      : null}
                  </td>
                </tr>
              </tbody>
            </ScoreTable>
          </ScoreTableContainer>
        )}
        <div>
          <GameRegulationContainer>
            <Clock
              restartGameShotTime={props.restartGameShotTime}
              restartGameTime={props.restartGameTime}
              liveGameName={props.liveGameName}
              finishSetting={props.finishSetting}
              eachQuarterTime={props.eachQuarterTime}
              quarter={props.quarter}
              quarterNow={props.quarterNow}
              setQuarterNow={props.setQuarterNow}
              timerMinutes={props.timerMinutes}
              setTimerMinutes={props.setTimerMinutes}
              timerSeconds={timerSeconds}
              setTimerSeconds={setTimerSeconds}
              affectTimeStopBehavior={affectTimeStopBehavior}
              affectShotClockBehavior={affectShotClockBehavior}
            />
            <GameActionButtonContainer>
              <GameActionButton
                onClick={() => {
                  setExchangePlayer((pre) => !pre);
                  setActivePlayer();
                  setActivePlayerId();
                  setActivePlayerPic();
                  dispatchPlayerActions({ type: "intial" });
                  setPlayerAxis();
                  setPlayerLocation();
                }}
              >
                請求換人
              </GameActionButton>
              <GameActionButton>請求暫停</GameActionButton>
              <GameActionButton
                onClick={() => {
                  if (
                    props.aTeamData[props.quarter.length]["pts"] ===
                    props.bTeamData[props.quarter.length]["pts"]
                  ) {
                    alert("平手尚未結束");
                  } else {
                    setWantToCloseGame(true);
                  }
                }}
              >
                結束比賽
              </GameActionButton>
            </GameActionButtonContainer>
          </GameRegulationContainer>

          <LiveActionBolck
            ok={
              activePlayer !== undefined && playerLocation && playerActions
                ? true
                : false
            }
          >
            {leftSide && <div>{props.aTeam}</div>}
            {!leftSide && <div>{props.bTeam}</div>}

            {leftSide && activePlayer !== undefined && props.aTeamPlayers && (
              <div>{props.aTeamPlayers[activePlayer].id}</div>
            )}
            {!leftSide && activePlayer !== undefined && props.bTeamPlayers && (
              <div>{props.bTeamPlayers[activePlayer].id}</div>
            )}

            {playerLocation && <div> {playerLocation} </div>}

            {playerActions && playerActions.actionWord && (
              <div>{playerActions.actionWord}</div>
            )}

            {playerActions && playerActions.actionWord && (
              <div>{playerActions.actionNumber}</div>
            )}
          </LiveActionBolck>
        </div>
        <GroundContainer>
          <TeamBox
            exchangePlayer={exchangePlayer}
            teamPlayers={props.aTeamPlayers}
            setTeamPlayers={props.setATeamPlayers}
            activePlayer={activePlayer}
            selectTeam={leftSide}
          ></TeamBox>
          <Court
            setPlayerLocation={setPlayerLocation}
            setPlayerAxis={setPlayerAxis}
            setPlayerLocationScoreNumber={setPlayerLocationScoreNumber}
            dispatchPlayerActions={dispatchPlayerActions}
            playerAxis={playerAxis}
          />
          <TeamBox
            exchangePlayer={exchangePlayer}
            teamPlayers={props.bTeamPlayers}
            setTeamPlayers={props.setBTeamPlayers}
            activePlayer={activePlayer}
            selectTeam={!leftSide}
          ></TeamBox>
        </GroundContainer>
        <RecordRoom
          quarter={props.quarter}
          quarterNow={props.quarterNow}
          liveAction={props.liveAction}
          aTeam={props.aTeam}
          bTeam={props.bTeam}
          aTeamPlayers={props.aTeamPlayers}
          bTeamPlayers={props.bTeamPlayers}
          timerSeconds={timerSeconds}
          timerMinutes={props.timerMinutes}
          pageSize={props.pageSize}
          setOpenGradeButton={setOpenGradeButton}
        />
      </DivGameStart_Container>
      <DivGameStartLogo
        backgroundImage={`url(${props.bTeamLogo})`}
        backgroundPosition="-200%"
        opacity={!leftSide ? "0.8" : "0.2"}
      />
    </DivGameStartRecord>
  );
}

const PopupEndGameBlock = function (props) {
  return (
    <>
      <PopupBlur onClick={() => props.setWantToCloseGame(false)} />
      <PopupDiv>
        確定結束比賽？
        <br />
        <div>
          <ButtonSubmit onClick={props.endGame}>Yes</ButtonSubmit>
          <ButtonSubmit onClick={() => props.setWantToCloseGame(false)}>
            No
          </ButtonSubmit>
        </div>
      </PopupDiv>
    </>
  );
};

AppGameStart.propTypes = {
  aTeam: PropTypes.string,
  aTeamData: PropTypes.array,
  setATeamData: PropTypes.func,
  setBTeamData: PropTypes.func,
  bTeamData: PropTypes.array,
  bTeam: PropTypes.string,
  aTeamPlayers: PropTypes.array,
  bTeamPlayers: PropTypes.array,
  quarter: PropTypes.array,
  quarterNow: PropTypes.number,
  setQuarterNow: PropTypes.func,
  setATeamPlayers: PropTypes.func,
  setBTeamPlayers: PropTypes.func,
  setATeamWinLoss: PropTypes.func,
  setBTeamWinLoss: PropTypes.func,
  liveGameName: PropTypes.object,
  setLiveAction: PropTypes.func,
  liveAction: PropTypes.array,
  aTeamWinLoss: PropTypes.array,
  bTeamWinLoss: PropTypes.array,
  aTeamLogo: PropTypes.string,
  bTeamLogo: PropTypes.string,
  finishGameSetting: PropTypes.func,
  setWantToCloseGame: PropTypes.func,
  endGame: PropTypes.func,
  timerMinutes: PropTypes.number,
  setTimerMinutes: PropTypes.func,
  finishSetting: PropTypes.bool,
  restartGameShotTime: PropTypes.object,
  restartGameTime: PropTypes.object,
  setIsGameStart: PropTypes.func,
  eachQuarterTime: PropTypes.object,
  pageSize: PropTypes.array,
  aTeamPlayersPastData: PropTypes.array,
  bTeamPlayersPastData: PropTypes.array,
};
PopupEndGameBlock.propTypes = {
  setWantToCloseGame: PropTypes.func,
  endGame: PropTypes.func,
};

export default AppGameStart;
