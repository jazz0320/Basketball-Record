import { useEffect, useState } from "react";
import { getDocs, collection, doc, db, setDoc } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import {
  GeneralDiv,
  GeneralInput,
  GeneralButton,
  GeneralImg,
  GeneralSelect,
  PopupDiv,
} from "../utils/StyleComponent";
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
          gameStatus: "coming",
        },
        { merge: true }
      );
    }
    redirect("/profile");
  };

  return (
    <>
      {numberOfGames.map((num, index) => (
        <GeneralDiv
          display="flex"
          justifyConten="cneter"
          border="#495057 1px solid"
          alignItems="center"
          height="170px"
          borderRadius="10px"
          padding="0 40px"
          marginBottom="15px"
          key={index}
        >
          <GeneralDiv
            width="24vw"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            height="150px"
          >
            <GeneralInput
              padding="2px 10px"
              border="1px solid #adb5bd"
              borderRadius="10px"
              cursor="pointer"
              fontSize="28px"
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

            <GeneralInput
              padding="2px 10px"
              border="1px solid #adb5bd"
              borderRadius="10px"
              cursor="pointer"
              fontSize="28px"
              type="time"
              onChange={(e) => {
                let a = [...time];
                a[num] = e.target.value;
                setTime(a);
              }}
            />
          </GeneralDiv>
          <GeneralDiv
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            width="25vw"
            // border="1px solid #e9ecef"
          >
            <GeneralSelect
              borderRadius="5px"
              border="1px solid #adb5bd"
              fontSize="24px"
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
            </GeneralSelect>

            <GeneralDiv
              width="132px"
              height="132px"
              border="1px solid #adb5bd"
              borderRadius="10px"
            >
              {aTeamLogo[num] !== "default" ? (
                <GeneralImg height="130px" widht="130px" src={aTeamLogo[num]} />
              ) : (
                <GeneralImg
                  height="130px"
                  widht="130px"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2F%3F.png?alt=media&token=ba57199a-119e-4121-a76e-2f6fdf93466f"
                  }
                />
              )}
            </GeneralDiv>
          </GeneralDiv>
          <GeneralDiv
            display="flex"
            alignItems="center"
            // border="1px solid #e9ecef"
            width="25vw"
            justifyContent="space-around"
          >
            <GeneralDiv
              width="132px"
              height="132px"
              border="1px solid #adb5bd"
              borderRadius="10px"
            >
              {bTeamLogo[num] !== "default" ? (
                <GeneralImg height="130px" widht="130px" src={bTeamLogo[num]} />
              ) : (
                <GeneralImg
                  height="130px"
                  widht="130px"
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2F%3F.png?alt=media&token=ba57199a-119e-4121-a76e-2f6fdf93466f"
                  }
                />
              )}
            </GeneralDiv>
            <GeneralSelect
              borderRadius="5px"
              border="1px solid #adb5bd"
              fontSize="24px"
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
            </GeneralSelect>
          </GeneralDiv>
        </GeneralDiv>
      ))}
      <GeneralDiv
        display="flex"
        alignItems="center"
        height="80px"
        borderRadius="10px"
        marginBottom="15px"
      >
        <GeneralButton
          width="100%"
          height="100%"
          borderRadius="10px"
          hoverColor="#f8f9fa"
          hoverBackgroundColor="#adb5bd"
          backgroundColor="#dee2e6"
          color="#212529"
          onClick={addOneMoreGame}
        >
          <i className="fa-solid fa-plus" style={{ fontSize: "30px" }}></i>
        </GeneralButton>
      </GeneralDiv>

      <GeneralDiv
        display="flex"
        alignItems="center"
        height="80px"
        marginBottom="15px"
      >
        <GeneralButton
          margin="auto"
          width="80%"
          fontSize="30px"
          height="60px"
          borderRadius="10px"
          color="#f8f9fa"
          backgroundColor="#6c757d"
          hoverBackgroundColor="#ced4da"
          hoverColor="#212529"
          onClick={() => setCheckSetting(true)}
        >
          Submit
        </GeneralButton>
      </GeneralDiv>

      {checkSetting ? (
        <PopupDiv width="41vw" height="45vh">
          <GeneralDiv
            marginTop="2vh"
            overflowY="scroll"
            height="30vh"
            width="40vw"
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            {numberOfGames.map((num) => (
              <GeneralDiv
                border="1px solid #dee2e6"
                padding="10px"
                width="35vw"
                borderRadius="10px"
                marginBottom="10px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                key={num}
              >
                <div>
                  <GeneralDiv fontSize="24px" textAlign="center">
                    {aTeam[num]}
                  </GeneralDiv>
                  <div>
                    <GeneralDiv
                      width="132px"
                      height="132px"
                      border="1px solid #adb5bd"
                      borderRadius="10px"
                    >
                      <GeneralImg
                        height="130px"
                        widht="130px"
                        src={aTeamLogo[num]}
                      />
                    </GeneralDiv>
                  </div>
                </div>
                <GeneralDiv margin="0 auto">
                  <GeneralDiv fontSize="22px">{date[num]}</GeneralDiv>
                  <GeneralDiv fontSize="22px">
                    星期{day[num]} {time[num]}
                  </GeneralDiv>
                  <div></div>
                </GeneralDiv>
                <div>
                  <GeneralDiv fontSize="24px" textAlign="center">
                    {bTeam[num]}
                  </GeneralDiv>
                  <GeneralDiv
                    width="132px"
                    height="132px"
                    border="1px solid #adb5bd"
                    borderRadius="10px"
                  >
                    <GeneralImg
                      height="130px"
                      widht="130px"
                      src={bTeamLogo[num]}
                    />
                  </GeneralDiv>
                </div>
              </GeneralDiv>
            ))}
          </GeneralDiv>
          <GeneralButton
            margin="0 auto 1vh"
            width="35%"
            fontSize="28px"
            height="60px"
            borderRadius="10px"
            color="#f8f9fa"
            backgroundColor="#6c757d"
            hoverBackgroundColor="#ced4da"
            hoverColor="#212529"
            onClick={() => setCheckSetting(true)}
            onClick={sendGameSchedule}
          >
            確認無誤
          </GeneralButton>
          <GeneralButton
            margin="0 auto 1vh"
            width="35%"
            fontSize="28px"
            height="60px"
            borderRadius="10px"
            color="#f8f9fa"
            backgroundColor="#6c757d"
            hoverBackgroundColor="#ced4da"
            hoverColor="#212529"
            onClick={() => setCheckSetting(true)}
            onClick={() => setCheckSetting(false)}
          >
            取消
          </GeneralButton>
        </PopupDiv>
      ) : null}
    </>
  );
}

export default GameArrange;
