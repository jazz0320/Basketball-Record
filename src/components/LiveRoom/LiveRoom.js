import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, db } from "../../utils/firebase";
import LiveRoomScore from "./LiveRoomScore";
import LiveRoomStream from "./LiveRoomStream";
import LiveRoomData from "./LiveRoomData";
import styled from "styled-components";
import PropTypes from "prop-types";

const ContainDiv = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FullPageContainer = styled.div`
  width: 100vw;
  padding: 1vh 1vw 0 1vw;
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
  padding: 105px 1vw 3vh 1vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: cneter;
  box-shadow: 0px 0px 3px 5px rgba(0, 0, 0, 0.3); ;
`;

const TeamInfContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  height: 170px;
  width: 170px;
`;

const LogoImg = styled.img`
  filter: drop-shadow(-15px 15px 4px rgba(0, 0, 0, 0.5));
`;

const ScoreTable = styled.table`
  background-color: #343a40;
  color: #f8f9fa;
  text-align: center;
  border-radius: 5px;
  border-style: none;
  border-collapse: separate;
  width: 45%;
  height: 120px;
`;

const WatchSpanBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const WatchSpan = styled.span`
  border-radius: 5px;
  display: inline-block;
  padding: 5px 10px;
  background-color: ${(props) => (props.watchBox ? "#5e7380" : "#f7f7f7")};
  color: ${(props) => (props.watchBox ? "#fff" : "#333")};
  cursor: pointer;
  hover {
    background-color: #bbb;
    color: #fff;
  }
`;

const WactchContentBox = styled.div`
  min-height: 70vh;
  max-height: 150vh;
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

function LiveRoom(props) {
  const [liveAction, setLiveAction] = useState();
  const [quarter, setQuarter] = useState();
  const [aTeam, setATeam] = useState();
  const [aTeamLogo, setATeamLogo] = useState();
  const [aTeamPlayers, setATeamPlayers] = useState();
  const [aTeamData, setATeamData] = useState();
  const [bTeam, setBTeam] = useState();
  const [bTeamLogo, setBTeamLogo] = useState();
  const [bTeamPlayers, setBTeamPlayers] = useState();
  const [bTeamData, setBTeamData] = useState();
  const [finishSetting, setFinishSetting] = useState();
  const [endGame, setEndGame] = useState();
  const [watchBox, setWatchBox] = useState("livestream");
  async function loading() {
    const docSnap = await getDoc(doc(db, "past_data", `${props.gameName}`));
    const data = docSnap.data();
    setLiveAction(data.live_action);
    setQuarter(data.quarter);
    setATeam(data.A_team);
    setATeamLogo(data.A_team_logo);
    setATeamPlayers(data.A_team_player);
    setBTeamPlayers(data.B_team_player);
    setATeamData(data.A_team_data);
    setBTeam(data.B_team);
    setBTeamLogo(data.B_team_logo);
    setBTeamData(data.B_team_data);
    setFinishSetting(data.finishSetting);
    setEndGame(data.endGame);
  }
  useEffect(() => {
    if (props.liveGameRoutes?.includes(props.gameName)) {
      onSnapshot(doc(db, "live_game", `${props.gameName}`), (doc) => {
        setLiveAction(doc.data().live_action);
        setQuarter(doc.data().quarter);
        setATeam(doc.data().A_team);
        setATeamLogo(doc.data().A_team_logo);
        setATeamPlayers(doc.data().A_team_player);
        setBTeamPlayers(doc.data().B_team_player);
        setATeamData(doc.data().A_team_data);
        setBTeam(doc.data().B_team);
        setBTeamLogo(doc.data().B_team_logo);
        setBTeamData(doc.data().B_team_data);
        setFinishSetting(doc.data().finishSetting);
        setEndGame(doc.data().endGame);
      });
    } else if (props.pastGameName !== undefined) {
      loading();
    }
  }, [props.gameName]);

  return (
    <>
      {!props.pastGameName && endGame ? (
        <div>比賽結束</div>
      ) : finishSetting ? (
        <FullPageContainer>
          <ContentContainer>
            <TeamInfContainer>
              <LogoBox>
                <LogoImg src={aTeamLogo} />
              </LogoBox>
              <ScoreTable cellPadding="1" border="1">
                <thead>
                  <tr>
                    <th>隊伍</th>
                    {quarter
                      ? quarter.map((item) => <th key={item}>{item}</th>)
                      : null}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{aTeam}</td>
                    {quarter
                      ? quarter.map((item, index) => (
                          <td key={item}>
                            {aTeamData
                              ? aTeamData[0]
                                ? aTeamData[index].pts
                                : 0
                              : 0}
                          </td>
                        ))
                      : null}
                    <td>
                      {quarter
                        ? aTeamData
                          ? aTeamData[0]
                            ? aTeamData[quarter.length].pts
                            : 0
                          : 0
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>{bTeam}</td>
                    {quarter
                      ? quarter.map((item, index) => (
                          <td key={item}>
                            {bTeamData
                              ? bTeamData[0]
                                ? bTeamData[index].pts
                                : 0
                              : 0}
                          </td>
                        ))
                      : null}
                    <td>
                      {quarter
                        ? bTeamData
                          ? bTeamData[0]
                            ? bTeamData[quarter.length].pts
                            : 0
                          : 0
                        : null}
                    </td>
                  </tr>
                </tbody>
              </ScoreTable>
              <LogoBox>
                <LogoImg src={bTeamLogo} />
              </LogoBox>
            </TeamInfContainer>
            <WatchSpanBox id="radio">
              <WatchSpan
                watchBox={watchBox === "boxscore"}
                onClick={() => {
                  setWatchBox("boxscore");
                }}
              >
                {" "}
                Box-score{" "}
              </WatchSpan>

              <WatchSpan
                watchBox={watchBox === "livestream"}
                onClick={() => {
                  setWatchBox("livestream");
                }}
              >
                {" "}
                Live-Stream{" "}
              </WatchSpan>

              <WatchSpan
                watchBox={watchBox === "teamdata"}
                onClick={() => {
                  setWatchBox("teamdata");
                }}
              >
                {" "}
                Team-Data{" "}
              </WatchSpan>
            </WatchSpanBox>
            <WactchContentBox>
              {watchBox === "boxscore" ? (
                <LiveRoomScore
                  aTeam={aTeam}
                  bTeam={bTeam}
                  aTeamPlayers={aTeamPlayers}
                  bTeamPlayers={bTeamPlayers}
                />
              ) : null}
              {watchBox === "livestream" ? (
                <ContainDiv>
                  <LiveRoomStream
                    quarter={quarter}
                    liveAction={liveAction}
                    aTeam={aTeam}
                    bTeam={bTeam}
                  />
                </ContainDiv>
              ) : null}
              {watchBox === "teamdata" ? (
                <div>
                  <LiveRoomData
                    quarter={quarter}
                    aTeamData={aTeamData}
                    bTeamData={bTeamData}
                  />
                </div>
              ) : null}
            </WactchContentBox>
          </ContentContainer>
        </FullPageContainer>
      ) : null}
    </>
  );
}

LiveRoom.propTypes = {
  gameName: PropTypes.string,
  pastGameName: PropTypes.string,
  liveGameRoutes: PropTypes.array,
};

export default LiveRoom;
