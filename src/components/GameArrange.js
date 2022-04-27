import { useEffect, useState, useReducer, useRef } from "react";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  db,
  setDoc,
} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
function GameArrange() {
  const [date, setDate] = useState([new Date().toISOString().slice(0, 10)]);
  const [day, setDay] = useState([new Date().getDay()]);
  const [time, setTime] = useState([new Date()]);
  const [teams, setTeams] = useState([]);
  const [teamsLogo, setTeamsLogo] = useState({});
  const [aTeam, setATeam] = useState(["default"]);
  const [aTeamLogo, setATeamLogo] = useState(["default"]);
  const [bTeam, setBTeam] = useState(["default"]);
  const [bTeamLogo, setBTeamLogo] = useState(["default"]);
  const [numberOfGames, setNumberOfGames] = useState([0]);
  const [checkSetting, setCheckSetting] = useState(false);
  let redirect = useNavigate();
  async function chooseTeam() {
    const querySnapshot = await getDocs(collection(db, "team_data"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      setTeams((teams) => [...teams, doc.id]);
      setTeamsLogo((pre) => ({
        ...pre,
        [`${doc.id}`]: doc.data().logo,
      }));
      //   let a = teamsLogo;
      //   console.log("iteration a", a);
      //   console.log("id", doc.id);
      //   console.log("logo", doc.data().logo);
      //   a[doc.id] = doc.data().logo;
      //   setTeamsLogo(a);
    });
  }

  useEffect(() => {
    chooseTeam();
  }, []);

  const addOneMoreGame = function () {
    setATeam((pre) => [...pre, "default"]);
    setATeamLogo((pre) => [...pre, "default"]);
    setBTeam((pre) => [...pre, "default"]);
    setBTeamLogo((pre) => [...pre, "default"]);
    setDate((pre) => [...pre, new Date().toISOString().slice(0, 10)]);
    setDay((pre) => [...pre, new Date().getDay()]);
    setTime((pre) => [...pre, new Date()]);
    setNumberOfGames((pre) => [...pre, numberOfGames.length]);
  };

  const sendGameSchedule = async function () {
    for (let i = 0; i < numberOfGames.length; i++) {
      let gameId = `${date[i]}_${aTeam[i]}_${bTeam[i]}`;
      console.log("id", gameId);
      await setDoc(
        doc(db, "team_data", aTeam[i], "game_schedule", gameId),
        {
          opponent: bTeam[i],
          opponentLogo: bTeamLogo[i],
          time_date: date[i],
          time_day: day[i],
          time_time: time[i],
          end: false,
        },
        { merge: true }
      );
      await setDoc(
        doc(db, "team_data", bTeam[i], "game_schedule", gameId),
        {
          opponent: aTeam[i],
          opponentLogo: aTeamLogo[i],
          time_date: date[i],
          time_day: day[i],
          time_time: time[i],
          end: false,
        },
        { merge: true }
      );
      await setDoc(
        doc(db, "game_schedule", gameId),
        {
          aTeam: aTeam[i],
          aTeamLogo: aTeamLogo[i],
          bTeam: bTeam[i],
          bTeamLogo: bTeamLogo[i],
          time_date: date[i],
          time_day: day[i],
          time_time: time[i],
          end: false,
          aTeam_score: 0,
          aTeam_winloss: [0, 0],
          bTeam_score: 0,
          bTeam_winloss: [0, 0],
          whoWin: "default",
        },
        { merge: true }
      );
    }
    redirect("/profile");
  };

  return (
    <>
      {numberOfGames.map((num, index) => (
        <div key={index}>
          <input
            type="date"
            value={date[num]}
            onChange={(e) => {
              let a = [...date];
              a[num] = e.target.value;
              setDate(a);
              let b = [...day];
              b[num] = new Date(e.target.value).getDay();
              setDay(b);
            }}
          />
          <input
            type="time"
            onChange={(e) => {
              let a = [...time];
              a[num] = e.target.value;
              setTime(a);
            }}
          />
          A隊
          <select
            value={aTeam[num]}
            onChange={(e) => {
              let a = [...aTeam];
              a[num] = e.target.value;
              setATeam(a);
              let b = [...aTeamLogo];
              console.log("bbbb", b);
              b[num] = teamsLogo[e.target.value];
              console.log("logos", teamsLogo);
              console.log("bbbbccc", teamsLogo[e.target.value]);
              setATeamLogo(b);
            }}
          >
            <option disabled value="default">
              Select team
            </option>
            {teams.map((team, index) =>
              team === bTeam[num] ? (
                <option disabled key={index}>
                  {team}
                </option>
              ) : (
                <option key={index}>{team}</option>
              )
            )}
          </select>
          B隊
          <select
            value={bTeam[num]}
            onChange={(e) => {
              let b = [...bTeam];
              b[num] = e.target.value;
              setBTeam(b);
              let a = [...bTeamLogo];
              a[num] = teamsLogo[e.target.value];
              setBTeamLogo(a);
            }}
          >
            <option disabled value="default">
              Select team
            </option>
            {teams.map((team, index) =>
              team === aTeam[num] ? (
                <option disabled key={index}>
                  {team}
                </option>
              ) : (
                <option key={index}>{team}</option>
              )
            )}
          </select>
        </div>
      ))}
      <button onClick={addOneMoreGame}>＋</button>
      <button onClick={() => setCheckSetting(true)}>送出</button>

      {checkSetting ? (
        <div>
          {numberOfGames.map((num) => (
            <div key={num}>
              <div>A隊{aTeam[num]}</div>
              <div>
                <img src={aTeamLogo[num]} />
              </div>
              <div>B隊{bTeam[num]}</div>
              <div>
                <img src={bTeamLogo[num]} />
              </div>
              <div>幾號{date[num]}</div>
              <div>星期幾{day[num]}</div>
              <div>幾點{time[num]}</div>
            </div>
          ))}
          <button onClick={sendGameSchedule}>確認無誤</button>
          <button onClick={() => setCheckSetting(false)}>取消</button>
        </div>
      ) : null}
    </>
  );
}

export default GameArrange;
