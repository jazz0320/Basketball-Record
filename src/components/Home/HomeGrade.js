import styled from "styled-components";

const TeamGradeBox = styled.div`
  width: 37vw;
  height: calc(100vh - 200px);
  border: 2px solid #adb5bd;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.3);
`;

const TeamGradeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 4vh;
  background-color: #343a40;
  color: #f8f9fa;
  border-radius: 6px 6px 0 0;
  padding: 0 10px;
  div {
    font-size: 20px;
  }
`;

const TeamGradeTitleRank = styled.div`
  width: 40px;
  text-align: center;
`;
const TeamGradeTitleTeam = styled.div`
  width: 190px;
  text-align: center;
`;
const TeamLogo = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(-10px 10px 3px rgba(0, 0, 0, 0.3));
`;

const TeamName = styled.div`
  width: 110px;
  text-align: center;
`;

const TeamGradeTitleWin = styled.div`
  width: 40px;
  text-align: center;
`;
const TeamGradeTitleLoss = styled.div`
  width: 50px;
  text-align: center;
`;
const TeamGradeTitleWinRate = styled.div`
  width: 80px;
  text-align: center;
`;
const TeamGradeTitleWinDif = styled.div`
  width: 50px;
  text-align: center;
`;

const TeamGradeContent = styled.div`
  height: calc(100vh - 240px);
  overflow-y: scroll;
  padding: 0 10px;
`;

const EachTeamBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    font-size: 20px;
  }
`;

function HomeGrade(props) {
  let roundDecimal = function (val, precision) {
    return (
      Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
      Math.pow(10, precision || 0)
    );
  };
  return (
    <TeamGradeBox>
      <TeamGradeTitle>
        <TeamGradeTitleRank>排名</TeamGradeTitleRank>
        <TeamGradeTitleTeam>隊伍</TeamGradeTitleTeam>
        <TeamGradeTitleWin>勝</TeamGradeTitleWin>
        <TeamGradeTitleLoss>負</TeamGradeTitleLoss>
        <TeamGradeTitleWinRate>勝率%</TeamGradeTitleWinRate>
        <TeamGradeTitleWinDif>勝差</TeamGradeTitleWinDif>
      </TeamGradeTitle>
      <TeamGradeContent>
        {props.teamGrade &&
          props.teamGrade?.map((item, index) => (
            <EachTeamBlock key={Object.keys(item)}>
              <TeamGradeTitleRank>{index + 1}</TeamGradeTitleRank>
              <div>
                <TeamLogo src={item[Object.keys(item)]["logo"]} />
              </div>
              <TeamName>{Object.keys(item)}</TeamName>
              <TeamGradeTitleWin>
                {item[Object.keys(item)]["grade"][0]}
              </TeamGradeTitleWin>
              <TeamGradeTitleLoss>
                {item[Object.keys(item)]["grade"][1]}
              </TeamGradeTitleLoss>
              <TeamGradeTitleWinRate>
                {Math.round(
                  roundDecimal(
                    item[Object.keys(item)]["grade"][0] /
                      (item[Object.keys(item)]["grade"][1] +
                        item[Object.keys(item)]["grade"][0]),
                    2
                  ) * 100
                )}
                %
              </TeamGradeTitleWinRate>
              <TeamGradeTitleWinDif>
                {index === 0
                  ? "0"
                  : (item[Object.keys(item)]["grade"][2] -
                      props.teamGrade[index - 1][
                        Object.keys(props.teamGrade[index - 1])
                      ]["grade"][2]) /
                    2}
              </TeamGradeTitleWinDif>
            </EachTeamBlock>
          ))}
      </TeamGradeContent>
    </TeamGradeBox>
  );
}

export default HomeGrade;
