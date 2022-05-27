import { useEffect, useState } from "react";
import { getDocs, collection, doc, db, setDoc } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const days = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "日",
};

const FullPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #e9ecef;
`;

const ContentContainer = styled.div`
  width: 80vw;
  @media (max-width: 1024px) {
    width: 90vw;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  background-color: #f8f9fa;
  padding: 110px 2vw 1vh 2vw;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.5);
`;

const EachGameSetting = styled.div`
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.5);
  align-items: center;
  height: 170px;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
const GameTimeBox = styled.div`
  width: 18vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 150px;
  @media (max-width: 1280px) {
    width: 300px;
  }
  @media (max-width: 414px) {
    width: 110px;
  }
`;

const GameTimeInput = styled.input`
  width: 230px;
  padding: 0px 10px;
  border: 1px solid #adb5bd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 28px;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    padding: 0px 3px;
    font-size: 14px;
    width: 115px;
    height: 25px;
    margin: 5px;
  }
  @media (max-width: 414px) {
    font-size: 12px;
    width: 100px;
    height: 20px;
    margin: 1px;
  }
`;

const TwoTeamDivs = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 1280px) {
    width: 400px;
  }
  @media (max-width: 414px) {
    width: 250px;
  }
`;

const TeamsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 28vw;
  @media (max-width: 1280px) {
    width: 50vw;
  }
  @media (max-width: 768px) {
    width: 60vw;
  }
  @media (max-width: 768px) {
    width: 65vw;
  }
`;

const TeamSelect = styled.select`
  border-radius: 5px;
  border: 1px solid #adb5bd;
  font-size: 24px;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 414px) {
    font-size: 12px;
  }
`;

const LogoBox = styled.div`
  width: 122px;
  height: 122px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    width: 82px;
    height: 82px;
  }
`;

const ForWebDiv = styled.div`
  @media (max-width: 1280px) {
    display: none;
  }
`;

const ForMobileDiv = styled.div`
  display: none;
  @media (max-width: 1280px) {
    display: flex;
  }
`;

const LogoImg = styled.img`
  filter: drop-shadow(-5px 5px 3px rgba(0, 0, 0, 0.5));
  height: ${(props) => (props.teamLogo !== "default" ? "120px" : "100px")};
  width: ${(props) => (props.teamLogo !== "default" ? "120px" : "80px")};
  transform: ${(props) =>
    props.teamLogo !== "default" ? null : "rotate(10deg)"};
  @media (max-width: 1280px) {
    height: ${(props) => (props.teamLogo !== "default" ? "80px" : "80px")};
    width: ${(props) => (props.teamLogo !== "default" ? "80px" : "50px")};
  }
`;

const AddOneMoreGameDiv = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    height: 60px;
  }
  @media (max-width: 414px) {
    height: 40px;
  }
`;

const AddOneMoreGameButton = styled.button`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: #dee2e6;
  color: #212529;
  &:hover {
    color: #f8f9fa;
    background-color: #adb5bd;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
  margin: auto;
  width: 80%;
  font-size: 30px;
  height: 60px;
  border-radius: 10px;
  color: #f8f9fa;
  background-color: #6c757d;
  &:hover {
    background-color: #ced4da;
    color: #212529;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 768px) {
    height: 40px;
    font-size: 24px;
  }
  @media (max-width: 414px) {
    height: 30px;
    font-size: 20px;
  }
`;

const PopupBlur = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 6;
  background-color: rgba(0, 0, 0);
  opacity: 0.5;
`;

const PopupDiv = styled.div`
  width: 500px;
  height: 400px;
  top: 20vh;
  left: calc(50vw - 250px);
  border-radius: 10px;
  box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 0.5);
  &:hover {
    box-shadow: 0px 0px 7px 3px rgba(255, 255, 255, 0.5);
  }
  position: fixed;
  background-color: #495057;
  z-index: 10;
  color: #f8f9fa;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 400px;
    left: calc(50vw - 200px);
    font-size: 28px;
  }
  @media (max-width: 414px) {
    width: 100%;
    left: 0;
    font-size: 20px;
  }
`;

const CheckEachGame = styled.div`
  overflow-y: scroll;
  height: 80%;
  width: 90%;
  padding: 0 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CheckButton = styled.button`
  box-shadow: 0px 0px 3px 2px rgba(255, 255, 255, 0.5);
  margin: 0 auto 1vh;
  width: 35%;
  font-size: 28px;
  height: 60px;
  border-radius: 10px;
  color: #f8f9fa;
  background-color: #6c757d;
  &:hover {
    background-color: #ced4da;
    color: #212529;
    box-shadow: 0px 0px 10px 7px rgba(255, 255, 255, 0.5);
  }
  @media (max-width: 768px) {
    font-size: 20px;
    height: 40px;
  }
  @media (max-width: 414px) {
    font-size: 16px;
  }
`;

const EachGameBlock = styled.div`
  box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, 0.5);
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EachGameBlockTeam = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
`;

const TeamName = styled.div`
  font-size: 24px;
  text-align: center;
  max-width: 140px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 414px) {
    font-size: 16px;
  }
