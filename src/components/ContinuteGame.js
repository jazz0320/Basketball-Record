import { useState } from "react";
import {
  PopupDiv,
  PopupBlur,
  ButtonSubmit,
  GeneralSelect,
  GeneralDiv,
} from "../utils/StyleComponent";
import { getDoc, doc, db } from "../utils/firebase";

function ContinueGame(props) {
  const [backLiveGame, setBackLiveGame] = useState("none");

  const gameRestart = function () {
    if (backLiveGame === "none") {
      alert("請選擇欲恢復比賽");
      return;
    }
    props.liveGameName.current = backLiveGame;
    async function systemSetting() {
      const docSnap = await getDoc(doc(db, "live_game", backLiveGame));
      const time =
        docSnap.data().time_minutes * 60 + docSnap.data().time_seconds;
      props.restartGameTime.current = time;
      props.eachQuarterTime.current = docSnap.data().quarter_minutes;
      props.restartGameShotTime.current = docSnap.data().time_shotClock;
      props.setLiveAction(docSnap.data().live_action);
      props.setQuarter(docSnap.data().quarter);
      props.setQuarterNow(docSnap.data().quarterNow);
      props.setATeam(docSnap.data().A_team);
      props.setATeamPlayers(docSnap.data().A_team_player);
      props.setATeamLogo(docSnap.data().A_team_logo);
      props.setATeamData(docSnap.data().A_team_data);
      props.setBTeam(docSnap.data().B_team);
      props.setBTeamPlayers(docSnap.data().B_team_player);
      props.setBTeamLogo(docSnap.data().B_team_logo);
      props.setBTeamData(docSnap.data().B_team_data);
    }
    systemSetting();
    props.setBackToChooseGameBlock(true);
  };
  return (
    <>
      <PopupBlur zIndex="90" />
      <PopupDiv height="30vh" width="40vw" zIndex="99" left="30vw">
        <GeneralDiv width="80%" textAlign="center">
          選擇恢復比賽？
        </GeneralDiv>
        <GeneralSelect
          fontSize="16px"
          color="black"
          height="40px"
          value={backLiveGame}
          onChange={(e) => {
            setBackLiveGame(e.target.value);
          }}
        >
          <option>none</option>
          {props.everyLiveGames?.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </GeneralSelect>
        <GeneralDiv display="flex" justifyContent="space-around" width="80%">
          <ButtonSubmit
            width="160px"
            height="40px"
            fontSize="20px"
            margin="0 10px 0 0"
            onClick={gameRestart}
          >
            選擇
          </ButtonSubmit>
          <ButtonSubmit
            width="160px"
            height="40px"
            fontSize="20px"
            onClick={() => props.setWantToBackLiveGame(false)}
          >
            取消
          </ButtonSubmit>
        </GeneralDiv>
      </PopupDiv>
    </>
  );
}

export default ContinueGame;
