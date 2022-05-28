import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

const BoxScoreContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;

  justify-content: center;
`;
const ChooseTeamScore = styled.span`
  border-radius: 5px;
  display: inline-block;
  padding: 5px 10px;
  border: #5e7380 1px solid;
  background-color: ${(props) => (props.selectTeam ? "#5e7380" : "#f7f7f7")};
  color: ${(props) => (props.selectTeam ? "#fff" : "#333")};
  cursor: pointer;
  hover {
    background-color: #bbb;
    color: #fff;
  }
`;

const TableDiv = styled.div``;

const ScoreTable = styled.table`
  background-color: #343a40;
  color: white;
  text-align: center;
  border-radius: 5px;
  border: 0px;
`;

function LiveRoomScore(props) {
  const [selectTeam, setSelectTeam] = useState("ateam");
  return (
    <>
      <BoxScoreContainer>
        <TableDiv>
          <div id="radio">
            <ChooseTeamScore
              selectTeam={selectTeam === "ateam"}
              onClick={() => {
                setSelectTeam("ateam");
              }}
            >
              {props.aTeam}
            </ChooseTeamScore>

            <ChooseTeamScore
              selectTeam={selectTeam === "bteam"}
              onClick={() => {
                setSelectTeam("bteam");
              }}
            >
              {props.bTeam}
            </ChooseTeamScore>
          </div>
          <ScoreTable cellPadding="5" border="1">
            <thead>
              <tr>
                <th width="110px">PLAYER</th>
                <th>MIN</th>
                <th>FGM</th>
                <th>FGA</th>
                <th>FG%</th>
                <th>3PM</th>
                <th>3PA</th>
                <th>3p%</th>
                <th>FTM</th>
                <th>FTA</th>
                <th>FT%</th>
                <th>OREB</th>
                <th>DREB</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>TO</th>
                <th>PF</th>
                <th>PTS</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              {selectTeam === "ateam"
                ? props.aTeamPlayers.map((players, index) => (
                    <tr key={index}>
                      <td nowrap="nowrap" align="left">
                        {players.id}
                      </td>
                      <td>none</td>
                      <td>{players.fgm}</td>
                      <td>{players.fga}</td>
                      <td>{players.fgRate}</td>
                      <td>{players.threePtm}</td>
                      <td>{players.threePta}</td>
                      <td>{players.threePtRate}</td>
                      <td>{players.ftm}</td>
                      <td>{players.fta}</td>
                      <td>{players.fgRate}</td>
                      <td>{players.oreb}</td>
                      <td>{players.dreb}</td>
                      <td>{players.reb}</td>
                      <td>{players.ast}</td>
                      <td>{players.stl}</td>
                      <td>{players.blk}</td>
                      <td>{players.to}</td>
                      <td>{players.pf}</td>
                      <td>{players.pts}</td>
                      <td>none</td>
                    </tr>
                  ))
                : props.bTeamPlayers.map((players, index) => (
                    <tr key={index}>
                      <td nowrap="nowrap" align="left">
                        {players.id}
                      </td>
                      <td>none</td>
                      <td>{players.fgm}</td>
                      <td>{players.fga}</td>
                      <td>{players.fgRate}</td>
                      <td>{players.threePtm}</td>
                      <td>{players.threePta}</td>
                      <td>{players.threePtRate}</td>
                      <td>{players.ftm}</td>
                      <td>{players.fta}</td>
                      <td>{players.fgRate}</td>
                      <td>{players.oreb}</td>
                      <td>{players.dreb}</td>
                      <td>{players.reb}</td>
                      <td>{players.ast}</td>
                      <td>{players.stl}</td>
                      <td>{players.blk}</td>
                      <td>{players.to}</td>
                      <td>{players.pf}</td>
                      <td>{players.pts}</td>
                      <td>none</td>
                    </tr>
                  ))}
            </tbody>
          </ScoreTable>
        </TableDiv>
      </BoxScoreContainer>
    </>
  );
}

LiveRoomScore.propTypes = {
  aTeam: PropTypes.string,
  aTeamPlayers: PropTypes.array,
  bTeamPlayers: PropTypes.array,
  bTeam: PropTypes.string,
};

export default LiveRoomScore;
