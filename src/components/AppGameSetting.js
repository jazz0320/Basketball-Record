import { useEffect, useRef, useState } from "react";
import { getDoc, getDocs, collection, doc, db } from "../utils/firebase";
import {
  GeneralDiv,
  DivBeforeGameRecord,
  TeamBlock,
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
  ButtonSubmit,
} from "../utils/StyleComponent";

function AppGameSetting(props) {
  const [teams, setTeams] = useState([]);
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

  async function chooseTeam() {
    const querySnapshot = await getDocs(collection(db, "team_data"));
    querySnapshot.forEach((doc) => {
      setTeams((teams) => [...teams, doc.id]);
    });
  }

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
              props.setQuarter([...quarters]);
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
              props.eachQuarterTime.current = Number(e.target.value);
              props.setTimerMinutes(e.target.value);
            }}
          >
            <option>Select Mins</option>
            <option value={10}>10 mins</option>
            <option value={12}>12 mins</option>
          </SelectPlayer>
        </RegulationBlockCell>
      </RegulationBlock>
      <ButtonSubmit
        zIndex="10"
        fontSize="1.2rem"
        position="fixed"
        padding="0.5rem 0.75rem"
        bottom="40px"
        onClick={props.finishGameSetting}
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
          backgroundImage={`url(${props.aTeamLogo})`}
          backgroundPosition="200%"
        >
          <TeamBlockDetailTeam display="none">
            <ButtonForChange
              onClick={() =>
                change(
                  "last",
                  props.aTeam,
                  props.bTeam,
                  teams,
                  props.setATeam,
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
                  WebkitTextStroke: "1px #495057",
                }}
              ></i>
            </ButtonForChange>
            <SelectTeam
              value={props.aTeam}
              onChange={(e) => {
                props.setATeam(e.target.value);
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
                team === props.bTeam ? (
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
                  props.aTeam,
                  props.bTeam,
                  teams,
                  props.setATeam,
                  setATeamStartFive
                )
              }
            >
              <i
                className="fa-solid fa-chevron-right"
                style={{
                  WebkitTextStroke: "1px #495057",
                  color: "white",
                  fontSize: "32px",
                  width: " 32px",
                  height: "32px",
                }}
              ></i>
            </ButtonForChange>
          </TeamBlockDetailTeam>
          <TeamBlockDetailPlayer marginLeft="auto">
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
                        style={{
                          backgroundImage: `url(${props.aTeamPlayers[index].pic})`,
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
          boxShadow="12px 12px 7px rgba(0, 0, 0, 0.7);"
          backgroundImage={`url(${props.bTeamLogo})`}
          backgroundPosition="-100%"
        >
          <TeamBlockDetailTeam display="none">
            <ButtonForChange
              onClick={() =>
                change(
                  "last",
                  props.bTeam,
                  props.aTeam,
                  teams,
                  props.setBTeam,
                  setBTeamStartFive
                )
              }
            >
              <i
                className="fa-solid fa-chevron-left"
                style={{
                  WebkitTextStroke: "1px #495057",
                  color: "white",
                  fontSize: "32px",
                  width: " 32px",
                  height: "32px",
                }}
              ></i>
            </ButtonForChange>

            <SelectTeam
              value={props.bTeam}
              onChange={(e) => {
                props.setBTeam(e.target.value);
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
                team === props.aTeam ? (
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
                  props.bTeam,
                  props.aTeam,
                  teams,
                  props.setBTeam,
                  setBTeamStartFive
                )
              }
            >
              <i
                className="fa-solid fa-chevron-right"
                style={{
                  WebkitTextStroke: "1px #495057",
                  color: "white",
                  fontSize: "32px",
                  width: " 32px",
                  height: "32px",
                }}
              ></i>
            </ButtonForChange>
          </TeamBlockDetailTeam>
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
                        style={{
                          backgroundImage: `url(${props.bTeamPlayers[index].pic})`,
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
