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
  PopupBlur,
} from "../utils/StyleComponent";
const days = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "日",
};

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
    redirect("/");
  };

  return (
    <>
      <GeneralDiv
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        backgroundColor="#e9ecef"
      >
        <GeneralDiv
          width="80vw"
          backgroundColor="#f8f9fa"
          padding="0 2vw 1vh 2vw"
          boxShadow="0px 0px 7px 3px rgba(0, 0, 0, 0.5);"
        >
          <GeneralDiv width="80vw" height="100px" marginBottom="2vh" />
          {numberOfGames.map((num, index) => (
            <GeneralDiv
              display="flex"
              justifyConten="cneter"
              boxShadow="0px 0px 10px 2px rgba(0, 0, 0, 0.5);"
              alignItems="center"
              height="170px"
              borderRadius="10px"
              padding="0 10px"
              marginBottom="15px"
              key={num}
            >
              <GeneralDiv
                width="18vw"
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
                height="150px"
              >
                <GeneralInput
                  width="230px"
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
                  width="230px"
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
                width="28vw"
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
                    b[num] = teamsLogo[e.target.value];
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
                  width="122px"
                  height="122px"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <GeneralImg
                    filter="drop-shadow(-5px 5px 3px rgba(0, 0, 0, 0.5))"
                    height={aTeamLogo[num] !== "default" ? "120px" : "100px"}
                    rotate={
                      aTeamLogo[num] !== "default" ? null : "rotate(10deg)"
                    }
                    width={aTeamLogo[num] !== "default" ? "120px" : "80px"}
                    src={
                      aTeamLogo[num] !== "default"
                        ? aTeamLogo[num]
                        : require("../img/flag/flagG.png")
                    }
                  />
                </GeneralDiv>
              </GeneralDiv>
              <GeneralDiv
                display="flex"
                alignItems="center"
                // border="1px solid #e9ecef"
                width="28vw"
                justifyContent="space-around"
              >
                <GeneralDiv
                  width="122px"
                  height="122px"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <GeneralImg
                    filter="drop-shadow(-5px 5px 3px rgba(0, 0, 0, 0.5))"
                    height={bTeamLogo[num] !== "default" ? "120px" : "100px"}
                    rotate={
                      bTeamLogo[num] !== "default" ? null : "rotate(10deg)"
                    }
                    width={bTeamLogo[num] !== "default" ? "120px" : "80px"}
                    src={
                      bTeamLogo[num] !== "default"
                        ? bTeamLogo[num]
                        : require("../img/flag/flagG.png")
                    }
                  />
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
            boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.5);"
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
              boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.5);"
              hoverBoxShadow="0px 0px 5px 5px rgba(0, 0, 0, 0.5);"
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
            <>
              <PopupBlur
                top="0"
                left="0"
                onClick={() => setCheckSetting(false)}
              />
              <PopupDiv
                width="41vw"
                height="45vh"
                top="20vh"
                left="30vw"
                borderRadius="10px"
                boxShadow="0px 0px 3px 1px rgba(255, 255, 255, 0.5)"
                hoverBoxShadow="0px 0px 7px 3px rgba(255, 255, 255, 0.5)"
              >
                <GeneralDiv
                  marginTop="2vh"
                  overflowY="scroll"
                  height="32vh"
                  width="40vw"
                  display="flex"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  {numberOfGames.map((num) => (
                    <GeneralDiv
                      boxShadow="0px 0px 5px 1px rgba(255, 255, 255, 0.5);"
                      padding="10px"
                      margin="10px 0"
                      width="35vw"
                      borderRadius="10px"
                      marginBottom="10px"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      key={num}
                    >
                      <GeneralDiv
                        display="flex"
                        alignItems="flex-end"
                        flexWrap="wrap"
                        justifyContent="center"
                        height="100%"
                      >
                        <GeneralDiv
                          fontSize="24px"
                          textAlign="center"
                          maxWidth="140px"
                        >
                          {aTeam[num]}
                        </GeneralDiv>
                        <div>
                          <GeneralDiv
                            width="132px"
                            height="132px"
                            borderRadius="10px"
                          >
                            <GeneralImg
                              height="130px"
                              widht="130px"
                              src={aTeamLogo[num]}
                              filter="drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))"
                            />
                          </GeneralDiv>
                        </div>
                      </GeneralDiv>
                      <GeneralDiv
                        margin="0 auto"
                        display="flex"
                        alignItems="flex-end"
                        flexWrap="wrap"
                        justifyContent="center"
                      >
                        <GeneralDiv fontSize="22px">{date[num]}</GeneralDiv>
                        <GeneralDiv fontSize="22px">
                          星期{days[day[num]]} {time[num]}
                        </GeneralDiv>
                        <div></div>
                      </GeneralDiv>
                      <GeneralDiv
                        display="flex"
                        alignItems="flex-end"
                        flexWrap="wrap"
                        justifyContent="center"
                        height="100%"
                      >
                        <GeneralDiv
                          fontSize="24px"
                          textAlign="center"
                          maxWidth="140px"
                        >
                          {bTeam[num]}
                        </GeneralDiv>
                        <GeneralDiv
                          width="132px"
                          height="132px"
                          borderRadius="10px"
                        >
                          <GeneralImg
                            height="130px"
                            widht="130px"
                            src={bTeamLogo[num]}
                            filter="drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))"
                          />
                        </GeneralDiv>
                      </GeneralDiv>
                    </GeneralDiv>
                  ))}
                </GeneralDiv>

                <GeneralButton
                  boxShadow="0px 0px 3px 2px rgba(255, 255, 255, 0.5);"
                  hoverBoxShadow="0px 0px 10px 7px rgba(255, 255, 255, 0.5);"
                  margin="0 auto 1vh"
                  width="35%"
                  fontSize="28px"
                  height="60px"
                  borderRadius="10px"
                  color="#f8f9fa"
                  backgroundColor="#6c757d"
                  hoverBackgroundColor="#ced4da"
                  hoverColor="#212529"
                  onClick={() => setCheckSetting(false)}
                >
                  取消
                </GeneralButton>
                <GeneralButton
                  boxShadow="0px 0px 6px 3px rgba(255, 255, 255, 0.5);"
                  hoverBoxShadow="0px 0px 15px 10px rgba(255, 255, 255, 0.5);"
                  margin="0 auto 1vh"
                  width="35%"
                  fontSize="28px"
                  height="60px"
                  borderRadius="10px"
                  color="#f8f9fa"
                  backgroundColor="#6c757d"
                  hoverBackgroundColor="#ced4da"
                  hoverColor="#212529"
                  onClick={() => {
                    setCheckSetting(true);
                    sendGameSchedule();
                  }}
                >
                  確認無誤
                </GeneralButton>
              </PopupDiv>
            </>
          ) : null}
        </GeneralDiv>
      </GeneralDiv>
    </>
  );
}

export default GameArrange;
