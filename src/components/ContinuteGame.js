import { useState } from "react";
import { getDoc, doc, db } from "../utils/firebase";
import styled from "styled-components";

const PopupBlur = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  background-color: rgba(0, 0, 0);
  opacity: 0.5;
`;

const LiveGameSelect = styled.select`
  height: 40px;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonSubmit = styled.button`
  background-color: #343a40;
  border: 1px solid white;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 20px;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  margin: ${(props) => props.margin};
  width: 160px;
  height: 40px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
`;

const PopupDiv = styled.div`
  position: fixed;

  background-color: #495057;
  color: #f8f9fa;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
  height: 30vh;
  top: 30vh;
  width: 40vw;
  z-index: 99;
  left: 30vw;
`;

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
      props.reset(docSnap.data(), time);
    }
    systemSetting();
  };
  return (
    <>
      <PopupBlur />
      <PopupDiv height="30vh" width="40vw" zIndex="99" left="30vw">
        <div>選擇恢復比賽？</div>
        <LiveGameSelect
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
        </LiveGameSelect>
        <ButtonContainer>
          <ButtonSubmit onClick={gameRestart}>選擇</ButtonSubmit>
          <ButtonSubmit onClick={() => props.setWantToBackLiveGame(false)}>
            取消
          </ButtonSubmit>
        </ButtonContainer>
      </PopupDiv>
    </>
  );
}

export default ContinueGame;