`;

const TeamLogoImg = styled.img`
  max-height: 130px;
  width: 130px;
  filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5));
`;

const EachGameTimeDiv = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    width: 300px;
  }
  @media (max-width: 414px) {
    font-size: 14px;
    width: 250px;
  }
  div {
    font-size: 22px;
    @media (max-width: 768px) {
      font-size: 18px;
    }
    @media (max-width: 414px) {
      font-size: 14px;
    }
  }
`;

function GameArrange() {
  const [date, setDate] = useState([new Date().toISOString().slice(0, 10)]);
  const [day, setDay] = useState([new Date().getDay()]);
  const [time, setTime] = useState([new Date()]);
  const [teams, setTeams] = useState([]);
  const [teamsLogo, setTeamsLogo] = useState({});
  const [winLoss, setWinLoss] = useState([]);
  const [aTeam, setATeam] = useState(["default"]);
  const [aTeamLogo, setATeamLogo] = useState(["default"]);
  const [aTeamWinLoss, setATeamWinLoss] = useState(["default"]);
  const [bTeam, setBTeam] = useState(["default"]);
  const [bTeamLogo, setBTeamLogo] = useState(["default"]);
  const [bTeamWinLoss, setBTeamWinLoss] = useState(["default"]);
  const [numberOfGames, setNumberOfGames] = useState([0]);
  const [checkSetting, setCheckSetting] = useState(false);
  let redirect = useNavigate();
  async function chooseTeam() {
    const querySnapshot = await getDocs(collection(db, "team_data"));
    querySnapshot.forEach((doc) => {
      setTeams((teams) => [...teams, doc.id]);
      setWinLoss((winloss) => ({
        ...winloss,
        [`${doc.id}`]: doc.data().winLoss,
      }));
      setTeamsLogo((pre) => ({
        ...pre,
        [`${doc.id}`]: doc.data().logo,
      }));
    });
  }

  useEffect(() => {
    chooseTeam();
  }, []);

  const addOneMoreGame = function () {
    setATeam((pre) => [...pre, "default"]);
    setATeamLogo((pre) => [...pre, "default"]);
    setATeamWinLoss((pre) => [...pre, "default"]);
    setBTeam((pre) => [...pre, "default"]);
    setBTeamLogo((pre) => [...pre, "default"]);
    setBTeamWinLoss((pre) => [...pre, "default"]);
    setDate((pre) => [...pre, new Date().toISOString().slice(0, 10)]);
    setDay((pre) => [...pre, new Date().getDay()]);
    setTime((pre) => [...pre, new Date()]);
    setNumberOfGames((pre) => [...pre, numberOfGames.length]);
  };

  const sendGameSchedule = async function () {
    for (let i = 0; i < numberOfGames.length; i++) {
      let gameId = `${date[i]}_${aTeam[i]}_${bTeam[i]}`;
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
          aTeam_winloss: aTeamWinLoss[i],
          bTeam_score: 0,
          bTeam_winloss: bTeamWinLoss[i],
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
      <FullPageContainer>
        <ContentContainer>
          {numberOfGames.map((num) => (
            <EachGameSetting key={num}>
              <GameTimeBox>
                <GameTimeInput
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

                <GameTimeInput
                  type="time"
                  onChange={(e) => {
                    let a = [...time];
                    a[num] = e.target.value;
                    setTime(a);
                  }}
                />
              </GameTimeBox>
              <TwoTeamDivs>
                <TeamsBox>
                  <TeamSelect
                    value={aTeam[num]}
                    onChange={(e) => {
                      let a = [...aTeam];
                      a[num] = e.target.value;
                      setATeam(a);
                      let b = [...aTeamLogo];
                      b[num] = teamsLogo[e.target.value];
                      setATeamLogo(b);
                      let c = [...aTeamWinLoss];
                      c[num] = winLoss[e.target.value];
                      setATeamWinLoss(c);
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
                  </TeamSelect>

                  <LogoBox>
                    <LogoImg
                      teamLogo={aTeamLogo[num]}
                      src={
                        aTeamLogo[num] !== "default"
                          ? aTeamLogo[num]
                          : require("../../img/flag/flagG.png")
                      }
                    />
                  </LogoBox>
                </TeamsBox>
                <TeamsBox>
                  <ForWebDiv>
                    <LogoBox>
                      <LogoImg
                        teamLogo={bTeamLogo[num]}
                        src={
                          bTeamLogo[num] !== "default"
                            ? bTeamLogo[num]
                            : require("../../img/flag/flagG.png")
                        }
                      />
                    </LogoBox>
                  </ForWebDiv>
                  <TeamSelect
                    value={bTeam[num]}
                    onChange={(e) => {
                      let b = [...bTeam];
                      b[num] = e.target.value;
                      setBTeam(b);
                      let a = [...bTeamLogo];
                      a[num] = teamsLogo[e.target.value];
                      setBTeamLogo(a);
                      let c = [...bTeamWinLoss];
                      c[num] = winLoss[e.target.value];
                      setBTeamWinLoss(c);
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
                  </TeamSelect>
                  <ForMobileDiv>
                    <LogoBox>
                      <LogoImg
                        teamLogo={bTeamLogo[num]}
                        src={
                          bTeamLogo[num] !== "default"
                            ? bTeamLogo[num]
                            : require("../../img/flag/flagG.png")
                        }
                      />
                    </LogoBox>
                  </ForMobileDiv>
                </TeamsBox>
              </TwoTeamDivs>
            </EachGameSetting>
          ))}
          <AddOneMoreGameDiv>
            <AddOneMoreGameButton onClick={addOneMoreGame}>
              <i className="fa-solid fa-plus" style={{ fontSize: "30px" }}></i>
            </AddOneMoreGameButton>
          </AddOneMoreGameDiv>

          <ButtonContainer>
            <SubmitButton onClick={() => setCheckSetting(true)}>
              Submit
            </SubmitButton>
          </ButtonContainer>

          {checkSetting ? (
            <>
              <PopupBlur onClick={() => setCheckSetting(false)} />
              <PopupDiv>
                <CheckEachGame>
                  {numberOfGames.map((num) => (
                    <EachGameBlock key={num}>
                      <EachGameBlockTeam>
                        <TeamName>{aTeam[num]}</TeamName>
                        <TeamLogoImg src={aTeamLogo[num]} />
                      </EachGameBlockTeam>
                      <EachGameTimeDiv>
                        <div>{date[num]}</div>
                        <div>
                          星期{days[day[num]]} {time[num]}
                        </div>
                      </EachGameTimeDiv>
                      <EachGameBlockTeam>
                        <TeamName>{bTeam[num]}</TeamName>
                        <TeamLogoImg src={bTeamLogo[num]} />
                      </EachGameBlockTeam>
                    </EachGameBlock>
                  ))}
                </CheckEachGame>

                <CheckButton onClick={() => setCheckSetting(false)}>
                  取消
                </CheckButton>
                <CheckButton
                  onClick={() => {
                    setCheckSetting(true);
                    sendGameSchedule();
                  }}
                >
                  確認無誤
                </CheckButton>
              </PopupDiv>
            </>
          ) : null}
        </ContentContainer>
      </FullPageContainer>
    </>
  );
}

export default GameArrange;
