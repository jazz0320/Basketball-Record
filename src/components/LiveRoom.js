import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, db } from "../utils/firebase";
import { GeneralDiv, GeneralButton } from "../utils/StyleComponent";
import "./LiveRoom.css";

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
          console.log("Current data: ", doc.data().A_team_data);
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
        let data = docSnap.data();
        console.log("aaa", data);
        setLiveAction(docSnap.data().live_action);
        setQuarter(docSnap.data().quarter);
        setATeam(docSnap.data().A_team);
        setATeamLogo(docSnap.data().A_team_logo);
        setATeamPlayers(docSnap.data().A_team_player);
        setBTeamPlayers(docSnap.data().B_team_player);
        setATeamData(docSnap.data().A_team_data);
        setBTeam(docSnap.data().B_team);
        setBTeamLogo(docSnap.data().B_team_logo);
        setBTeamData(docSnap.data().B_team_data);
        setFinishSetting(docSnap.data().finishSetting);
        setEndGame(docSnap.data().endGame);
      }
      loading();
    } else {
      alert("比賽即將到來，敬請期待");
    }

    // unsub();
  }, [props.gameName]);

  return (
    <>
      {!props.pastGameName && endGame ? (
        <div>比賽結束</div>
      ) : finishSetting ? (
        <GeneralDiv
          height="100vh"
          display="flex"
          justifyContent="center"
          backgroundColor="#e9ecef"
        >
          <GeneralDiv
            height="100vh"
            width="80vw"
            display="flex"
            justifyContent="center"
            backgroundColor="#f8f9fa"
            className="flex justify-center flex-wrap w-10/12 bg-white"
          >
            <div className="w-screen h-fit flex justify-around items-center">
              <div
                // className="h-"
                style={{
                  backgroundSize: "cover",
                  height: "170px",
                  width: "170px",
                  backgroundImage: `url(${aTeamLogo})`,
                }}
              ></div>
              <table
                className="bg-coolors_8 text-xl text-coolors_1 text-center rounded border-none border-separate w-4/12 h-28"
                cellPadding="10"
                border="1"
              >
                <thead>
                  <tr>
                    <th>隊伍</th>
                    {quarter
                      ? quarter.map((item, index) => <th>{item}</th>)
                      : null}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{aTeam}</td>
                    {quarter
                      ? quarter.map((item, index) => (
                          <td>
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
                          <td>
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
              <div
                style={{
                  backgroundSize: "cover",
                  height: "170px",
                  width: "170px",
                  backgroundImage: `url(${bTeamLogo})`,
                }}
              ></div>
            </div>
            <div
              className="w-screen flex justify-center h-fit items-center mb-3"
              id="radio"
            >
              <span
                className="round button flex justify-center items-center"
                id={watchBox === "boxscore" ? "checkbutton" : null}
                onClick={() => {
                  setWatchBox("boxscore");
                }}
              >
                {" "}
                Box-score{" "}
              </span>

              <span
                id={watchBox === "livestream" ? "checkbutton" : null}
                className="round button"
                onClick={() => {
                  setWatchBox("livestream");
                }}
              >
                {" "}
                Live-Stream{" "}
              </span>

              <span
                className="round button"
                id={watchBox === "teamdata" ? "checkbutton" : null}
                onClick={() => {
                  setWatchBox("teamdata");
                }}
              >
                {" "}
                Team-Data{" "}
              </span>
            </div>
            <GeneralDiv height="75vh">
              {watchBox === "boxscore" ? (
                <div>
                  <Boxscore
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
      ) : (
        <div>比賽尚未開始</div>
      )}
    </>
  );
}

export default LiveRoom;

function Boxscore(props) {
  const [selectTeam, setSelectTeam] = useState("ateam");
  return (
    <>
      <GeneralDiv width="75vw" overflowX="scroll">
        <div id="radio">
          <span
            className="round button"
            id={selectTeam === "ateam" ? "checkbutton" : null}
            onClick={() => {
              setSelectTeam("ateam");
            }}
          >
            {props.aTeam}
          </span>

          <span
            id={selectTeam === "bteam" ? "checkbutton" : null}
            className="round button"
            onClick={() => {
              setSelectTeam("bteam");
            }}
          >
            {props.bTeam}
          </span>
        </div>
        <table
          className="bg-coolors_8 text-xl text-coolors_1 text-center rounded border-none border-separate"
          cellPadding="10"
          border="1"
        >
          <thead>
            <tr>
              <th>PLAYER</th>
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
                    <td>{players.id}</td>
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
                    <td>{players.id}</td>
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
        </table>
      </GeneralDiv>
    </>
  );
}

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
            <span
              key={index}
              className="round button"
              id={quarteNowLive === index ? "checkbutton" : null}
              onClick={() => {
                setQuarterNowLive(index);
              }}
            >
              {" "}
              {q}{" "}
            </span>
          ))}
        <span
          className="round button"
          id={quarteNowLive === props.quarter.length ? "checkbutton" : null}
          onClick={() => {
            setQuarterNowLive(props.quarter.length);
          }}
        >
          {" "}
          All{" "}
        </span>
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {quarteNowLive === props.quarter.length
          ? props.liveAction
              .slice()
              .reverse()
              ?.map((item, index) => (
                <div key={index} className="flex mt-2 drop-shadow-lg">
                  {item.team === true ? (
                    <GeneralDiv
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      width="33vw"
                      backgroundColor="#e9ecef"
                    >
                      <span>{item.team ? props.aTeam : props.bTeam}</span>
                      <span> , </span>
                      <span>{item.playerId}</span>
                      <span> , </span>
                      <span>{item.location}</span>
                      <span> , </span>
                      <span>得{item.count}分</span>

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
                    <span>第{item.quarterNow}節</span>
                    <span>
                      {item.minutes}:{item.seconds}
                    </span>
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
                      <span>{item.team ? props.aTeam : props.bTeam}</span>
                      <span> , </span>
                      <span>{item.playerId}</span>
                      <span> , </span>
                      <span>{item.location}</span>
                      <span> , </span>
                      <span>得{item.count}分</span>
                      {/* </div> */}
                    </GeneralDiv>
                  ) : (
                    <GeneralDiv width="33vw" />
                  )}
                </div>
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
                    <div
                      className=" bg-coolors_2 flex justify-end items-center"
                      style={{ width: "25vw" }}
                    >
                      <span>{item.team ? props.aTeam : props.bTeam}</span>
                      <span> , </span>
                      <span>{item.playerId}</span>
                      <span> , </span>
                      <span>{item.location}</span>
                      <span> , </span>
                      <span>得{item.count}分</span>

                      <div className="pr-1 pl-5">
                        <img
                          className="h-14 w-16 rounded-full"
                          src={`${item.playerPic}`}
                        ></img>
                      </div>
                    </div>
                  ) : (
                    <div key={index} style={{ width: "25vw" }}></div>
                  )}

                  <div
                    className="bg-coolors_4 mx-5 py-1 items-center flex justify-center"
                    style={{ width: "8vw" }}
                  >
                    <span>
                      {item.minutes}:{item.seconds}
                    </span>
                  </div>

                  {item.team === false ? (
                    <div
                      className="text-left bg-coolors_2 flex items-center"
                      style={{ width: "25vw" }}
                    >
                      <div className="pr-5 pl-1">
                        <img
                          className="h-14 w-16 rounded-full"
                          src={`${item.playerPic}`}
                        ></img>
                      </div>
                      <span>{item.team ? props.aTeam : props.bTeam}</span>
                      <span> , </span>
                      <span>{item.playerId}</span>
                      <span> , </span>
                      <span>{item.location}</span>
                      <span> , </span>
                      <span>得{item.count}分</span>
                    </div>
                  ) : (
                    <div style={{ width: "25vw" }}></div>
                  )}
                </div>
              ))
          : null}
      </div>
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
            <span
              key={index}
              className="round button"
              id={quarterNowData === index ? "checkbutton" : null}
              onClick={() => {
                setQuarterNowData(index);
              }}
            >
              {" "}
              {q}{" "}
            </span>
          ))}
        <span
          className="round button"
          id={quarterNowData === props.quarter.length ? "checkbutton" : null}
          onClick={() => {
            setQuarterNowData(props.quarter.length);
          }}
        >
          {" "}
          All{" "}
        </span>
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
        {/* <div
          className="flex justify-center"
          style={{ width: "60vw", border: "1px solid black" }}
        > */}
        <div
          className="mt-3"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "0.5vh 0",
          }}
        >
          {console.log("bbb", barData)}
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
          {props.widthA * 100}%
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
          {props.widthB * 100}%
        </div>
      </div>
    </div>
  );
}
