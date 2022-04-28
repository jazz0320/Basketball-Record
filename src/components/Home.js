import { getDocs, collection, doc, db } from "../utils/firebase";
import { useEffect, useState, useReducer, useRef } from "react";
import styled from "styled-components";

function Home() {
  const [gameList, setGameList] = useState([]);
  const [gameListName, setGameListName] = useState([]);
  const [gameTime, setGameTime] = useState([]);
  const [gameTimeCount, setGameTimeCount] = useState({});
  const [weekday, setWeekday] = useState({});
  const [x_axis, setX_axis] = useState(0);
  //   const [gameListByTime, setGameListByTime] = useState({});
  async function loadSchedule() {
    const querySnapshot = await getDocs(collection(db, "game_schedule"));
    querySnapshot.forEach((doc) => {
      console.log("id", doc.id.slice(0, 10));
      setGameListName((pre) => [...pre, doc.id]);
      setGameList((pre) => [...pre, { [`${doc.id}`]: doc.data() }]);
      setWeekday((pre) => ({
        ...pre,
        [`${doc.id.slice(0, 10)}`]: doc.data().time_day,
      }));
    });
  }

  useEffect(() => {
    loadSchedule();
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

  let mobile_hotsales_x_axis = {
    transform: `translate(${x_axis}vw)`,
    transition: "transform .3s",
  };

  const prevClick = function () {
    if (x_axis === -233) {
      setX_axis(-133);
    } else if (x_axis <= -133) {
      setX_axis(-33);
    } else if (x_axis <= -33) {
      setX_axis(0);
    }
  };
  const nextClick = function () {
    if (x_axis === 0) {
      setX_axis(-100);
    } else if (x_axis >= -100) {
      setX_axis(-200);
    } else if (x_axis >= -200) {
      setX_axis(-233);
    }
  };

  return (
    <>
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
                  {/* {game[Object.keys(game)[0]].time_date} */}
                  <BoxComing data={game[Object.keys(game)[0]]} />
                  {/* <BoxEnd data={game[Object.keys(game)[0]]} /> */}
                </div>
              ) : null
            )}
          </div>
        ))}
      </CarousellContainer>
    </>
  );
}

export default Home;

const CarousellContainer = styled.div`
  height: 230px;
  width: 90vw;
  margin: 0 2vw 0 2vw;
  display: inline-flex;
  ${"" /* align-items: center; */}
  overflow: scroll;
  color: #495057;
`;

const GameContainer_L1 = styled.div`
  height: 160px;
  width: 180px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ced4da;
`;

const GameContainer_L2 = styled.div`
  width: 180px;
  height: 50px;
  font-size: 14px;
  line-height: 50px;
  display: flex;
  flex-wrap: wrap;
  :first-child {
    height: 40px;
  }
`;

const LogoDiv = styled.div`
  height: 50px;
  width: 50px;
  background-size: contain;
  background-image: url(${(props) => props.img});
  margin-right: 10px;
`;

const TeamDiv = styled.div`
  height: 50px;
  width: 65px;
  font-size: 8px;

  div {
    line-height: 25px;
    text-align: center;
    justify-content: center;
  }
`;

const ScoreBox = styled.div`
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
`;

function BoxEnd(props) {
  return (
    <GameContainer_L1>
      <GameContainer_L2>
        時間：{props.data.time_time}
        {props.data.end ? "End" : ""}
      </GameContainer_L2>
      <GameContainer_L2>
        <LogoDiv img={props.data.aTeamLogo} />
        <TeamDiv>
          <div style={{ color: "black" }}>{props.data.aTeam}</div>
          <div>
            {props.data.aTeam_winloss[0]}-{props.data.aTeam_winloss[1]}
          </div>
        </TeamDiv>
        <ScoreBox>{props.data.aTeam_score}</ScoreBox>
      </GameContainer_L2>
      <GameContainer_L2>
        <LogoDiv img={props.data.bTeamLogo} />
        <TeamDiv>
          <div style={{ color: "black" }}>{props.data.bTeam}</div>
          <div>
            {props.data.bTeam_winloss[0]}-{props.data.bTeam_winloss[1]}
          </div>
        </TeamDiv>
        <ScoreBox>{props.data.aTeam_score}</ScoreBox>
      </GameContainer_L2>
    </GameContainer_L1>
  );
}

const GameContainer_L2_forComing = styled.div`
  width: 60px;
  height: 100px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .vs {
    line-height: 100px;
  }
  .logo {
    margin-left: 10px;
    width: 50px;
  }
`;

const LogoDiv_forComing = styled.div`
  height: 50px;
  width: 50px;
  background-size: contain;
  background-image: url(${(props) => props.img});
`;

function BoxComing(props) {
  return (
    <GameContainer_L1>
      <GameContainer_L2>
        時間：{props.data.time_time}
        {props.data.end ? "End" : ""}
      </GameContainer_L2>
      <GameContainer_L2_forComing>
        <LogoDiv_forComing img={props.data.aTeamLogo} />
        <TeamDiv>
          <div style={{ color: "black" }}>{props.data.aTeam}</div>
          <div>
            {props.data.aTeam_winloss[0]}-{props.data.aTeam_winloss[1]}
          </div>
        </TeamDiv>
      </GameContainer_L2_forComing>
      <GameContainer_L2_forComing>
        <div className="vs">VS</div>
      </GameContainer_L2_forComing>
      <GameContainer_L2_forComing>
        <LogoDiv_forComing img={props.data.bTeamLogo} />
        <TeamDiv>
          <div style={{ color: "black" }}>{props.data.bTeam}</div>
          <div>
            {props.data.bTeam_winloss[0]}-{props.data.bTeam_winloss[1]}
          </div>
        </TeamDiv>
      </GameContainer_L2_forComing>
    </GameContainer_L1>
  );
}

const TimeContainer = styled.div`
  height: 200px;
  width: 80px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background-color: #343a40;
  div {
    color: white;
    margin-top: 40px;
    font-size: 14px;
    width: 80px;
    text-align: center;
  }
`;

function TimeBox(props) {
  const [timeDate, setTimeDate] = useState([]);
  useEffect(() => {
    let a = props.time.split("-");
    setTimeDate(a);
    console.log("a", props.weekday);
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
