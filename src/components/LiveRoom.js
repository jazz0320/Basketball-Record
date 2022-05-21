import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, db } from "../utils/firebase";
import {
  GeneralDiv,
  GeneralSpan,
  GeneralImg,
  LiveRoomLines,
} from "../utils/StyleComponent";
import LiveRoomScore from "./LiveRoomScore";

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

  useEffect(() => {
    if (props.liveGameRoutes?.includes(props.gameName)) {
      const unsub = onSnapshot(
        doc(db, "live_game", `${props.gameName}`),
        (doc) => {
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
        }
      );
    } else if (props.pastGameName !== undefined) {
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
      loading();
    }
  }, [props.gameName]);

  return (
    <>
      {!props.pastGameName && endGame ? (
        <div>比賽結束</div>
      ) : finishSetting ? (
        <GeneralDiv
          display="flex"
          justifyContent="center"
          backgroundColor="#e9ecef"
          padding="1vh 1vw"
          width="100vw"
        >
          <GeneralDiv
            width="80vw"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            backgroundColor="#f8f9fa"
            boxShadow="0px 0px 7px 5px rgba(0, 0, 0, 0.7);"
          >
            <GeneralDiv height="100px" width="100%" />
            <div className="w-screen h-fit flex justify-around items-center">
              <GeneralDiv height="170px" width="170px">
                <GeneralImg
                  src={aTeamLogo}
                  filter="drop-shadow(-15px 15px 4px rgba(0, 0, 0, 0.5))"
                />
              </GeneralDiv>
              <table
                className="bg-coolors_8 text-xl text-coolors_1 text-center rounded border-none border-separate w-5/12 h-28"
                cellPadding="1"
                border="1"
              >
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
              </table>
              <GeneralDiv height="170px" width="170px">
                <GeneralImg
                  src={bTeamLogo}
                  filter="drop-shadow(-15px 15px 4px rgba(0, 0, 0, 0.5))"
                />
              </GeneralDiv>
            </div>
            <div
              className="w-screen flex justify-center h-fit items-center mb-3"
              id="radio"
            >
              <GeneralSpan
                borderRadius="5px"
                display="inline-block"
                padding="5px 10px"
                backgroundColor={
                  watchBox === "boxscore" ? "#5e7380" : "#f7f7f7"
                }
                color={watchBox === "boxscore" ? "#fff" : "#333"}
                cursor="pointer"
                hoverBackgroundColor="#bbb"
                hoverColor="#fff"
                onClick={() => {
                  setWatchBox("boxscore");
                }}
              >
                {" "}
                Box-score{" "}
              </GeneralSpan>

              <GeneralSpan
                borderRadius="5px"
                display="inline-block"
                padding="5px 10px"
                backgroundColor={
                  watchBox === "livestream" ? "#5e7380" : "#f7f7f7"
                }
                color={watchBox === "livestream" ? "#fff" : "#333"}
                cursor="pointer"
                hoverBackgroundColor="#bbb"
                hoverColor="#fff"
                onClick={() => {
                  setWatchBox("livestream");
                }}
              >
                {" "}
                Live-Stream{" "}
              </GeneralSpan>

              <GeneralSpan
                borderRadius="5px"
                display="inline-block"
                padding="5px 10px"
                backgroundColor={
                  watchBox === "teamdata" ? "#5e7380" : "#f7f7f7"
                }
                color={watchBox === "teamdata" ? "#fff" : "#333"}
                cursor="pointer"
                hoverBackgroundColor="#bbb"
                hoverColor="#fff"
                onClick={() => {
                  setWatchBox("teamdata");
                }}
              >
                {" "}
                Team-Data{" "}
              </GeneralSpan>
            </div>
            <GeneralDiv minHeight="70vh" maxHeight="150vh" overflowY="scroll">
              {watchBox === "boxscore" ? (
                <div>
                  <LiveRoomScore
                    aTeam={aTeam}
                    bTeam={bTeam}
                    aTeamPlayers={aTeamPlayers}
                    bTeamPlayers={bTeamPlayers}
                  />
                </div>
              ) : null}
              {watchBox === "livestream" ? (
                <div>
                  <Livestream
                    quarter={quarter}
                    liveAction={liveAction}
                    aTeam={aTeam}
                    bTeam={bTeam}
                  />
                </div>
              ) : null}
              {watchBox === "teamdata" ? (
                <div>
                  <TeamData
                    quarter={quarter}
                    aTeamData={aTeamData}
                    bTeamData={bTeamData}
                  />
                </div>
              ) : null}
            </GeneralDiv>
          </GeneralDiv>
        </GeneralDiv>
      ) : null}
    </>
  );
}

