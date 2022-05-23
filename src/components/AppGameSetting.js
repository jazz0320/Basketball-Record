import { useEffect, useRef, useState } from "react";
import { getDoc, doc, db } from "../utils/firebase";
import styled from "styled-components/macro";

const DivBeforeGameRecord = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #212529;
  font-size: 30px;
`;

const SelectGame = styled.select`
  cursor: pointer;
  backdrop-filter: blur(3px);
  -webkit-appearance: none;
  width: 600px;
  height: 3rem;
  font-size: 2rem;
  color: #212529;
  background-color: transparent;
  text-align: center;
  border: none;
`;
const SelectSetting = styled.select`
  cursor: pointer;
  backdrop-filter: blur(3px);
  -webkit-appearance: none;
  width: 250px;
  height: 3rem;
  font-size: 2rem;
  color: #212529;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const ButtonSubmit = styled.button`
  z-index: 10;
  background-color: #343a40;
  border: 1px solid white;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 1.2rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 0.5rem 0.75rem;
  position: fixed;
  bottom: 40px;
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

const TeamBlock = styled.div`
  width: 40vw;
  height: calc(100vh - 100px);
  display: flex;
  &:nth-child(2) {
    flex-direction: row-reverse;
  }
  justify-content: space-between;
`;

const LogoBlur = styled.div`
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  left: 10vw;
  width: 80vw;
`;

const TeamBlockDetail = styled.div`
  background-color: #f8f9fa;
  background-image: ${(props) => props.backgroundImage};
  background-position: ${(props) => props.backgroundPosition};
  background-size: cover;
  background-repeat: no-repeat;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamBlockDetailPlayer = styled.div`
  z-index: 10;
  margin-top: 23vh;
  margin-bottom: 4vh;
  height: 46vh;
  width: 500px;
  display: flex;
  justify-content: center;
`;

const ButtonForChange = styled.button`
  color: #f8f9fa;
  background-color: transparent;
  cursor: pointer;
  border: 0px;
  &:hover {
    background: gray;
    color: black;
  }
`;

const SelectPlayerImg = styled.div`
  background-image: ${(props) => props.backgroundImage};
  border-radius: 100%;
  width: 13vh;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SelectPlayer = styled.select`
  cursor: pointer;
  backdrop-filter: blur(3px);
  -webkit-appearance: none;
  width: 270px;
  height: 3rem;
  font-size: 2rem;
  color: #212529;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const TeamBlockDetailPlayerDiv = styled.div`
  padding: 0 2vw;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1.5vh;
`;

const RegulationBlock = styled.div`
  z-index: 10;
  position: fixed;
  top: 100px;
  width: 20vw;
  left: 40vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4vh;
`;

const RegulationBlockCell = styled.div`
  font-size: 32px;
  margin-bottom: 1.5vh;
  justify-content: space-around;
  display: flex;
