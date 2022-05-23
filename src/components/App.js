import { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";
import styled from "styled-components";
import ContinueGame from "./ContinuteGame";
import AppGameStart from "./AppGameStart";
import AppGameSetting from "./AppGameSetting";

const Div_Record = styled.div`
  display: fiexd;
`;

const PopupDiv = styled.div`
  top: 40vh;
  left: 42vw;
  z-index: 100;
  height: 100px;
  width: 16vw;
  background-color: #ced4da;
  position: fixed;
  box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.2);
  color: #f8f9fa;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 3px 3px rgba(255, 255, 255, 0.5);
  }
`;

const ButtonSubmit = styled.button`
  margin: 0px 15px;
  padding: 5px 15px;
  font-size: 20px;
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
const SpaceDiv = styled.div`
  height: 100px;
  width: 100%;
`;

function App(props) {
  const [backToChooseGameBlock, setBackToChooseGameBlock] = useState(false);
  const [pageSize, setPageSize] = useState([]);
  const [aTeam, setATeam] = useState("default");

  const [aTeamLogo, setATeamLogo] = useState();
  const [aTeamWinLoss, setATeamWinLoss] = useState([]);
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [aTeamData, setATeamData] = useState();

  const [bTeam, setBTeam] = useState("default");

  const [bTeamLogo, setBTeamLogo] = useState();
  const [bTeamWinLoss, setBTeamWinLoss] = useState([]);
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const [bTeamData, setBTeamData] = useState();
  const [quarter, setQuarter] = useState(0);
  const eachQuarterTime = useRef();

  const [timerMinutes, setTimerMinutes] = useState(0);

  const [finishSetting, setFinishSetting] = useState(false);
  const [quarterNow, setQuarterNow] = useState(1);

  const [liveAction, setLiveAction] = useState([]);

  const restartGameTime = useRef();
  const restartGameShotTime = useRef();
  const [wantToBackLiveGame, setWantToBackLiveGame] = useState(true);

  //偵測螢幕大小
  const getPageSize = function () {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;

    setPageSize([pageWidth, pageHeight]);
  };

  useEffect(() => {
    getPageSize();
  }, []);

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

    async function systemSetting() {
      await setDoc(
        doc(db, "live_game", props.liveGameName.current),
        {
          live_action: [],
          quarter: quarter,
          quarterNow: quarterNow,
          quarter_minutes: Number(eachQuarterTime.current),
          finishSetting: true,
          endGame: false,
          A_team: aTeam,
          A_team_player: aTeamPlayers,
          A_team_logo: aTeamLogo,
          A_team_data: aTeamData,
          A_team_WinLoss: aTeamWinLoss,
          B_team_data: bTeamData,
          B_team: bTeam,
          B_team_player: bTeamPlayers,
          B_team_logo: bTeamLogo,
          B_team_WinLoss: bTeamWinLoss,
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
    setBackToChooseGameBlock(false);
    setWantToBackLiveGame(false);
  };

  return (
    <>
      {backToChooseGameBlock && (
        <PopupDiv>
          <ButtonSubmit onClick={finishGameSetting}>確認</ButtonSubmit>
          <ButtonSubmit onClick={() => setBackToChooseGameBlock(false)}>
            取消
          </ButtonSubmit>
        </PopupDiv>
      )}
      {wantToBackLiveGame ? (
        <ContinueGame
          reset={(gameData, time) => {
            restartGameTime.current = time;
            eachQuarterTime.current = gameData.quarter_minutes;
            restartGameShotTime.current = gameData.time_shotClock;
            setLiveAction(gameData.live_action);
            setQuarter(gameData.quarter);
            setQuarterNow(gameData.quarterNow);
            setATeam(gameData.A_team);
            setATeamPlayers(gameData.A_team_player);
            setATeamLogo(gameData.A_team_logo);
            setATeamData(gameData.A_team_data);
            setATeamWinLoss(gameData.A_team_WinLoss);
            setBTeam(gameData.B_team);
            setBTeamPlayers(gameData.B_team_player);
            setBTeamLogo(gameData.B_team_logo);
            setBTeamData(gameData.B_team_data);
            setBTeamWinLoss(gameData.B_team_WinLoss);
            setBackToChooseGameBlock(true);
          }}
          setWantToBackLiveGame={setWantToBackLiveGame}
          restartGameShotTime={restartGameShotTime}
          restartGameTime={restartGameTime}
          liveGameName={props.liveGameName}
          everyLiveGames={props.everyLiveGames}
        />
      ) : null}
      {finishSetting ? null : <SpaceDiv />}
      <Div_Record>
        {finishSetting === false ? (
          <AppGameSetting
            aTeam={aTeam}
            setATeam={setATeam}
            aTeamLogo={aTeamLogo}
            setATeamLogo={setATeamLogo}
            bTeamLogo={bTeamLogo}
            setBTeamLogo={setBTeamLogo}
            aTeamWinLoss={aTeamWinLoss}
            setATeamWinLoss={setATeamWinLoss}
            bTeamWinLoss={bTeamWinLoss}
            setBTeamWinLoss={setBTeamWinLoss}
            aTeamPlayers={aTeamPlayers}
            setATeamPlayers={setATeamPlayers}
            bTeamPlayers={bTeamPlayers}
            setBTeamPlayers={setBTeamPlayers}
            aTeamData={aTeamData}
            setATeamData={setATeamData}
            bTeamData={bTeamData}
            setBTeamData={setBTeamData}
            bTeam={bTeam}
            setBTeam={setBTeam}
            quarter={quarter}
            setQuarter={setQuarter}
            eachQuarterTime={eachQuarterTime}
            setFinishSetting={setFinishSetting}
            setTimerMinutes={setTimerMinutes}
            quarterNow={quarterNow}
            finishGameSetting={finishGameSetting}
            scheduleGames={props.scheduleGames}
            liveGameName={props.liveGameName}
            wantToBackLiveGame={wantToBackLiveGame}
          />
        ) : (
          <AppGameStart
            liveGameName={props.liveGameName}
            setBackToChooseGameBlock={setBackToChooseGameBlock}
            pageSize={pageSize}
            aTeam={aTeam}
            aTeamLogo={aTeamLogo}
            bTeamLogo={bTeamLogo}
            aTeamWinLoss={aTeamWinLoss}
            setATeamWinLoss={setATeamWinLoss}
            bTeamWinLoss={bTeamWinLoss}
            setBTeamWinLoss={setBTeamWinLoss}
            aTeamPlayers={aTeamPlayers}
            setATeamPlayers={setATeamPlayers}
            bTeamPlayers={bTeamPlayers}
            setBTeamPlayers={setBTeamPlayers}
            aTeamData={aTeamData}
            setATeamData={setATeamData}
            bTeamData={bTeamData}
            setBTeamData={setBTeamData}
            bTeam={bTeam}
            quarter={quarter}
            eachQuarterTime={eachQuarterTime}
            finishSetting={finishSetting}
            timerMinutes={timerMinutes}
            setTimerMinutes={setTimerMinutes}
            quarterNow={quarterNow}
            setQuarterNow={setQuarterNow}
            restartGameTime={restartGameTime}
            restartGameShotTime={restartGameShotTime}
            setLiveAction={setLiveAction}
            liveAction={liveAction}
            setIsGameStart={props.setIsGameStart}
          />
        )}
      </Div_Record>
    </>
  );
}

export default App;
