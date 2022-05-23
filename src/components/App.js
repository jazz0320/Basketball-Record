import { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";
import {
  GeneralDiv,
  Div_Record,
  ButtonSubmit,
  PopupDiv,
} from "../utils/StyleComponent";
import ContinueGame from "./ContinuteGame";
import AppGameStart from "./AppGameStart";
import AppGameSetting from "./AppGameSetting";

function App(props) {
  const [backToChooseGameBlock, setBackToChooseGameBlock] = useState(false); //keep
  const [pageSize, setPageSize] = useState([]);
  const [aTeam, setATeam] = useState("default"); //keep

  const [aTeamLogo, setATeamLogo] = useState(); //keep
  const [aTeamWinLoss, setATeamWinLoss] = useState([]); //keep
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [aTeamData, setATeamData] = useState();

  const [bTeam, setBTeam] = useState("default"); //keep

  const [bTeamLogo, setBTeamLogo] = useState(); //keep
  const [bTeamWinLoss, setBTeamWinLoss] = useState([]); //keep
  const [bTeamPlayers, setBTeamPlayers] = useState(); //keep
  const [bTeamData, setBTeamData] = useState(); //keep
  const [quarter, setQuarter] = useState(0); //選擇賽制 //keep
  const eachQuarterTime = useRef(); //keep
  //time
  const [timerMinutes, setTimerMinutes] = useState(0); //keep

  const [finishSetting, setFinishSetting] = useState(false); //keep
  const [quarterNow, setQuarterNow] = useState(1); //keep

  const [liveAction, setLiveAction] = useState([]); //keep

  const restartGameTime = useRef(); //keep
  const restartGameShotTime = useRef(); //keep
  const [wantToBackLiveGame, setWantToBackLiveGame] = useState(true); //keep

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
          //new
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
  }; //keep

  return (
    <>
      {backToChooseGameBlock && (
        <PopupDiv
          top="40vh"
          left="42vw"
          zIndex="100"
          height="100px"
          width="16vw"
          backgroundColor="#ced4da"
        >
          <ButtonSubmit
            margin="0px 30px 0px 0px"
            padding="5px 15px"
            onClick={finishGameSetting}
            fontSize="20px"
          >
            確認
          </ButtonSubmit>
          <ButtonSubmit
            padding="5px 15px"
            fontSize="20px"
            onClick={() => setBackToChooseGameBlock(false)}
          >
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
      {finishSetting ? null : <GeneralDiv height="100px" width="100%" />}
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
