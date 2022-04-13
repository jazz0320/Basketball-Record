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
import RecordRoom from "./RecordRoom";

function App() {
  const [teams, setTeams] = useState([]);
  const [aTeam, setATeam] = useState("default");
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [bTeam, setBTeam] = useState("default");
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const [quarter, setQuarter] = useState(); //選擇賽制
  const [eachTime, setEachTime] = useState();
  const [stopTime, setStopTime] = useState();
  const [finishSetting, setFinishSetting] = useState(false);
  const [quarterNow, setQuarterNow] = useState(1);
  const five = [1, 2, 3, 4, 5];

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
  }

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
    let teamData = [];
    for (let i = 1; i <= quarter; i++) {
      let x = {
        ast: 0,
        fouls: 0,
        pts: 0,
        quarter: i,
        reb: 0,
      };
      teamData.push(x);
    }

    async function systemSetting() {
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          quarter: quarter,
          quarterNow: quarterNow,
          quarter_minutes: Number(eachTime),
          stop_ime: stopTime,
          A_team_data: teamData,
          B_team_data: teamData,
        },
        { merge: true }
      );
    }
    systemSetting();
    setFinishSetting(true);
  };

  const selectStartFive = function (player, position) {
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
    } else {
      setBTeamPlayers(players);
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
            setQuarter(quarters);
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
            />
          </div>
        </div>
      </div>
      <div>OnTheGround</div>
      <div style={{ display: "flex" }}>
        {aTeamPlayers &&
          aTeamPlayers.map((player, index) => (
            <span key={index}>
              <div
                style={{
                  backgroundSize: "cover",
                  height: "100px",
                  width: "130px",
                  backgroundImage: `url(${player.pic})`,
                }}
              ></div>
              {player.name}
            </span>
          ))}
      </div>
      <canvas
        onClick={(e) => {
          console.log(e.target);
          getCursorPosition(e.target, e);
        }}
      >
        1111
      </canvas>
      <div style={{ display: "flex" }}>
        {bTeamPlayers &&
          bTeamPlayers.map((player, index) => (
            <span key={index}>
              <div
                style={{
                  backgroundSize: "cover",
                  height: "100px",
                  width: "130px",
                  backgroundImage: `url(${player.pic})`,
                }}
              ></div>
              {player.name}
            </span>
          ))}
      </div>
      <div>
        <RecordRoom quarter={quarter} quarteNow={quarterNow} />
      </div>
    </>
  );
}

export default App;
