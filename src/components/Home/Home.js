import PropTypes from "prop-types";
import { getDoc, doc, getDocs, collection, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import HomeGrade from "./HomeGrade";
import PlayerGrade from "./PlayerGrade";

const CenterDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

const FullPageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #e9ecef;
`;

const ContentContainer = styled.div`
  width: 80vw;
  background-color: #f8f9fa;
  padding: 0.5vh 1vw 3vh 1vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 0px 0px 3px 5px rgba(0, 0, 0, 0.3); ;
`;
const PlayerTeamContainer = styled.div`
  width: 76vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Home() {
  const [gameList, setGameList] = useState([]);
  const [gameListName, setGameListName] = useState([]);
  const [gameTime, setGameTime] = useState([]);
  const [gameTimeCount, setGameTimeCount] = useState({});
  const [weekday, setWeekday] = useState({});
  const [teamGrade, setTeamGrade] = useState([]);
  const [playerGrade, setPlayerGrade] = useState([]);
  let comingGame = [];
  async function loadSchedule() {
    setGameList([]);
    const querySnapshot = await getDocs(collection(db, "game_schedule"));
    querySnapshot.forEach((doc) => {
      if (doc.data().gameStatus === "coming") {
        comingGame.push(doc.id);
      }
      setGameListName((pre) => [...pre, doc.id]);
      setGameList((pre) => [...pre, { [`${doc.id}`]: doc.data() }]);
      setWeekday((pre) => ({
        ...pre,
        [`${doc.id.slice(0, 10)}`]: doc.data().time_day,
      }));
    });
  }

  const getTeamData = async function () {
    let order = [];
    const querySnapshot = await getDocs(collection(db, "team_data"));
    querySnapshot.forEach((doc) => {
      let a = teamGrade;
      let b = doc.data().winLoss;
      let c = b[0] - b[1];
      b.push(c);
      let big = order.filter((item) => item > c);
      let d = { [`${doc.id}`]: { grade: b, logo: doc.data().logo } };
      a.splice(big.length, 0, d);
      setTeamGrade([...a]);
      order.push(c);
    });

    querySnapshot.forEach((doc) => {
      let players = doc
        .data()
        .players.map((player) => ({ ...player, team: doc.id }));
      setPlayerGrade((pre) => [...pre, ...players]);
    });
  };

  useEffect(() => {
    loadSchedule();
    getTeamData();
  }, []);

  useEffect(() => {
    let a = gameListName.map((game) => game.slice(0, 10));
    let count = {};
    for (let i = 0; i < a.length; i++) {
      let num = a[i];
      count[num] = count[num] ? count[num] + 1 : 1;
    }
    setGameTimeCount(count);
    let uniqueArr = [...new Set(a)];
    setGameTime(uniqueArr);
  }, [gameListName]);

  return (
    <>
      <FullPageContainer>
        <ContentContainer>
          <CarousellContainer>
            {gameTime?.map((time) => (
              <CenterDiv key={time}>
                <TimeBox
                  gameTimeCount={gameTimeCount[time]}
                  time={time}
                  weekday={weekday[time]}
                />

                {gameList?.map((game) =>
                  Object.keys(game)[0].slice(0, 10) === time ? (
                    <div key={Object.keys(game)}>
                      {game[Object.keys(game)[0]].gameStatus === "coming" ? (
                        <BoxComing data={game[Object.keys(game)[0]]} />
                      ) : game[Object.keys(game)[0]].gameStatus === "live" ? (
                        <Link
                          to={`live-now/${Object.keys(game)[0]}`}
                          key={game}
                        >
                          <BoxEnd data={game[Object.keys(game)[0]]} />
                        </Link>
                      ) : (
                        <Link
                          to={`past-game/${Object.keys(game)[0]}`}
                          key={game}
                        >
                          <BoxEnd data={game[Object.keys(game)[0]]} />
                        </Link>
                      )}
                    </div>
                  ) : null
                )}
              </CenterDiv>
            ))}
          </CarousellContainer>
          <PlayerTeamContainer>
            <PlayerGrade playerGrade={playerGrade} />
            <HomeGrade teamGrade={teamGrade} />
          </PlayerTeamContainer>
        </ContentContainer>
      </FullPageContainer>
    </>
  );
}

export default Home;

const CarousellContainer = styled.div`
  margin: 105px 1vw 3vh 0vw;
  height: 250px;
  width: 80vw;
  padding: 10px;
  display: inline-flex;
  overflow: scroll;
  color: #495057;
  ::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const GameContainerL1 = styled.div`
  cursor: pointer;
  border-radius: 5px;
  height: 220px;
  width: 256px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ced4da;
  box-shadow: -5px 5px 3px rgba(0, 0, 0, 0.2);
`;

const GameContainerL2 = styled.div`
  width: 234px;
  height: 80px;
  font-size: 19px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  :first-child {
    height: 40px;
  }
`;

const LogoDiv = styled.div`
  height: 80px;
  width: 80px;
  background-size: contain;
  background-image: url(${(props) => props.img});
  margin-right: 10px;
`;

const TeamDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80px;
  width: 75px;
  font-size: 16px;
  div {
    text-align: center;
    justify-content: center;
  }
`;

const ScoreBox = styled.div`
  margin: auto;
  font-size: 24px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
`;

const TeamLogoImg = styled.img`
  height: 80px;
  width: 80px;
  filter: drop-shadow(-10px 5px 3px rgba(0, 0, 0, 0.3));
`;

const TeamName = styled.div`
  line-height: 15px;
  color: black;
`;

const GameStatus = styled.div`
  color: black;
  font-weight: 500;
`;

function BoxEnd(props) {
  const [aTeamWinloss, setATeamWinloss] = useState([]);
  const [bTeamWinloss, setBTeamWinloss] = useState([]);
  useEffect(() => {
    const getTeamGrade = async function () {
      const docSnap = await getDoc(doc(db, "team_data", props.data.aTeam));
      let aTeamGrade = docSnap.data().winLoss;
      setATeamWinloss(aTeamGrade);
      const docSnap2 = await getDoc(doc(db, "team_data", props.data.bTeam));
      let bTeamGrade = docSnap2.data().winLoss;
      setBTeamWinloss(bTeamGrade);
    };
    getTeamGrade();
  }, []);

  return (
    <GameContainerL1>
      <GameContainerL2>
        <span>時間：{props.data.time_time}</span>
        {props.data.gameStatus === "live" ? (
          <GameStatus
            css={`
              color: red;
              font-weight: 800;
            `}
          >
            live now
          </GameStatus>
        ) : (
          <GameStatus>end</GameStatus>
        )}
      </GameContainerL2>
      <GameContainerL2>
        <LogoDiv>
          <TeamLogoImg src={props.data.aTeamLogo} />
        </LogoDiv>
        <TeamDiv>
          <TeamName>{props.data.aTeam}</TeamName>
          <div
            css={`
              line-height: 20px;
            `}
          >
            {aTeamWinloss[0]}-{aTeamWinloss[1]}
          </div>
        </TeamDiv>
        <ScoreBox>{props.data.aTeam_score}</ScoreBox>
      </GameContainerL2>
      <GameContainerL2>
        <LogoDiv>
          <TeamLogoImg src={props.data.bTeamLogo} />
        </LogoDiv>
        <TeamDiv>
          <TeamName>{props.data.bTeam}</TeamName>
          <div
            css={`
              line-height: 20px;
            `}
          >
            {bTeamWinloss[0]}-{bTeamWinloss[1]}
          </div>
        </TeamDiv>
        <ScoreBox>{props.data.bTeam_score}</ScoreBox>
      </GameContainerL2>
    </GameContainerL1>
  );
}

const GameContainerL2forComing = styled.div`
  width: 100px;
  height: 150px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  :nth-child(3) {
    width: 30px;
  }
`;

function BoxComing(props) {
  const [aTeamWinloss, setATeamWinloss] = useState([]);
  const [bTeamWinloss, setBTeamWinloss] = useState([]);
  useEffect(() => {
    const getTeamGrade = async function () {
      const docSnap = await getDoc(doc(db, "team_data", props.data.aTeam));
      let aTeamGrade = docSnap.data().winLoss;
      setATeamWinloss(aTeamGrade);
      const docSnap2 = await getDoc(doc(db, "team_data", props.data.bTeam));
      let bTeamGrade = docSnap2.data().winLoss;
      setBTeamWinloss(bTeamGrade);
    };
    getTeamGrade();
  }, []);
  return (
    <GameContainerL1 onClick={() => alert("比賽即將開始，敬請期待")}>
      <GameContainerL2>
        <span>時間：{props.data.time_time}</span>
        <GameStatus>coming soon</GameStatus>
      </GameContainerL2>
      <GameContainerL2forComing>
        <LogoDiv>
          <TeamLogoImg src={props.data.aTeamLogo} />
        </LogoDiv>
        <TeamDiv>
          <TeamName>{props.data.aTeam}</TeamName>
          <div>
            {aTeamWinloss[0]}-{aTeamWinloss[1]}
          </div>
        </TeamDiv>
      </GameContainerL2forComing>
      <GameContainerL2forComing>
        <div
          css={`
            line-height: 100px;
          `}
        >
          VS
        </div>
      </GameContainerL2forComing>
      <GameContainerL2forComing>
        <LogoDiv>
          <TeamLogoImg src={props.data.bTeamLogo} />
        </LogoDiv>
        <TeamDiv>
          <TeamName>{props.data.bTeam}</TeamName>
          <div>
            {bTeamWinloss[0]}-{bTeamWinloss[1]}
          </div>
        </TeamDiv>
      </GameContainerL2forComing>
    </GameContainerL1>
  );
}

const TimeContainer = styled.div`
  box-shadow: -8px 8px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 235px;
  width: 100px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background-color: #343a40;
  div {
    color: white;
    margin-top: 50px;
    font-size: 18px;
    width: 100px;
    text-align: center;
  }
`;

function TimeBox(props) {
  const [timeDate, setTimeDate] = useState([]);
  useEffect(() => {
    let time = props.time.split("-");
    setTimeDate(time);
  }, []);

  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const days = {
    "01": "MON",
    "02": "TUE",
    "03": "WED",
    "04": "THU",
    "05": "FRI",
    "06": "SAT",
    "00": "SUN",
  };

  return (
    <TimeContainer>
      <div>
        {months[timeDate[1]]}
        <br />
        {timeDate[2]}
        <br />
        {days[`0${props.weekday}`]}
        <br />
        {props.gameTimeCount}場比賽
      </div>
    </TimeContainer>
  );
}

BoxEnd.propTypes = {
  data: PropTypes.object,
};

BoxComing.propTypes = {
  data: PropTypes.object,
};
TimeBox.propTypes = {
  time: PropTypes.string,
  weekday: PropTypes.number,
  gameTimeCount: PropTypes.number,
};
