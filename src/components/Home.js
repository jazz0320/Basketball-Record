import { getDocs, collection, doc, db } from "../utils/firebase";
import { useEffect, useState, useReducer, useRef } from "react";
import styled from "styled-components";

function Home() {
  const [gameList, setGameList] = useState([]);
  const [gameListName, setGameListName] = useState([]);
  const [gameTime, setGameTime] = useState([]);
  const [gameTimeCount, setGameTimeCount] = useState({});
  //   const [gameListByTime, setGameListByTime] = useState({});
  async function loadSchedule() {
    const querySnapshot = await getDocs(collection(db, "game_schedule"));
    querySnapshot.forEach((doc) => {
      console.log("id", doc.id.slice(0, 10));
      setGameListName((pre) => [...pre, doc.id]);
      setGameList((pre) => [...pre, { [`${doc.id}`]: doc.data() }]);
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
    // let timeArray = uniqueArr.map((time) => ({
    //   [`${time}`]: {},
    // }));
    // setGameListByTime(timeArray);
  }, [gameListName]);

  return (
    <>
      <div>home page</div>
      {gameTime?.map((time) => (
        <div key={time}>
          --{time}--
          <div>
            {gameList?.map((game) =>
              Object.keys(game)[0].slice(0, 10) === time ? (
                <div key={Object.keys(game)}>
                  {/* {game[Object.keys(game)[0]].time_date} */}
                  <BoxComing data={game[Object.keys(game)[0]]} />
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;

const GameContainer_L1 = styled.div`
  height: 160px;
  width: 180px;
  padding: 10px;
  background-color: #f44336;
  display: flex;
  flex-wrap: wrap;
`;

const GameContainer_L2 = styled.div`
  width: 180px;
  height: 50px;
  background-color: orange;
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
          <div>{props.data.aTeam}</div>
          <div>
            {props.data.aTeam_winloss[0]}-{props.data.aTeam_winloss[1]}
          </div>
        </TeamDiv>
        <ScoreBox>{props.data.aTeam_score}</ScoreBox>
      </GameContainer_L2>
      <GameContainer_L2>
        <LogoDiv img={props.data.bTeamLogo} />
        <TeamDiv>
          <div>{props.data.bTeam}</div>
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
  background-color: orange;
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
          <div>{props.data.aTeam}</div>
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
          <div>{props.data.bTeam}</div>
          <div>
            {props.data.bTeam_winloss[0]}-{props.data.bTeam_winloss[1]}
          </div>
        </TeamDiv>
      </GameContainer_L2_forComing>
    </GameContainer_L1>
  );
}

function TimeBox(props) {
  return <div></div>;
}
