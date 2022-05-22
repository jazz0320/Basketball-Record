import { useEffect, useReducer, useState, useRef } from "react";
import { getDoc, doc, db, setDoc, deleteDoc } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  GeneralDiv,
  DivGameStartLogo,
  DivGameStartRecord,
  DivGameStart_Container,
  ButtonSubmit,
  GroundContainer,
  LiveActionBolck,
} from "../utils/StyleComponent";

function AppGameStart() {
  const whoWin = useRef(); //ok
  //time
  const [timerSeconds, setTimerSeconds] = useState(0); //ok
  const [affectTimeStopBehavior, setAffectTimeStopBehavior] = useState(true); //ok
  const [affectShotClockBehavior, setAffectShotClockBehavior] = useState(true); //ok
  const [exchangePlayer, setExchangePlayer] = useState(false); //ok

  const [leftSide, setLeftSide] = useState(true); //ok
  const [activePlayer, setActivePlayer] = useState(); //ok
  const [activePlayerId, setActivePlayerId] = useState(); //ok
  const [activePlayerPic, setActivePlayerPic] = useState(); //ok
  const [playerLocation, setPlayerLocation] = useState(); //ok
  const [playerLocationScoreNumber, setPlayerLocationScoreNumber] = useState(); //ok
  const [playerAxis, setPlayerAxis] = useState(); //ok

  const [liveAction, setLiveAction] = useState([]); //ok
  const [openGradeButton, setOpenGradeButton] = useState(false); //ok
  const [wantToCloseGame, setWantToCloseGame] = useState(); //ok

  const restartGameTime = useRef(); //ok
  const restartGameShotTime = useRef(); //ok

  let redirect = useNavigate(); //ok

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
        activeTeam = props.aTeamPlayers;
      } else {
        activeTeam = props.bTeamPlayers;
      }

      const playerChoose = (playerPosition) => {
        setActivePlayer(); //for css animation effect 清空
        clearActionByChangePlayer();
        setActivePlayer(playerPosition);
        setActivePlayerId(activeTeam[playerPosition].id);
        setActivePlayerPic(activeTeam[playerPosition].pic);
      };

      const clearActionByChangePlayer = function () {
        //換人clear
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

  //球員行為
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

        setLiveAction((prev) => [
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
          ...liveAction,
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
    props.bTeamData,
    props.aTeamData,
    props.quarterNow,
    props.quarter,
    playerAxis,
    playerLocation,
    playerLocationScoreNumber,
    playerActions,
    liveAction,
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
    await setDoc(
      doc(db, "live_game", props.liveGameName.current),
      {
        endGame: true,
      },
      { merge: true }
    );
    console.log("aaa");
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
    console.log("bbb");
    // const saveGameData = async function () {
    await setDoc(
      doc(db, "past_data", props.liveGameName.current),
      {
        ...data,
      },
      { merge: true }
    );

    //記錄輸贏
    console.log("aTeamGrade", aTeamGrade);
    await setDoc(
      doc(db, "team_data", props.aTeam),
      {
        winLoss: aTeamGrade,
      },
      { merge: true }
    );
    console.log("bTeamGrade", bTeamGrade);
    await setDoc(
      doc(db, "team_data", props.bTeam),
      {
        winLoss: bTeamGrade,
      },
      { merge: true }
    );
    //保存球員個人成績
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
              restartGameShotTime={restartGameShotTime}
              restartGameTime={restartGameTime}
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
              </ButtonSubmit>
            </GeneralDiv>
          </GeneralDiv>

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
        </GeneralDiv>
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
        {/* <GeneralDiv height="100px" width="100px" /> */}
        <RecordRoom
          quarter={props.quarter}
          quarterNow={props.quarterNow}
          liveAction={liveAction}
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
        backgroundSize="cover"
        backgroundPosition="-200%"
        opacity={!leftSide ? "0.8" : "0.2"}
        transitionDuration="0.5s"
      />
    </DivGameStartRecord>
  );
}

export default AppGameStart;