export default LiveRoom;

function Livestream(props) {
  const [quarteNowLive, setQuarterNowLive] = useState(props.quarter.length);
  const [actionNow, setActionNow] = useState();
  useEffect(() => {
    if (
      quarteNowLive === 0 ||
      quarteNowLive === 1 ||
      quarteNowLive === 2 ||
      quarteNowLive === 3
    ) {
      let result = props.liveAction.filter(
        (item) => item.quarterNow === quarteNowLive + 1
      );

      setActionNow(result);
    } else {
      setActionNow();
    }
  }, [quarteNowLive, props.liveAction]);

  return (
    <>
      <div className="flex justify-center">
        {props.quarter &&
          props.quarter.map((q, index) => (
            <GeneralSpan
              key={index}
              borderRadius="5px"
              display="inline-block"
              padding="5px 10px"
              backgroundColor={quarteNowLive === index ? "#5e7380" : "#f7f7f7"}
              color={quarteNowLive === index ? "#fff" : "#333"}
              cursor="pointer"
              hoverBackgroundColor="#bbb"
              hoverColor="#fff"
              onClick={() => {
                setQuarterNowLive(index);
              }}
            >
              {" "}
              {q}{" "}
            </GeneralSpan>
          ))}
        <GeneralSpan
          borderRadius="5px"
          display="inline-block"
          padding="5px 10px"
          backgroundColor={
            quarteNowLive === props.quarter.length ? "#5e7380" : "#f7f7f7"
          }
          color={quarteNowLive === props.quarter.length ? "#fff" : "#333"}
          cursor="pointer"
          hoverBackgroundColor="#bbb"
          hoverColor="#fff"
          onClick={() => {
            setQuarterNowLive(props.quarter.length);
          }}
        >
          {" "}
          All{" "}
        </GeneralSpan>
      </div>
      <GeneralDiv display="flex" flexWrap="wrap" justifyContent="center">
        {quarteNowLive === props.quarter.length
          ? props.liveAction
              .slice()
              .reverse()
              ?.map((item, index) => (
                <>
                  <div key={index} className="flex mt-2 drop-shadow-lg">
                    {item.team === true ? (
                      <GeneralDiv
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        width="33vw"
                        backgroundColor="#e9ecef"
                      >
                        <LiveRoomLines spanFontSize="14px">
                          <GeneralSpan>
                            {item.team ? props.aTeam : props.bTeam}
                          </GeneralSpan>
                          <GeneralSpan> , </GeneralSpan>
                          <GeneralSpan>{item.playerId}</GeneralSpan>
                          <GeneralSpan> , </GeneralSpan>
                          <GeneralSpan>{item.location}</GeneralSpan>
                          <GeneralSpan> , </GeneralSpan>
                          <GeneralSpan>
                            {item.actionWord}+{item.count}
                          </GeneralSpan>
                        </LiveRoomLines>

                        <div className="pr-1 pl-5">
                          <img
                            className="h-14 w-16 rounded-full"
                            src={`${item.playerPic}`}
                          ></img>
                        </div>
                      </GeneralDiv>
                    ) : (
                      <GeneralDiv width="33vw" />
                    )}

                    <div
                      className="bg-coolors_4 mx-5 py-1 items-center"
                      style={{
                        width: "8vw",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <GeneralSpan>第{item.quarterNow}節</GeneralSpan>
                      <GeneralSpan>
                        {item.minutes}:{item.seconds < 10 ? "0" : null}
                        {item.seconds}
                      </GeneralSpan>
                    </div>

                    {item.team === false ? (
                      <GeneralDiv
                        display="flex"
                        alignItems="center"
                        width="33vw"
                        backgroundColor="#e9ecef"
                      >
                        <div className="pr-5 pl-1">
                          <img
                            className="h-14 w-16 rounded-full"
                            src={`${item.playerPic}`}
                          ></img>
                        </div>
                        <LiveRoomLines spanFontSize="14px">
                          <GeneralSpan>
                            {item.team ? props.aTeam : props.bTeam}
                          </GeneralSpan>
                          <GeneralSpan> , </GeneralSpan>
                          <GeneralSpan>{item.playerId}</GeneralSpan>
                          <GeneralSpan> , </GeneralSpan>
                          <GeneralSpan>{item.location}</GeneralSpan>
                          <GeneralSpan> , </GeneralSpan>
                          <GeneralSpan>
                            {item.actionWord}+{item.count}
                          </GeneralSpan>
                        </LiveRoomLines>
                      </GeneralDiv>
                    ) : (
                      <GeneralDiv width="33vw" />
                    )}
                  </div>
                </>
              ))
          : actionNow
          ? actionNow
              .slice()
              .reverse()
              ?.map((item, index) => (
                <div
                  key={index}
                  className="flex mt-2 drop-shadow-lg"
                  style={{ display: "flex", textAlign: "center" }}
                >
                  {item.team === true ? (
                    <GeneralDiv
                      display="flex"
                      alignItems="center"
                      width="33vw"
                      backgroundColor="#e9ecef"
                    >
                      <LiveRoomLines spanFontSize="14px">
                        <GeneralSpan>
                          {item.team ? props.aTeam : props.bTeam}
                        </GeneralSpan>
                        <GeneralSpan> , </GeneralSpan>
                        <GeneralSpan>{item.playerId}</GeneralSpan>
                        <GeneralSpan> , </GeneralSpan>
                        <GeneralSpan>{item.location}</GeneralSpan>
                        <GeneralSpan> , </GeneralSpan>
                        <GeneralSpan>得{item.count}分</GeneralSpan>
                      </LiveRoomLines>
                      <div className="pr-1 pl-5">
                        <img
                          className="h-14 w-16 rounded-full"
                          src={`${item.playerPic}`}
                        ></img>
                      </div>
                    </GeneralDiv>
                  ) : (
                    <div key={index} style={{ width: "33vw" }}></div>
                  )}

                  <div
                    className="bg-coolors_4 mx-5 py-1 items-center flex justify-center"
                    style={{ width: "8vw" }}
                  >
                    <GeneralSpan>
                      {item.minutes}:{item.seconds < 10 ? "0" : null}
                      {item.seconds}
                    </GeneralSpan>
                  </div>

                  {item.team === false ? (
                    <GeneralDiv
                      display="flex"
                      alignItems="center"
                      width="33vw"
                      backgroundColor="#e9ecef"
                    >
                      <div className="pr-5 pl-1">
                        <img
                          className="h-14 w-16 rounded-full"
                          src={`${item.playerPic}`}
                        ></img>
                      </div>
                      <LiveRoomLines spanFontSize="14px">
                        <GeneralSpan>
                          {item.team ? props.aTeam : props.bTeam}
                        </GeneralSpan>
                        <GeneralSpan> , </GeneralSpan>
                        <GeneralSpan>{item.playerId}</GeneralSpan>
                        <GeneralSpan> , </GeneralSpan>
                        <GeneralSpan>{item.location}</GeneralSpan>
                        <GeneralSpan> , </GeneralSpan>
                        <GeneralSpan>得{item.count}分</GeneralSpan>
                      </LiveRoomLines>
                    </GeneralDiv>
                  ) : (
                    <div style={{ width: "33vw" }}></div>
                  )}
                </div>
              ))
          : null}
      </GeneralDiv>
    </>
  );
}

function TeamData(props) {
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
      <div className="flex justify-center">
        {props.quarter &&
          props.quarter.map((q, index) => (
            <GeneralSpan
              key={index}
              borderRadius="5px"
              display="inline-block"
              padding="5px 10px"
              backgroundColor={quarterNowData === index ? "#5e7380" : "#f7f7f7"}
              color={quarterNowData === index ? "#fff" : "#333"}
              cursor="pointer"
              hoverBackgroundColor="#bbb"
              hoverColor="#fff"
              onClick={() => {
                setQuarterNowData(index);
              }}
            >
              {" "}
              {q}{" "}
            </GeneralSpan>
          ))}
        <GeneralSpan
          borderRadius="5px"
          display="inline-block"
          padding="5px 10px"
          backgroundColor={
            quarterNowData === props.quarter.length ? "#5e7380" : "#f7f7f7"
          }
          color={quarterNowData === props.quarter.length ? "#fff" : "#333"}
          cursor="pointer"
          hoverBackgroundColor="#bbb"
          hoverColor="#fff"
          onClick={() => {
            setQuarterNowData(props.quarter.length);
          }}
        >
          {" "}
          All{" "}
        </GeneralSpan>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "scroll",
        }}
      >
        <div
          className="mt-3"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "0.5vh 0",
          }}
        >
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
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