`;

function AppGameSetting(props) {
  const [aTeamStartFive, setATeamStartFive] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);
  const aTeamPlayersName = useRef();
  const [bTeamStartFive, setBTeamStartFive] = useState([
    "default",
    "default",
    "default",
    "default",
    "default",
  ]);
  const bTeamPlayersName = useRef();
  const five = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (props.wantToBackLiveGame === false) {
      async function selectTeam() {
        const docSnap = await getDoc(doc(db, "team_data", props.aTeam));
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
        props.setATeamPlayers(newData);
        props.setATeamWinLoss(winLoss);
        aTeamPlayersName.current = newData.map((player) => player.name);
        props.setATeamLogo(logo);
      }
      if (props.aTeam !== "default") {
        selectTeam();
      }
    }
  }, [props.aTeam]);

  useEffect(() => {
    async function setTeamsData() {
      let newATeamData = [];
      let newBTeamData = [];
      for (let i = 0; i <= props.quarter.length; i++) {
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
      props.setATeamData([...newATeamData]);
      props.setBTeamData([...newBTeamData]);
    }
    setTeamsData();
  }, [props.quarter]);

  useEffect(() => {
    if (props.wantToBackLiveGame === false) {
      async function selectTeam() {
        const docRef = doc(db, "team_data", props.bTeam);
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
        props.setBTeamPlayers(newData);
        props.setBTeamWinLoss(winLoss);
        bTeamPlayersName.current = newData.map((player) => player.name);
        props.setBTeamLogo(logo);
      }
      if (props.bTeam !== "default") {
        selectTeam();
      }
    }
  }, [props.bTeam]);

  const selectAStartFive = async function (player, position) {
    let players = [...props.aTeamPlayers];
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
    props.setATeamPlayers(players);
  };

  const selectBStartFive = async function (player, position) {
    let players = [];
    players = [...props.bTeamPlayers];
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
    props.setBTeamPlayers(players);
  };

  const changePlayer = function (type, target, targetGroup, source, setTarget) {
    let value = targetGroup[target];
    let listOri = source.current;
    if (value === "default") {
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
        selectAStartFive(list[index], target + 1);
      } else {
        selectBStartFive(list[index], target + 1);
      }
    } else {
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
        selectAStartFive(list[index], target + 1);
      } else {
        selectBStartFive(list[index], target + 1);
      }
    }
  };

  const chooseSpecifiedGame = async function (e) {
    const docSnap = await getDoc(doc(db, "game_schedule", e));
    props.liveGameName.current = e;

    let data = docSnap.data();
    props.setATeam(data.aTeam);
    props.setBTeam(data.bTeam);
  };

  return (
    <DivBeforeGameRecord>
      <RegulationBlock>
        <RegulationBlockCell>
          <SelectGame onChange={(e) => chooseSpecifiedGame(e.target.value)}>
            <option>Select Game</option>
            {props.scheduleGames?.map((game) => (
              <option value={game} key={game}>
                {game}
              </option>
            ))}
          </SelectGame>
        </RegulationBlockCell>
        <RegulationBlockCell>
          <SelectSetting
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
              props.setQuarter([...quarters]);
            }}
          >
            <option>Select Quar</option>
            <option value={4}>4 quarter</option>
            <option value={2}>2 half</option>
          </SelectSetting>
        </RegulationBlockCell>
        <RegulationBlockCell>
          <SelectSetting
            onChange={(e) => {
              props.eachQuarterTime.current = Number(e.target.value);
              props.setTimerMinutes(e.target.value);
            }}
          >
            <option>Select Mins</option>
            <option value={10}>10 mins</option>
            <option value={12}>12 mins</option>
          </SelectSetting>
        </RegulationBlockCell>
      </RegulationBlock>
      <ButtonSubmit onClick={props.finishGameSetting}>Submit</ButtonSubmit>
      <TeamBlock>
        <LogoBlur />
        <TeamBlockDetail
          backgroundImage={`url(${props.aTeamLogo})`}
          backgroundPosition="200%"
        >
          <TeamBlockDetailPlayer
            css={`
              margin-left: auto;
            `}
          >
            {props.aTeam && (
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
                          WebkitTextStroke: "1px #495057",
                          height: "28px",
                        }}
                      ></i>
                    </ButtonForChange>
                    {aTeamStartFive[index] !== "default" ? (
                      <SelectPlayerImg
                        backgroundImage={`url(${props.aTeamPlayers[index].pic})`}
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
                      {props.aTeamPlayers?.map((player) =>
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
                          WebkitTextStroke: "1px #495057",
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
      </TeamBlock>
      <TeamBlock>
        <TeamBlockDetail
          backgroundImage={`url(${props.bTeamLogo})`}
          backgroundPosition="-100%"
        >
          <TeamBlockDetailPlayer>
            {props.bTeam && (
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
                          WebkitTextStroke: "1px #495057",
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
                      {props.bTeamPlayers?.map((player) =>
                        player.position === 6 ? (
                          <option key={player.name}>{player.name}</option>
                        ) : (
                          <option disabled key={player.name}>
                            {player.name}
                          </option>
                        )
                      )}
                    </SelectPlayer>
                    {bTeamStartFive[index] !== "default" ? (
                      <SelectPlayerImg
                        backgroundImage={`url(${props.bTeamPlayers[index].pic})`}
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
                          WebkitTextStroke: "1px #495057",
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
      </TeamBlock>
    </DivBeforeGameRecord>
  );
}

export default AppGameSetting;
