import { useEffect, useState, useReducer, useRef } from "react";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  db,
  setDoc,
  deleteDoc,
} from "../utils/firebase";
import {
  GeneralDiv,
  Div_Record,
  DivBeforeGameRecord,
  TeamBlock,
  DivGameStartLogo,
  RegulationBlock,
  TeamBlockDetail,
  TeamBlockDetailTeam,
  TeamBlockDetailPlayer,
  ButtonForChange,
  TeamBlockDetailPlayerDiv,
  SelectTeam,
  SelectPlayer,
  SelectPlayerImg,
  RegulationBlockCell,
  DivGameStartRecord,
  DivGameStart_Container,
  ButtonSubmit,
  PopupDiv,
  PopupBlur,
  GroundContainer,
  TeamOnTheGround,
  LiveActionBolck,
  GeneralImg,
} from "../utils/StyleComponent";
import Clock from "./Clock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Court from "./Court";
import RecordRoom from "./RecordRoom";
import { useNavigate } from "react-router-dom";

function App(props) {
  const [pageSize, setPageSize] = useState([]);
  const [teams, setTeams] = useState([]);
  const [aTeam, setATeam] = useState("default");
  const [aTeamStartFive, setATeamStartFive] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);
  const [aTeamLogo, setATeamLogo] = useState();
  const [aTeamWinLoss, setATeamWinLoss] = useState([]);
  const [aTeamPlayers, setATeamPlayers] = useState();
  const aTeamPlayersName = useRef();
  const [aTeamData, setATeamData] = useState();

  const [bTeam, setBTeam] = useState("default");
  const [bTeamStartFive, setBTeamStartFive] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);
  const [bTeamLogo, setBTeamLogo] = useState();
  const [bTeamWinLoss, setBTeamWinLoss] = useState([]);
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const bTeamPlayersName = useRef();
  const [bTeamData, setBTeamData] = useState();
  const whoWin = useRef();
  const [quarter, setQuarter] = useState(0); //選擇賽制
  const eachQuarterTime = useRef();
  //time
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [affectTimeStopBehavior, setAffectTimeStopBehavior] = useState(true);
  const [affectShotClockBehavior, setAffectShotClockBehavior] = useState(true);

  const [stopTime, setStopTime] = useState(0);
  const [finishSetting, setFinishSetting] = useState(false);
  const [quarterNow, setQuarterNow] = useState(1);
  const five = [1, 2, 3, 4, 5];
  const [exchangePlayer, setExchangePlayer] = useState(false);

  const [leftSide, setLeftSide] = useState(true);
  const [activePlayer, setActivePlayer] = useState();
  const [activePlayerId, setActivePlayerId] = useState();
  const [activePlayerPic, setActivePlayerPic] = useState();
  const [playerLocation, setPlayerLocation] = useState();
  const [playerLocationScoreNumber, setPlayerLocationScoreNumber] = useState();
  const [playerAxis, setPlayerAxis] = useState();

  const [liveAction, setLiveAction] = useState([]);
  const [openGradeButton, setOpenGradeButton] = useState(false);
  const [wantToCloseGame, setWantToCloseGame] = useState();

  let redirect = useNavigate();

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
        //換邊clear
        setActivePlayer();
        setActivePlayerId();
        setActivePlayerPic();
        dispatchPlayerActions({ type: "intial" });
        setPlayerAxis();
        setPlayerLocation();
      }
      let activeTeam;
      if (leftSide) {
        activeTeam = aTeamPlayers;
      } else {
        activeTeam = bTeamPlayers;
      }

      const clearActionByChangePlayer = function () {
        //換人clear
        setActivePlayerId();
        setActivePlayerPic();
        dispatchPlayerActions({ type: "intial" });
        setPlayerAxis();
        setPlayerLocation();
      };

      if (e.keyCode === 49) {
        setActivePlayer(); //for css animation effect 清空
        clearActionByChangePlayer();
        setActivePlayer(0);
        setActivePlayerId(activeTeam[0].id);
        setActivePlayerPic(activeTeam[0].pic);
      }
      if (e.keyCode === 50) {
        setActivePlayer();
        clearActionByChangePlayer();
        setActivePlayer(1);
        setActivePlayerId(activeTeam[1].id);
        setActivePlayerPic(activeTeam[1].pic);
      }
      if (e.keyCode === 51) {
        setActivePlayer();
        clearActionByChangePlayer();
        setActivePlayer(2);
        setActivePlayerId(activeTeam[2].id);
        setActivePlayerPic(activeTeam[2].pic);
      }
      if (e.keyCode === 52) {
        setActivePlayer();
        clearActionByChangePlayer();
        setActivePlayer(3);
        setActivePlayerId(activeTeam[3].id);
        setActivePlayerPic(activeTeam[3].pic);
      }
      if (e.keyCode === 53) {
        setActivePlayer();
        clearActionByChangePlayer();
        setActivePlayer(4);
        setActivePlayerId(activeTeam[4].id);
        setActivePlayerPic(activeTeam[4].pic);
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
          setATeamPlayers([...data]);
          setATeamData([...teamDataNow]);
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
                aTeam_score: teamDataNow[quarter.length]["pts"],
              },
              { merge: true }
            );
          }
        } else {
          setBTeamPlayers([...data]);
          setBTeamData([...teamDataNow]);
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
                bTeam_score: teamDataNow[quarter.length]["pts"],
              },
              { merge: true }
            );
          }
        }

        setLiveAction((prev) => [
          ...prev,
          {
            quarterNow: quarterNow,
            team: leftSide,
            player: activePlayer,
            playerId: activePlayerId,
            playerPic: activePlayerPic,
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
            playerPic: activePlayerPic,
            axis: playerAxis,
            location: playerLocation,
            action: playerActions.action,
            actionWord: playerActions.actionWord,
            count: playerActions.actionNumber,
            minutes: timerMinutes,
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

  //偵測螢幕大小
  const getPageSize = function () {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;
    console.log("w", pageWidth, "h", pageHeight);
    setPageSize([pageWidth, pageHeight]);
  };

  useEffect(() => {
    chooseTeam();
    getPageSize();
  }, []);

  useEffect(() => {
    async function selectTeam() {
      const docSnap = await getDoc(doc(db, "team_data", aTeam));
      let data = docSnap.data().players;
      let logo = docSnap.data().logo;
      let winLoss = docSnap.data().winLoss;
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
      setATeamWinLoss(winLoss);
      aTeamPlayersName.current = newData.map((player) => player.name);
      setATeamLogo(logo);
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
    }
    setTeamsData();
  }, [quarter]);

  useEffect(() => {
    async function selectTeam() {
      const docRef = doc(db, "team_data", bTeam);
      const docSnap = await getDoc(docRef);
      let data = docSnap.data().players;
      let logo = docSnap.data().logo;
      let winLoss = docSnap.data().winLoss;
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
      setBTeamWinLoss(winLoss);
      bTeamPlayersName.current = newData.map((player) => player.name);
      setBTeamLogo(logo);
    }
    if (bTeam !== "default") {
      selectTeam();
    }
  }, [bTeam]);

  const finishGameSetting = function () {
    if ((aTeam === "default") | (bTeam === "default")) {
      alert("請選擇賽程");
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
    if (eachQuarterTime.current === undefined) {
      alert("請選擇單節時間");
      return;
    }
    if (stopTime === undefined) {
      alert("停錶模式");
      return;
    }

    async function systemSetting() {
      await setDoc(
        doc(db, "live_game", props.liveGameName.current),
        {
          live_action: [],
          quarter: quarter,
          quarterNow: quarterNow,
          quarter_minutes: Number(eachQuarterTime.current),
          stop_ime: stopTime,
          finishSetting: true,
          endGame: false,
          //new
          A_team: aTeam,
          A_team_player: aTeamPlayers,
          A_team_logo: aTeamLogo,
          A_team_data: aTeamData,
          B_team_data: bTeamData,
          B_team: bTeam,
          B_team_player: bTeamPlayers,
          B_team_logo: bTeamLogo,
        },
        { merge: true }
      );
      await setDoc(
        doc(db, "game_schedule", props.liveGameName.current),
        {
          gameStatus: "live",
        },
        { merge: true }
      );
    }
    systemSetting();
    setFinishSetting(true);
    props.setIsGameStart(true);
  };

  const selectAStartFive = async function (player, position) {
    console.log("player", player);
    console.log("position", position);
    let players = [...aTeamPlayers];
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

    setATeamPlayers(players);
  };

  const selectBStartFive = async function (player, position) {
    let players = [];
    players = [...bTeamPlayers];
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

    setBTeamPlayers(players);
  };

  const endGame = async function () {
    let aTeamGrade;
    let bTeamGrade;
    if (aTeamData[quarter.length]["pts"] > bTeamData[quarter.length]["pts"]) {
      console.log("aWin");
      aTeamGrade = [...aTeamWinLoss];
      aTeamGrade[0] = aTeamGrade[0] + 1;
      bTeamGrade = [...bTeamWinLoss];
      bTeamGrade[1] = bTeamGrade[1] + 1;
      setATeamWinLoss(aTeamGrade);
      setBTeamWinLoss(bTeamGrade);
      whoWin.current = aTeam;
    } else {
      console.log("bWin");
      aTeamGrade = [...aTeamWinLoss];
      aTeamGrade[1] = aTeamGrade[1] + 1;
      bTeamGrade = [...bTeamWinLoss];
      bTeamGrade[0] = bTeamGrade[0] + 1;
      setATeamWinLoss(aTeamGrade);
      setBTeamWinLoss(bTeamGrade);
      whoWin.current = bTeam;
    }
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
    // const transitionGameData = async function () {
    const docSnap = await getDoc(
      doc(db, "live_game", props.liveGameName.current)
    );
    let data = docSnap.data();

    // const saveGameData = async function () {
    await setDoc(
      doc(db, "past_data", props.liveGameName.current),
      {
        ...data,
      },
      { merge: true }
    );

    //記錄輸贏

    await setDoc(
      doc(db, "team_data", aTeam),
      {
        winLoss: aTeamGrade,
      },
      { merge: true }
    );
    await setDoc(
      doc(db, "team_data", bTeam),
      {
        winLoss: bTeamGrade,
      },
      { merge: true }
    );
    //保存球員個人成績
    await setDoc(
      doc(db, "team_data", aTeam, "past_data", props.liveGameName.current),
      {
        player_data: aTeamPlayers,
      },
      { merge: true }
    );
    await setDoc(
      doc(db, "team_data", bTeam, "past_data", props.liveGameName.current),
      {
        player_data: bTeamPlayers,
      },
      { merge: true }
    );
    // };
    // saveGameData();
    // };
    // transitionGameData();
    const deleteLiveGame = async function () {
      await deleteDoc(doc(db, "live_game", props.liveGameName.current));
    };
    deleteLiveGame();
    setTimeout(redirect("/"), 1000);
  };

  const change = function (
    type,
    target,
    oppTarget,
    source,
    setTarget,
    setStartFive
  ) {
    let value = target;
    let listOri = [...source];
    let list = listOri.filter((item) => item !== oppTarget);
    let index = list.indexOf(value);
    if (type === "next") {
      index += 1;
      if (index >= list.length) {
        index = 0;
      }
    } else if (type === "last") {
      if (index <= 0) {
        index = list.length - 1;
      } else {
        index -= 1;
      }
    }
    setTarget(list[index]);
    setStartFive(["default", "default", "default", "default", "default"]);
  };
  const changePlayer = function (type, target, targetGroup, source, setTarget) {
    let value = targetGroup[target];
    let listOri = source.current;
    console.log("1");
    if (value === "default") {
      console.log("2");
      if (listOri === undefined) {
        alert("請選擇隊伍");
        return;
      }
      let list = listOri.filter((player) => !targetGroup.includes(player));
      let index = list.indexOf(value);
      if (type === "next") {
        index += 1;
        if (index >= list.length) {
          index = 0;
        }
      } else if (type === "last") {
        if (index <= 0) {
          index = list.length - 1;
        } else {
          index -= 1;
        }
      }
      let start = [...targetGroup];
      start[target] = list[index];
      setTarget(start);
      if (source === aTeamPlayersName) {
        console.log("a1 work");
        selectAStartFive(list[index], target + 1);
      } else {
        console.log("b1 work");
        selectBStartFive(list[index], target + 1);
      }
    } else {
      console.log("3");
      let startForFilter = [...targetGroup];
      startForFilter[target] = "deafult";
      let list = listOri.filter((player) => !startForFilter.includes(player));
      let index = list.indexOf(value);
      if (type === "next") {
        index += 1;
        if (index >= list.length) {
          index = 0;
        }
      } else if (type === "last") {
        if (index <= 0) {
          index = list.length - 1;
        } else {
          index -= 1;
        }
      }
      let start = [...targetGroup];
      start[target] = list[index];
      setTarget(start);
      if (source === aTeamPlayersName) {
        console.log("a2 work");
        selectAStartFive(list[index], target + 1);
      } else {
        console.log("b2 work");
        selectBStartFive(list[index], target + 1);
      }
    }
  };

  const chooseSpecifiedGame = async function (e) {
    const docSnap = await getDoc(doc(db, "game_schedule", e));
    props.liveGameName.current = e;
    console.log("e", e);
    let data = docSnap.data();
    setATeam(data.aTeam);
    setBTeam(data.bTeam);
  };

  return (
    <>
      {finishSetting ? null : <GeneralDiv height="100px" width="100%" />}
      <Div_Record>
        {finishSetting === false ? (
          <>
            <DivBeforeGameRecord>
              <RegulationBlock>
                <RegulationBlockCell>
                  <SelectPlayer
                    width="500px"
                    onChange={(e) => chooseSpecifiedGame(e.target.value)}
                  >
                    <option>Select Game</option>
                    {props.scheduleGames?.map((game) => (
                      <option value={game} key={game}>
                        {game}
                      </option>
                    ))}
                  </SelectPlayer>
                </RegulationBlockCell>
                <RegulationBlockCell>
                  <SelectPlayer
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
                    <option>Select Quar</option>
                    <option value={4}>4 quarter</option>
                    <option value={2}>2 half</option>
                  </SelectPlayer>
                </RegulationBlockCell>
                <RegulationBlockCell>
                  <SelectPlayer
                    onChange={(e) => {
                      eachQuarterTime.current = Number(e.target.value);
                      setTimerMinutes(e.target.value);
                    }}
                  >
                    <option>Select Mins</option>
                    <option value={10}>10 mins</option>
                    <option value={12}>12 mins</option>
                  </SelectPlayer>
                </RegulationBlockCell>
                {/* <RegulationBlockCell>
                <SelectPlayer onChange={(e) => setStopTime(e.target.value)}>
                  <option>Select Stop</option>
                  <option value={0}>停錶</option>
                  <option value={1}>各節最後三分鐘停錶</option>
                  <option value={2}>不停錶</option>
                </SelectPlayer>
              </RegulationBlockCell> */}
              </RegulationBlock>
              <ButtonSubmit
                zIndex="10"
                fontSize="1.2rem"
                position="fixed"
                padding="0.5rem 0.75rem"
                bottom="40px"
                onClick={() => {
                  finishGameSetting();
                }}
              >
                Submit
              </ButtonSubmit>
              <TeamBlock>
                <GeneralDiv
                  backgroundColor="rgba(255,255,255,0.5)"
                  position="fixed"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                />
                <TeamBlockDetail
                  backgroundImage={`url(${aTeamLogo})`}
                  backgroundPosition="200%"
                >
                  <TeamBlockDetailTeam display="none">
                    <ButtonForChange
                      onClick={() =>
                        change(
                          "last",
                          aTeam,
                          bTeam,
                          teams,
                          setATeam,
                          setATeamStartFive
                        )
                      }
                    >
                      <i
                        className="fa-solid fa-chevron-left"
                        style={{
                          color: "white",
                          fontSize: "32px",
                          width: " 32px",
                          height: "32px",
                          webkitTextStroke: "1px #495057",
                        }}
                      ></i>
                    </ButtonForChange>
                    <SelectTeam
                      value={aTeam}
                      onChange={(e) => {
                        setATeam(e.target.value);
                        setATeamStartFive([
                          "default",
                          "default",
                          "default",
                          "default",
                          "default",
                        ]);
                      }}
                    >
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
                    </SelectTeam>
                    <ButtonForChange
                      onClick={() =>
                        change(
                          "next",
                          aTeam,
                          bTeam,
                          teams,
                          setATeam,
                          setATeamStartFive
                        )
                      }
                    >
                      <i
                        className="fa-solid fa-chevron-right"
                        style={{
                          webkitTextStroke: "1px #495057",
                          color: "white",
                          fontSize: "32px",
                          width: " 32px",
                          height: "32px",
                        }}
                      ></i>
                    </ButtonForChange>
                  </TeamBlockDetailTeam>
                  <TeamBlockDetailPlayer marginLeft="auto">
                    {aTeam && (
                      <div>
                        {five.map((num, index) => (
                          <TeamBlockDetailPlayerDiv key={num}>
                            <ButtonForChange
                              onClick={() =>
                                changePlayer(
                                  "last",
                                  index,
                                  aTeamStartFive,
                                  aTeamPlayersName,
                                  setATeamStartFive
                                )
                              }
                            >
                              <i
                                className="fa-solid fa-chevron-left"
                                style={{
                                  color: "white",
                                  fontSize: "28px",
                                  width: "28px",
                                  webkitTextStroke: "1px #495057",
                                  height: "28px",
                                }}
                              ></i>
                            </ButtonForChange>
                            {aTeamStartFive[index] !== "default" ? (
                              <SelectPlayerImg
                                style={{
                                  backgroundImage: `url(${aTeamPlayers[index].pic})`,
                                }}
                              />
                            ) : (
                              <SelectPlayerImg />
                            )}
                            <SelectPlayer
                              key={index}
                              value={aTeamStartFive[index]}
                              onChange={(e) => {
                                selectAStartFive(e.target.value, num);
                                setATeamStartFive((pre) => [
                                  ...pre,
                                  (aTeamStartFive[index] = e.target.value),
                                ]);
                              }}
                            >
                              <option disabled value="default">
                                Select Player
                              </option>
                              {aTeamPlayers?.map((player) =>
                                player.position === 6 ? (
                                  <option key={player.name} value={player.name}>
                                    {player.name}
                                  </option>
                                ) : (
                                  <option disabled key={player.name}>
                                    {player.name}
                                  </option>
                                )
                              )}
                            </SelectPlayer>
                            <ButtonForChange
                              onClick={() =>
                                changePlayer(
                                  "next",
                                  index,
                                  aTeamStartFive,
                                  aTeamPlayersName,
                                  setATeamStartFive
                                )
                              }
                            >
                              <i
                                className="fa-solid fa-chevron-right"
                                style={{
                                  color: "white",
                                  fontSize: "28px",
                                  width: "28px",
                                  webkitTextStroke: "1px #495057",
                                  height: "28px",
                                }}
                              ></i>
                            </ButtonForChange>
                          </TeamBlockDetailPlayerDiv>
                        ))}
                      </div>
                    )}
                  </TeamBlockDetailPlayer>
                </TeamBlockDetail>

                {/* <TeamBlockLogoDiv>
                  <TeamBlockLogoImg src={aTeamLogo} />
                </TeamBlockLogoDiv> */}
              </TeamBlock>
              <TeamBlock>
                <TeamBlockDetail
                  boxShadow="12px 12px 7px rgba(0, 0, 0, 0.7);"
                  backgroundImage={`url(${bTeamLogo})`}
                  backgroundPosition="-100%"
                >
                  <TeamBlockDetailTeam display="none">
                    <ButtonForChange
                      onClick={() =>
                        change(
                          "last",
                          bTeam,
                          aTeam,
                          teams,
                          setBTeam,
                          setBTeamStartFive
                        )
                      }
                    >
                      <i
                        className="fa-solid fa-chevron-left"
                        style={{
                          webkitTextStroke: "1px #495057",
                          color: "white",
                          fontSize: "32px",
                          width: " 32px",
                          height: "32px",
                        }}
                      ></i>
                    </ButtonForChange>

                    <SelectTeam
                      value={bTeam}
                      onChange={(e) => {
                        setBTeam(e.target.value);
                        setBTeamStartFive([
                          "default",
                          "default",
                          "default",
                          "default",
                          "default",
                        ]);
                      }}
                    >
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
                    </SelectTeam>
                    <ButtonForChange
                      onClick={() =>
                        change(
                          "next",
                          bTeam,
                          aTeam,
                          teams,
                          setBTeam,
                          setBTeamStartFive
                        )
                      }
                    >
                      <i
                        className="fa-solid fa-chevron-right"
                        style={{
                          webkitTextStroke: "1px #495057",
                          color: "white",
                          fontSize: "32px",
                          width: " 32px",
                          height: "32px",
                        }}
                      ></i>
                    </ButtonForChange>
                  </TeamBlockDetailTeam>
                  <TeamBlockDetailPlayer>
                    {bTeam && (
                      <div>
                        {five.map((num, index) => (
                          <TeamBlockDetailPlayerDiv key={num}>
                            <ButtonForChange
                              onClick={() =>
                                changePlayer(
                                  "last",
                                  index,
                                  bTeamStartFive,
                                  bTeamPlayersName,
                                  setBTeamStartFive
                                )
                              }
                            >
                              <i
                                className="fa-solid fa-chevron-left"
                                style={{
                                  color: "white",
                                  fontSize: "28px",
                                  width: "28px",
                                  webkitTextStroke: "1px #495057",
                                  height: "28px",
                                }}
                              ></i>
                            </ButtonForChange>

                            <SelectPlayer
                              key={index}
                              value={bTeamStartFive[index]}
                              onChange={(e) => {
                                selectBStartFive(e.target.value, num);
                                setBTeamStartFive((pre) => [
                                  ...pre,
                                  (bTeamStartFive[index] = e.target.value),
                                ]);
                              }}
                            >
                              <option disabled value="default">
                                Select Player
                              </option>
                              {bTeamPlayers?.map((player) =>
                                player.position === 6 ? (
                                  <option key={player.name}>
                                    {player.name}
                                  </option>
                                ) : (
                                  <option disabled key={player.name}>
                                    {player.name}
                                  </option>
                                )
                              )}
                            </SelectPlayer>
                            {bTeamStartFive[index] !== "default" ? (
                              <SelectPlayerImg
                                style={{
                                  backgroundImage: `url(${bTeamPlayers[index].pic})`,
                                }}
                              />
                            ) : (
                              <SelectPlayerImg />
                            )}
                            <ButtonForChange
                              onClick={() =>
                                changePlayer(
                                  "next",
                                  index,
                                  bTeamStartFive,
                                  bTeamPlayersName,
                                  setBTeamStartFive
                                )
                              }
                            >
                              <i
                                className="fa-solid fa-chevron-right"
                                style={{
                                  color: "white",
                                  fontSize: "28px",
                                  width: "28px",
                                  webkitTextStroke: "1px #495057",
                                  height: "28px",
                                }}
                              ></i>
                            </ButtonForChange>
                          </TeamBlockDetailPlayerDiv>
                        ))}
                      </div>
                    )}
                  </TeamBlockDetailPlayer>
                </TeamBlockDetail>
                {/* <TeamBlockLogoDiv>
                  <TeamBlockLogoImg src={bTeamLogo} />
                </TeamBlockLogoDiv> */}
              </TeamBlock>
            </DivBeforeGameRecord>
          </>
        ) : (
          <DivGameStartRecord>
            {wantToCloseGame ? (
              <PopupEndGameBlock
                endGame={endGame}
                setWantToCloseGame={setWantToCloseGame}
              />
            ) : null}
            <DivGameStartLogo
              backgroundImage={`url(${aTeamLogo})`}
              backgroundSize="cover"
              backgroundPosition="-200%"
              opacity={leftSide ? "0.7" : "0.3"}
              transitionDuration="0.5s"
            />
            <DivGameStart_Container>
              {openGradeButton && (
                <GeneralDiv
                  display="flex"
                  justifyContent="center"
                  position="fixed"
                  right="10px"
                  bottom="70px"
                  zIndex="10"
                >
                  <table
                    className="bg-coolors_8 text-coolors_1 text-center rounded border-none border-separate"
                    cellPadding="10"
                    border="2"
                    style={{ fontSize: "20px" }}
                  >
                    <thead>
                      <tr>
                        <th>隊伍</th>
                        {quarter
                          ? quarter.map((item, index) => (
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
                </GeneralDiv>
              )}
              <GeneralDiv>
                <GeneralDiv
                  display="flex"
                  boxShadow="0px 0px 1px 3px rgba(108,117,125, 0.4);"
                  flexWrap="nowrap"
                  backgroundColor="transparent"
                  justifyContent="space-around"
                  width="740px"
                  alignItems="center"
                  borderRadius="5px"
                  marginBottom="5px"
                >
                  <Clock
                    liveGameName={props.liveGameName}
                    finishSetting={finishSetting}
                    eachQuarterTime={eachQuarterTime}
                    quarter={quarter}
                    quarteNow={quarterNow}
                    setQuarterNow={setQuarterNow}
                    timerMinutes={timerMinutes}
                    setTimerMinutes={setTimerMinutes}
                    timerSeconds={timerSeconds}
                    setTimerSeconds={setTimerSeconds}
                    affectTimeStopBehavior={affectTimeStopBehavior}
                    affectShotClockBehavior={affectShotClockBehavior}
                  />
                  <GeneralDiv
                    height="50px"
                    width="280px"
                    backgroundColor="#343a40"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                    borderRadius="0 5px 5px 0"
                  >
                    <ButtonSubmit
                      height="30px"
                      padding="1px 4px"
                      fontSize="16px"
                      border="1px solid white"
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
                    </ButtonSubmit>
                    <ButtonSubmit
                      height="30px"
                      padding="1px 4px"
                      fontSize="16px"
                      border="1px solid white"
                    >
                      請求暫停
                    </ButtonSubmit>
                    <ButtonSubmit
                      fontSize="16px"
                      padding="1px 5px"
                      onClick={() => {
                        if (
                          aTeamData[quarter.length]["pts"] ===
                          bTeamData[quarter.length]["pts"]
                        ) {
                          alert("平手尚未結束");
                        } else {
                          setWantToCloseGame(true);
                        }
                      }}
                    >
                      結束比賽
                    </ButtonSubmit>
                  </GeneralDiv>
                </GeneralDiv>

                <LiveActionBolck
                  ok={
                    activePlayer !== undefined &&
                    playerLocation &&
                    playerActions
                      ? true
                      : false
                  }
                >
                  {leftSide && <div>{aTeam}</div>}
                  {!leftSide && <div>{bTeam}</div>}
                  {leftSide && activePlayer !== undefined ? (
                    aTeamPlayers ? (
                      <div>{aTeamPlayers[activePlayer].id}</div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {!leftSide && activePlayer !== undefined ? (
                    bTeamPlayers ? (
                      <div>{bTeamPlayers[activePlayer].id}</div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  {playerLocation && <div> {playerLocation} </div>}

                  {playerActions && playerActions.actionWord && (
                    <div>{playerActions.actionWord}</div>
                  )}

                  {playerActions && playerActions.actionWord && (
                    <div>{playerActions.actionNumber}</div>
                  )}
                </LiveActionBolck>
              </GeneralDiv>
              <GroundContainer>
                <TeamBox
                  exchangePlayer={exchangePlayer}
                  teamPlayers={aTeamPlayers}
                  setTeamPlayers={setATeamPlayers}
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
                  teamPlayers={bTeamPlayers}
                  setTeamPlayers={setBTeamPlayers}
                  activePlayer={activePlayer}
                  selectTeam={!leftSide}
                ></TeamBox>
              </GroundContainer>
              {/* <GeneralDiv height="100px" width="100px" /> */}
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
                pageSize={pageSize}
                setOpenGradeButton={setOpenGradeButton}
              />
            </DivGameStart_Container>
            <DivGameStartLogo
              backgroundImage={`url(${bTeamLogo})`}
              backgroundSize="cover"
              backgroundPosition="-200%"
              opacity={!leftSide ? "0.8" : "0.2"}
              transitionDuration="0.5s"
            />
          </DivGameStartRecord>
        )}
      </Div_Record>
    </>
  );
}

function TeamBox(props) {
  const [renderPlayers, setRenderPlayers] = useState();
  useEffect(() => {
    if (props.exchangePlayer === false) {
      setRenderPlayers(props.teamPlayers.slice(0, 5));
    } else {
      setRenderPlayers(props.teamPlayers);
    }
  }, [props.exchangePlayer, props.teamPlayers]);

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
          <TeamOnTheGround {...provided.droppableProps} ref={provided.innerRef}>
            {renderPlayers &&
              renderPlayers.map((player, index) => (
                <Draggable
                  key={player.name}
                  draggableId={player.name}
                  index={index}
                >
                  {(provided) => (
                    <GeneralDiv
                      height="140px"
                      width={props.exchangePlayer ? "100px" : "190px"}
                      textAlign="center"
                      display="flex"
                      flexWrap="wrap"
                      alignItems="center"
                      justifyContent="cneter"
                      transitionDuration="0.5s"
                      borderRadius="5px"
                      border={
                        props.selectTeam && props.activePlayer === index
                          ? "8px ridge #ced4da"
                          : "0.1px soild white"
                      }
                      boxShadow={
                        props.selectTeam && props.activePlayer === index
                          ? "-12px 7px 7px 5px rgba(108,117,125, 0.4);"
                          : "0px 0px 0px 0px rgba(108,117,125, 0.4);"
                      }
                      // key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <GeneralDiv
                        hoverWidth={props.exchangePlayer ? "110px" : null}
                        backgroundPosition="center"
                        backgroundSize="cover"
                        margin="0 auto"
                        height="100px"
                        width={props.exchangePlayer ? "80px" : "120px"}
                        borderRadius="100%"
                        // backgroundImage={`url(${player.pic})`}
                        hoverTransitionDuration="0.15s"
                        transitionDuration="0.4s"
                      >
                        <GeneralImg
                          hoverWidth={props.exchangePlayer ? "110px" : null}
                          height={props.exchangePlayer ? "90px" : "100px"}
                          width={props.exchangePlayer ? "90px" : "140px"}
                          src={player.pic}
                          transitionDuration="0.5s"
                          filter={
                            props.exchangePlayer
                              ? null
                              : props.selectTeam && props.activePlayer === index
                              ? "drop-shadow(-15px 10px 5px rgba(0, 0, 0, 0.3))"
                              : "drop-shadow(-10px 5px 3px rgba(0, 0, 0, 0.5))"
                          }
                        />
                      </GeneralDiv>
                      <GeneralDiv
                        width="100%"
                        textAlign="center"
                        fontSize={props.exchangePlayer ? "14px" : null}
                      >
                        {player.id}
                      </GeneralDiv>
                    </GeneralDiv>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </TeamOnTheGround>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const PopupEndGameBlock = function (props) {
  return (
    <>
      <PopupBlur onClick={() => props.setWantToCloseGame(false)} />
      <PopupDiv
        height="120px"
        fontSize="28px"
        top="38vh"
        borderRadius="5px"
        backgroundColor="rgba(206, 212, 218, 1.0)"
        color="#343a40"
      >
        確定結束比賽？
        <br />
        <div>
          <ButtonSubmit
            width="60px"
            height="40px"
            fontSize="20px"
            margin="0 10px 0 0"
            onClick={props.endGame}
          >
            Yes
          </ButtonSubmit>
          <ButtonSubmit
            width="60px"
            height="40px"
            fontSize="20px"
            onClick={() => props.setWantToCloseGame(false)}
          >
            No
          </ButtonSubmit>
        </div>
      </PopupDiv>
    </>
  );
};

export default App;