function Bar(props) {
  return (
    <div className="" style={{ marginBottom: "0.75vh" }}>
      <div
        style={{
          display: "flex",
          maxWidth: "90vw",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "60px" }}
        >
          {props.widthA}
        </div>
        <div
          className="flex justify-end mr-2"
          style={{
            backgroundColor: "#dee2e6",
            // border: "1px solid red",
            width: "25vw",
          }}
        >
          <div
            className=""
            style={{
              width: `${props.widthA}%`,
              height: "2.7vh",
              backgroundColor: "silver",
            }}
          />
        </div>
        <div
          style={{ height: "2.7vh", width: "100px" }}
          className="bg-coolors_2 items-center flex justify-center"
        >
          {props.label}
        </div>
        <div
          className="ml-2 "
          style={{
            backgroundColor: "#dee2e6",
            // border: "1px solid blue",
            width: "25vw",
          }}
        >
          <div
            style={{
              width: `${props.widthB}%`,
              height: "2.7vh",
              backgroundColor: "silver",
            }}
          />
        </div>
        <div
          className="flex items-center justify-center"
          style={{ width: "60px" }}
        >
          {props.widthB}
        </div>
      </div>
    </div>
  );
}

function BarPercent(props) {
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }
  return (
    <div className="" style={{ marginBottom: "0.75vh" }}>
      <div
        style={{
          display: "flex",
          maxWidth: "90vw",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: "60px" }}
        >
          {round(props.widthA * 100)}%
        </div>
        <div
          className="flex justify-end mr-2"
          style={{
            // border: "1px solid red",
            backgroundColor: "#dee2e6",
            width: "25vw",
          }}
        >
          <div
            className=""
            style={{
              width: `${props.widthA * 100}%`,
              height: "2.7vh",
              backgroundColor: "silver",
            }}
          />
        </div>
        <div
          style={{ height: "2.7vh", width: "100px" }}
          className="bg-coolors_2 items-center flex justify-center"
        >
          {props.label}
        </div>
        <div
          className="ml-2 "
          style={{
            backgroundColor: "#dee2e6",
            // border: "1px solid blue",
            width: "25vw",
          }}
        >
          <div
            style={{
              width: `${props.widthB * 100}%`,
              height: "2.7vh",
              backgroundColor: "silver",
            }}
          />
        </div>
        <div
          className="flex items-center justify-center"
          style={{ width: "60px" }}
        >
          {round(props.widthB * 100)}%
        </div>
      </div>
    </div>
  );
}
