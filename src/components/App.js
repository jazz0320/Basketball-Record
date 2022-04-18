import { useEffect, useState } from "react";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  db,
  setDoc,
} from "../utils/firebase";
import "./App.css";
import Clock from "./Clock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Court3 from "./Court3";
import RecordRoom from "./RecordRoom";

function App() {
  const [teams, setTeams] = useState([]);
  const [aTeam, setATeam] = useState("default");
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [aTeamData, setATeamData] = useState();

  const [bTeam, setBTeam] = useState("default");
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const [bTeamData, setBTeamData] = useState();
  const [quarter, setQuarter] = useState(0); //選擇賽制
  const [eachTime, setEachTime] = useState();
  const [stopTime, setStopTime] = useState();
  const [finishSetting, setFinishSetting] = useState(false);
  const [quarterNow, setQuarterNow] = useState(1);
  const five = [1, 2, 3, 4, 5];

  const [leftSide, setLeftSide] = useState(true);
  const [activePlayer, setActivePlayer] = useState();
  const [playerLocation, setPlayerLocation] = useState();
  const [playerAxis, setPlayerAxis] = useState();
  const [playerAction, setPlayerAction] = useState();
  const [playerActionWord, setPlayerActionWord] = useState();
  const [playerActionNumber, setPlayerActionNumber] = useState();
  const [liveAction, setLiveAction] = useState([]);

  //time
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  //dnd
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from([...aTeamPlayers]);
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
    setATeamPlayers(items);
  }

  useEffect(() => {
    const player = function (e) {
      if (e.keyCode === 192) {
        setLeftSide((prevState) => !prevState);
      }
      if (e.keyCode === 49) {
        if (leftSide) {
          setActivePlayer(0);
        } else {
          setActivePlayer(0);
        }
      }
      if (e.keyCode === 50) {
        if (leftSide) {
          setActivePlayer(1);
        } else {
          setActivePlayer(1);
        }
      }
      if (e.keyCode === 51) {
        if (leftSide) {
          setActivePlayer(2);
        } else {
          setActivePlayer(2);
        }
      }
      if (e.keyCode === 52) {
        if (leftSide) {
          setActivePlayer(3);
        } else {
          setActivePlayer(3);
        }
      }
      if (e.keyCode === 53) {
        if (leftSide) {
          setActivePlayer(4);
        } else {
          setActivePlayer(4);
        }
      }
    };
    window.addEventListener("keydown", player);
    return () => {
      window.removeEventListener("keydown", player);
    };
  }, [leftSide]);

  //球員行為
  useEffect(() => {
    console.log("aaa");
    const action = function (e) {
      if (e.ctrlKey && e.key === "q") {
        console.log("333");
        setPlayerAction("pts");
        setPlayerActionWord("得分");
      } else if (e.key === "q") {
        console.log("000");
        setPlayerAction("pts");
        setPlayerActionWord("得分");
        setPlayerActionNumber(0);
      }

      // if (e.ctrlKey && e.key === "w") {
      //   console.log("333");
      //   setPlayerAction("pts");
      // } else if (e.key === "w") {
      //   console.log("000");
      //   setPlayerAction("pts");
      //   setPlayerActionNumber(0);
      // }
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

        data[activePlayer][playerAction] =
          data[activePlayer][playerAction] + playerActionNumber;

        teamDataNow[quarterNow - 1][playerAction] =
          teamDataNow[quarterNow - 1][playerAction] + playerActionNumber;
        console.log("aaa", quarter);
        teamDataNow[quarter.length][playerAction] =
          teamDataNow[quarter.length][playerAction] + playerActionNumber;
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
            team: leftSide,
            player: activePlayer,
            location: playerLocation,
            axis: playerAxis,
            action: playerActionWord,
            count: playerActionNumber,
            minutes: timerMinutes,
            seconds: timerSeconds,
          },
        ]);
        let actionLive = [
          ...liveAction,
          {
            team: leftSide,
            player: activePlayer,
            axis: playerAxis,
            location: playerLocation,
            action: playerActionWord,
            count: playerActionNumber,
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
        setPlayerAction();
        setPlayerActionWord();
        setPlayerAxis();
        setPlayerLocation();
        setPlayerActionNumber();
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
    playerAction,
    playerActionWord,
    playerActionNumber,
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
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        data[i].ast = 0;
        data[i].pts = 0;
        data[i].reb = 0;
        data[i].start = false;
        data[i].position = 6;
        newData.push(data[i]);
      }
      setATeamPlayers(newData);

      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          A_team: aTeam,
          A_team_player: newData,
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
          ast: 0,
          pts: 0,
          reb: 0,
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
      let newData = [];
      for (let i = 0; i < data.length; i++) {
        data[i].ast = 0;
        data[i].pts = 0;
        data[i].reb = 0;
        data[i].start = false;
        data[i].position = 6;
        newData.push(data[i]);
      }
      setBTeamPlayers(newData);
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          B_team: bTeam,
          B_team_player: newData,
        },
        { merge: true }
      );
    }
    if (bTeam !== "default") {
      selectTeam();
    }
  }, [bTeam]);

  const finishGameSetting = function () {
    async function systemSetting() {
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          quarter: quarter,
          quarterNow: quarterNow,
          quarter_minutes: Number(eachTime),
          stop_ime: stopTime,
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
      <div>
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
              {five.map((num) => (
                <select
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
        <select onChange={(e) => setEachTime(e.target.value)}>
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
      </div>

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
      <div>OnTheGround</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="teamA">
          {(provided) => (
            <div
              id="teambox"
              // style={{ display: "flex" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {aTeamPlayers &&
                aTeamPlayers.map((player, index) => (
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
      <DragDropContext>
        <Droppable droppableId="teamB">
          {(provided) => (
            <div
              id="teambox"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              {bTeamPlayers &&
                bTeamPlayers.map((player, index) => (
                  <Draggable
                    key={player.name}
                    draggableId={player.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
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
      <div>
        {quarter &&
          quarter.map((item, index) => (
            <div>
              {item}
              <br />
              {aTeamData[0] ? aTeamData[index].pts : 0}
              <br />
              {bTeamData[0] ? bTeamData[index].pts : 0}
            </div>
          ))}
        <div>
          Total
          <br />
          {quarter && aTeamData[0] ? aTeamData[quarter.length].pts : 0}
          <br />
          {quarter && aTeamData[0] ? bTeamData[quarter.length].pts : 0}
        </div>
      </div>

      <div>
        {aTeamPlayers ? aTeamPlayers[0][playerAction] : ""}
        <br />
        {bTeamPlayers ? bTeamPlayers[0][playerAction] : ""}
      </div>

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
        <span> {playerActionWord} </span>
        <span> {playerActionWord !== undefined ? " , " : ""} </span>
        <span> {playerActionWord ? playerActionNumber : ""} </span>
      </div>
      <Court3
        setPlayerLocation={setPlayerLocation}
        setPlayerAxis={setPlayerAxis}
        setPlayerActionNumber={setPlayerActionNumber}
        playerAxis={playerAxis}
      />
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
    </>
  );
}

export default App;
