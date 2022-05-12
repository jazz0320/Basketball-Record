import { getDoc, doc, getDocs, collection, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import HomeGrade from "./HomeGrade";
import PlayerGrade from "./PlayerGrade";
import { GeneralDiv } from "../utils/StyleComponent";

function Home(props) {
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
    props.setComingGameRoutes(comingGame);
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
      console.log("cccc", doc.data().players);
      let players = doc
        .data()
        .players.map((player) => ({ ...player, team: doc.id }));
      setPlayerGrade((pre) => [...pre, ...players]);
    });
  };

  useEffect(() => {
    loadSchedule();
    getTeamData();
    // getPlayerGrade();
    // const q = query(collection(db, "game_schedule"));
    // const unsub = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((doc) => {
    //     // console.log("id", doc.id.slice(0, 10));
    //     setGameListName((pre) => [...pre, doc.id]);
    //     setGameList((pre) => [...pre, { [`${doc.id}`]: doc.data() }]);
    //     setWeekday((pre) => ({
    //       ...pre,
    //       [`${doc.id.slice(0, 10)}`]: doc.data().time_day,
    //     }));
    //   });
    // });
    // console.log("aaa", unsub);

    // gameList.filter(=>)
  }, []);

  // useEffect(() => {
  //   let comingGame = [];
  //   for (let i = 0; i < gameListName.length; i++) {
  //     console.log("bbb", gameList[gameListName[i]]);
  //     if (gameList[gameListName[i]].gameStatus === "coming") {
  //       comingGame.push(gameListName[i]);
  //       console.log(gameListName[i]);
  //     }
  //   }
  //   props.setComingGameRoutes(comingGame);
  //   console.log("aaa");
  // }, [gameListName]);

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
      <GeneralDiv
        width="100vw"
        display="flex"
        justifyContent="center"
        backgroundColor="#e9ecef"
        overflowY="scroll"
      >
        <GeneralDiv
          width="80vw"
          backgroundColor="#f8f9fa"
          padding="0.5vh 1vw"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          boxShadow="12px 12px 7px rgba(0, 0, 0, 0.7);"
        >
          <GeneralDiv height="100px" width="100%" />
          <CarousellContainer>
            {gameTime?.map((time) => (
              <div
                key={time}
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                }}
              >
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
              </div>
            ))}
          </CarousellContainer>
          <HomeGrade teamGrade={teamGrade} />
          <PlayerGrade playerGrade={playerGrade} />
        </GeneralDiv>
      </GeneralDiv>
    </>
  );
}

export default Home;

const CarousellContainer = styled.div`
  height: 230px;
  width: 78vw;
  display: inline-flex;
  overflow: scroll;
  color: #495057;
  ::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
`;

const GameContainerL1 = styled.div`
  cursor: pointer;
  border-radius: 5px;
  height: 215px;
  width: 256px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ced4da;
`;

const GameContainerL2 = styled.div`
  width: 234px;
  height: 80px;
  font-size: 19px;
  line-height: 50px;
  display: flex;
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
      <GameContainerL2 className="flex justify-around">
        <span>時間：{props.data.time_time}</span>
        {props.data.gameStatus === "live" ? (
          <span className="text-red-600 font-extrabold">live now</span>
        ) : (
          <span className="text-black font-extrabold">end</span>
        )}
      </GameContainerL2>
      <GameContainerL2>
        <LogoDiv img={props.data.aTeamLogo} />
        <TeamDiv>
          <GeneralDiv lineHeight="15px" color="black">
            {props.data.aTeam}
          </GeneralDiv>
          <GeneralDiv lineHeight="20px">
            {aTeamWinloss[0]}-{aTeamWinloss[1]}
          </GeneralDiv>
        </TeamDiv>
        <ScoreBox>{props.data.aTeam_score}</ScoreBox>
      </GameContainerL2>
      <GameContainerL2>
        <LogoDiv img={props.data.bTeamLogo} />
        <TeamDiv>
          <GeneralDiv color="black" lineHeight="15px">
            {props.data.bTeam}
          </GeneralDiv>
          <GeneralDiv lineHeight="20px">
            {bTeamWinloss[0]}-{bTeamWinloss[1]}
          </GeneralDiv>
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
  .vs {
    line-height: 100px;
  }
  .logo {
    margin-left: 10px;
    width: 50px;
  }
`;

const LogoDivForComing = styled.div`
  height: 80px;
  width: 80px;
  background-size: contain;
  background-image: url(${(props) => props.img});
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
      <GameContainerL2 className="flex justify-around">
        <span>時間：{props.data.time_time}</span>
        <span className="text-black font-extrabold">coming soon</span>
      </GameContainerL2>
      <GameContainerL2forComing>
        <LogoDivForComing img={props.data.aTeamLogo} />
        <TeamDiv>
          <GeneralDiv color="black" lineHeight="20px">
            {props.data.aTeam}
          </GeneralDiv>
          <div>
            {aTeamWinloss[0]}-{aTeamWinloss[1]}
          </div>
        </TeamDiv>
      </GameContainerL2forComing>
      <GameContainerL2forComing>
        <div className="vs">VS</div>
      </GameContainerL2forComing>
      <GameContainerL2forComing>
        <LogoDivForComing img={props.data.bTeamLogo} />
        <TeamDiv>
          <GeneralDiv color="black" lineHeight="20px">
            {props.data.bTeam}
          </GeneralDiv>
          <div>
            {bTeamWinloss[0]}-{bTeamWinloss[1]}
          </div>
        </TeamDiv>
      </GameContainerL2forComing>
    </GameContainerL1>
  );
}

const TimeContainer = styled.div`
  border-radius: 10px;
  height: 220px;
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
    let a = props.time.split("-");
    setTimeDate(a);
  }, []);

  useEffect(() => {}, [props.weekday]);

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
    "07": "SUN",
  };

  return (
    <TimeContainer>
      <GeneralDiv>
        {months[timeDate[1]]}
        <br />
        {timeDate[2]}
        <br />
        {days[`0${props.weekday}`]}
        <br />
        {props.gameTimeCount}場比賽
      </GeneralDiv>
    </TimeContainer>
  );
}
