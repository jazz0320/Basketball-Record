import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "styled-components";

const gradeType = {
  pf: "犯規",
  ftRate: "罰球命中率",
  dreb: "防守籃板",
  pts: "得分",
  threePtm: "三分命中數",
  to: "失誤",
  stl: "抄截",
  threePtRate: "三分命中率",
  ast: "助攻",
  fgm: "出手次數",
  blk: "火鍋",
  oreb: "進攻籃板",
  fta: "罰球命中數",
  threePta: "三分命中數",
  reb: "籃板",
  ftm: "罰球數",
  fgRate: "命中率",
  fga: "命中數",
};

const QuarterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const QuarterSpan = styled.span`
  border-radius: 5px;
  display: inline-block;
  padding: 5px 10px;
  background-color: ${(props) =>
    props.quarterNowData ? "#5e7380" : "#f7f7f7"};
  color: ${(props) => (props.quarterNowData ? "#fff" : "#333")};
  cursor: pointer;
  hover {
    background-color: #bbb;
    color: #fff;
  }
`;

const TeamDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  padding: 1vh 0;
  margin: 1vh 0;
`;

function LiveRoomData(props) {
  const [quarterNowData, setQuarterNowData] = useState(props.quarter.length);
  const [dataKeys, setDataKeys] = useState();
  useEffect(() => {
    setDataKeys(Object.keys(props.aTeamData[quarterNowData]));
  }, []);
  const [barData, setBarData] = useState();
  useEffect(() => {
    if (dataKeys !== undefined) {
      const array = dataKeys.map((key) => ({
        [`${key}`]: {
          A: props.aTeamData[quarterNowData][`${key}`],
          B: props.bTeamData[quarterNowData][`${key}`],
        },
      }));
      let newObject = {};
      for (let i = 0; i < dataKeys.length; i++) {
        newObject = { ...newObject, ...array[i] };
      }

      setBarData(newObject);
    }
  }, [dataKeys, quarterNowData, props.aTeamData, props.bTeamData]);

  return (
    <>
      <QuarterContainer>
        {props.quarter &&
          props.quarter.map((q, index) => (
            <QuarterSpan
              key={index}
              quarterNowData={quarterNowData === index}
              onClick={() => {
                setQuarterNowData(index);
              }}
            >
              {" "}
              {q}{" "}
            </QuarterSpan>
          ))}
        <QuarterSpan
          quarterNowData={quarterNowData === props.quarter.length}
          onClick={() => {
            setQuarterNowData(props.quarter.length);
          }}
        >
          {" "}
          All{" "}
        </QuarterSpan>
      </QuarterContainer>

      <TeamDataContainer>
        {barData
          ? dataKeys?.map((item, index) =>
              (item !== "fgRate") &
              (item !== "ftRate") &
              (item !== "threePtRate") ? (
                <Bar
                  widthA={barData[item]["A"]}
                  widthB={barData[item]["B"]}
                  label={item}
                  key={index}
                />
              ) : (
                <BarPercent
                  widthA={barData[item]["A"]}
                  widthB={barData[item]["B"]}
                  label={item}
                  key={index}
                />
              )
            )
          : null}
      </TeamDataContainer>
    </>
  );
}

const EachBarContainer = styled.div`
  margin-bottom: 0.75vh;
`;
const EachBar = styled.div`
  display: flex;
  max-width: 90vw;
  @media (max-width: 1024px) {
    max-width: 95vw;
  }
`;

const BarDataNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
`;

const BarDataBackgroundATeam = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  background-color: #dee2e6;
  width: 30vw;
  @media (max-width: 1440px) {
    width: 27vw;
  }
  @media (max-width: 1024px) {
    width: 30vw;
  }
`;

const BarDataGradeATeam = styled.div`
  width: ${(props) => props.widthA}%;
  height: 2.7vh;
  background-color: silver;
`;
const BarDataBackgroundBTeam = styled.div`
  margin-left: 10px;
  background-color: #dee2e6;
  width: 30vw;
  @media (max-width: 1440px) {
    width: 27vw;
  }
  @media (max-width: 1024px) {
    width: 30vw;
  }
`;

const BarDataGradeBTeam = styled.div`
  width: ${(props) => props.widthB}%;
  height: 2.7vh;
  background-color: silver;
`;

const BarDataName = styled.div`
  height: 2.7vh;
  width: 100px;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Bar(props) {
  return (
    <EachBarContainer>
      <EachBar>
        <BarDataNum>{props.widthA}</BarDataNum>
        <BarDataBackgroundATeam>
          <BarDataGradeATeam widthA={props.widthA} />
        </BarDataBackgroundATeam>
        <BarDataName>{gradeType[props.label]}</BarDataName>
        <BarDataBackgroundBTeam>
          <BarDataGradeBTeam widthB={props.widthB} />
        </BarDataBackgroundBTeam>
        <BarDataNum>{props.widthB}</BarDataNum>
      </EachBar>
    </EachBarContainer>
  );
}

function BarPercent(props) {
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }
  return (
    <EachBarContainer>
      <EachBar>
        <BarDataNum>{round(props.widthA * 100)}%</BarDataNum>
        <BarDataBackgroundATeam>
          <BarDataGradeATeam widthA={props.widthA * 100} />
        </BarDataBackgroundATeam>
        <BarDataName>{gradeType[props.label]}</BarDataName>
        <BarDataBackgroundBTeam>
          <BarDataGradeBTeam widthB={props.widthB * 100} />
        </BarDataBackgroundBTeam>
        <BarDataNum>{round(props.widthB * 100)}%</BarDataNum>
      </EachBar>
    </EachBarContainer>
  );
}

LiveRoomData.propTypes = {
  quarter: PropTypes.array,
  aTeamData: PropTypes.object,
  bTeamData: PropTypes.object,
};

Bar.propTypes = {
  widthA: PropTypes.number,
  widthB: PropTypes.number,
  label: PropTypes.string,
};
BarPercent.propTypes = {
  widthA: PropTypes.number,
  widthB: PropTypes.number,
  label: PropTypes.string,
};

export default LiveRoomData;
