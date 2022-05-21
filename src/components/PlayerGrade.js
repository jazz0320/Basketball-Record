import { useEffect, useState } from "react";
import styled from "styled-components";

const gradeType = [
  ["to", "失誤"],
  ["oreb", "進攻籃板"],
  ["reb", "籃板"],
  ["stl", "抄截"],
  ["pf", "犯規"],
  ["ast", "助攻"],
  ["fgRate", "命中率"],
  ["threePtRate", "三分命中率"],
  ["ftRate", "罰球命中率"],
  ["blk", "火鍋"],
  ["pts", "得分"],
  ["dreb", "防守籃板"],
];

const GradeBox = styled.div`
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const GradeTitle = styled.div`
  div {
    font-size: 20px;
  }
  display: flex;
  background-color: #343a40;
  color: #f8f9fa;
  padding: 0 10px;
  justify-content: space-around;
  border-radius: 6px 6px 0 0;
  height: 36px;
`;

const GradeTitleRank = styled.div`
  width: 60px;
  text-align: center;
  height: 30px;
  margin: auto 0;
  font-size: ${(props) =>
    props.index < 3 ? `${20 + (3 - props.index) * 7}px` : "20px"};
  font-weight: ${(props) =>
    props.index < 3 ? `${400 + (3 - props.index) * 50}` : "400"};
`;
const GradeTitlePlayer = styled.div`
  width: 330px;
  text-align: center;
  height: 30px;
  margin: auto 0;
`;

const PlayerName = styled.div`
  width: 250px;
  text-align: center;
  font-size: 20px;
`;
const GradeTitleTeam = styled.div`
  width: 120px;
  height: 30px;
  margin: auto;
`;
const TeamName = styled.div`
  width: 120px;
  font-size: 20px;
`;

const GradeTitleData = styled.div`
  width: 80px;
  height: 30px;
  margin: auto 0;
`;

const PlayerData = styled.div`
  width: 120px;
  text-align: center;
  font-size: 20px;
`;

const InfSelector = styled.div`
  padding: 5px 10px;
  font-size: 20px;
`;

const PlayerGradeContainer = styled.div`
  height: calc(100vh - 280px);
  overflow-y: scroll;
`;

const EachPlayerBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;
`;

const PlayerImg = styled.img`
  filter: drop-shadow(-10px 6px 3px rgba(0, 0, 0, 0.5));
  height: ${(props) =>
    props.index < 3 ? `${90 + (3 - props.index) * 8}px` : "80px"};
  width: ${(props) =>
    props.index < 3 ? `${136 + (3 - props.index) * 11}px` : "109px"};
`;

function PlayerGrade(props) {
  const [checkDataType, setCheckDataType] = useState("pts");
  return (
    <div
      width="37vw"
      height="calc(100vh - 200px)"
      border="2px solid #adb5bd"
      borderRadius="10px"
      boxShadow="0px 2px 5px 3px rgba(0, 0, 0, 0.3);"
    >
      <GradeOutCome
        checkDataType={checkDataType}
        setCheckDataType={setCheckDataType}
        gradeType={gradeType}
        playerGrade={props.playerGrade}
        checkDataType={checkDataType}
      />
    </div>
  );
}
export default PlayerGrade;

function GradeOutCome(props) {
  const [sortData, setSortData] = useState();
  useEffect(() => {
    let data = [...props.playerGrade].sort(function (a, b) {
      return b[props.checkDataType] - a[props.checkDataType];
    });
    setSortData(data.slice(0, 10));
  }, [props.checkDataType, props.playerGrade]);
  return (
    <GradeBox>
      <GradeTitle>
        <GradeTitleRank>排名</GradeTitleRank>
        <GradeTitlePlayer>球員</GradeTitlePlayer>
        <GradeTitleTeam>隊伍</GradeTitleTeam>
        <GradeTitleData>數據</GradeTitleData>
      </GradeTitle>
      <InfSelector>
        <select
          value={props.checkDataType}
          onChange={(e) => props.setCheckDataType(e.target.value)}
        >
          {props.gradeType.map((type) => (
            <option key={type[0]} value={type[0]}>
              {type[1]}
            </option>
          ))}
        </select>
      </InfSelector>
      <PlayerGradeContainer>
        {sortData?.map((data, index) => (
          <EachPlayerBox key={data.name}>
            <GradeTitleRank index={index}>{index + 1}</GradeTitleRank>
            <div>
              <PlayerImg index={index} src={data.pic} />
            </div>
            <PlayerName>{data.name}</PlayerName>
            <TeamName>{data.team}</TeamName>
            <PlayerData>{data[props.checkDataType]}</PlayerData>
          </EachPlayerBox>
        ))}
      </PlayerGradeContainer>
    </GradeBox>
  );
}
