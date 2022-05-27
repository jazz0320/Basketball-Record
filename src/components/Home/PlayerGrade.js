import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  border: 2px solid #adb5bd;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 44.68%;
  height: calc(100vh - 200px);
  @media (max-width: 768px) {
    width: 97%;
    margin-bottom: 1vh;
    height: 400px;
  }
`;

const GradeTitle = styled.div`
  div {
    font-size: 20px;
    @media (max-width: 1280px) {
      font-size: 16px;
    }
    @media (max-width: 1024px) {
      font-size: 12px;
    }
    @media (max-width: 768px) {
      font-size: 18px;
    }
    @media (max-width: 414px) {
      font-size: 14px;
    }
  }
  display: flex;
  align-items: center;
  background-color: #343a40;
  color: #f8f9fa;
  padding: 0 10px;
  justify-content: space-around;
  border-radius: 6px 6px 0 0;
  height: 4vh;
`;

const GradeTitleRank = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0;
  font-size: ${(props) =>
    props.index < 3 ? `${20 + (3 - props.index) * 7}px` : "20px"};
  font-weight: ${(props) =>
    props.index < 3 ? `${400 + (3 - props.index) * 50}` : "400"};
  height: 100%;
`;
const GradeTitlePlayer = styled.div`
  width: 330px;
  text-align: center;
  margin: auto 0;
  @media (max-width: 1280px) {
    width: 240px;
  }
  @media (max-width: 768px) {
    width: 260px;
  }
`;

const PlayerName = styled.div`
  padding-right: 10px;
  width: 200px;
  text-align: center;
`;
const GradeTitleTeam = styled.div`
  width: 120px;
  margin: auto;
`;
const TeamName = styled.div`
  width: 120px;
`;

const GradeTitleData = styled.div`
  width: 80px;
  margin: auto 0;
`;

const PlayerData = styled.div`
  width: 120px;
  text-align: center;
`;

const InfSelector = styled.div`
  padding: 5px 10px;
  font-size: 20px;
  @media (max-width: 1280px) {
    font-size: 16px;
  }
  @media (max-width: 1024px) {
    font-size: 12px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 414px) {
    font-size: 14px;
  }
`;

const PlayerGradeContainer = styled.div`
  height: calc(100vh - 280px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const EachPlayerBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-around;
  div {
    font-size: 20px;
    margin-bottom: 5px;
    @media (max-width: 1280px) {
      font-size: 16px;
      margin-bottom: 3px;
    }
    @media (max-width: 1024px) {
      font-size: 12px;
      margin-bottom: 0px;
    }
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 3px;
    }
    @media (max-width: 414px) {
      font-size: 14px;
      margin-bottom: 0px;
    }
  }
`;

const PlayerImg = styled.img`
  filter: drop-shadow(-10px 6px 3px rgba(0, 0, 0, 0.5));
  height: ${(props) =>
    props.index < 3 ? `${65 + (3 - props.index) * 8}px` : "55px"};
  width: ${(props) =>
    props.index < 3 ? `${120 + (3 - props.index) * 11}px` : "109px"};
  @media (max-width: 1280px) {
    height: ${(props) =>
      props.index < 3 ? `${50 + (3 - props.index) * 6}px` : "45px"};
    width: ${(props) =>
      props.index < 3 ? `${100 + (3 - props.index) * 8.3}px` : "90px"};
  }
  @media (max-width: 1024px) {
    height: ${(props) =>
      props.index < 3 ? `${40 + (3 - props.index) * 3}px` : "35px"};
    width: ${(props) =>
      props.index < 3 ? `${86 + (3 - props.index) * 5.5}px` : "70px"};
  }
  @media (max-width: 768px) {
    height: ${(props) =>
      props.index < 3 ? `${65 + (3 - props.index) * 8}px` : "55px"};
    width: ${(props) =>
      props.index < 3 ? `${120 + (3 - props.index) * 11}px` : "109px"};
  }
  @media (max-width: 414px) {
    height: ${(props) =>
      props.index < 3 ? `${50 + (3 - props.index) * 8}px` : "50px"};
    width: ${(props) =>
      props.index < 3 ? `${90 + (3 - props.index) * 11}px` : "80px"};
  }
`;
const PlayerImgDiv = styled.div`
  width: 120px;
  @media (max-width: 1280px) {
    width: 100px;
  }
  @media (max-width: 1024px) {
    width: 80px;
  }
  @media (max-width: 768px) {
    width: 120px;
  }
  @media (max-width: 414px) {
    font-size: 80px;
  }
`;

function PlayerGrade(props) {
  const [checkDataType, setCheckDataType] = useState("pts");
  return (
    <GradeOutCome
      checkDataType={checkDataType}
      setCheckDataType={setCheckDataType}
      gradeType={gradeType}
      playerGrade={props.playerGrade}
    />
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
            <PlayerImgDiv>
              <PlayerImg index={index} src={data.pic} />
            </PlayerImgDiv>
            <PlayerName>{data.name}</PlayerName>
            <TeamName>{data.team}</TeamName>
            <PlayerData>{data[props.checkDataType]}</PlayerData>
          </EachPlayerBox>
        ))}
      </PlayerGradeContainer>
    </GradeBox>
  );
}

PlayerGrade.propTypes = {
  playerGrade: PropTypes.array,
};

GradeOutCome.propTypes = {
  playerGrade: PropTypes.array,
  checkDataType: PropTypes.string,
  setCheckDataType: PropTypes.func,
  gradeType: PropTypes.array,
};
