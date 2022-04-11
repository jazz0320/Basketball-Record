import { useEffect, useState, useRef } from "react";
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

function App() {
  const [teams, setTeams] = useState([]);
  const [aTeam, setATeam] = useState();
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [bTeam, setBTeam] = useState();
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const [system, setSystem] = useState();
  const [eachTime, setEachTime] = useState();
  const [stopTime, setStopTime] = useState();
  const [finishSetting, setFinishSetting] = useState(false);
  const [pause, setPause] = useState(true);

  function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
  }
  const canvas = document.querySelector("canvas");
  canvas.addEventListener("mousedown", function (e) {
    getCursorPosition(canvas, e);
  });

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
    if (aTeam) {
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
    if (bTeam) {
      selectTeam();
    }
  }, [bTeam]);

  const finishGameSetting = function () {
    let teamData = [];
    for (let i = 1; i <= system; i++) {
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
          quarter: Number(system),
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

  return (
    <>
      <div>
        A隊
        <select onChange={(e) => setATeam(e.target.value)}>
          <option>Select team</option>
          {teams.map((team, index) => (
            <option key={index}>{team}</option>
          ))}
        </select>
        B隊
        <select onChange={(e) => setBTeam(e.target.value)}>
          <option>Select team</option>
          {teams.map((team, index) => (
            <option key={index}>{team}</option>
          ))}
        </select>
        賽制
        <select onChange={(e) => setSystem(e.target.value)}>
          <option value={4}>4 quarter</option>
          <option value={2}>2 half</option>
        </select>
        <select onChange={(e) => setEachTime(e.target.value)}>
          <option value={10}>10 mins</option>
          <option value={12}>12 mins</option>
        </select>
        <select onChange={(e) => setStopTime(e.target.value)}>
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
            <Clock finishSetting={finishSetting} eachTime={eachTime} />
          </div>
          <button>Start</button>
          <button>Start</button>
        </div>
      </div>
      <div>OnTheGround</div>
    </>
  );
}

export default App;
