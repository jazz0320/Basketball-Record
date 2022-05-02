import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, db } from "../utils/firebase";
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
    // unsub();
  }, [props.gameName]);

  const data = [
    {
      name: "Nike",
      value: 90,
    },
    {
      name: "Adidas",
      value: 60,
    },
    {
      name: "New Balance",
      value: 114,
    },
  ];

  return (
    <>
      {endGame ? (
        <div>比賽結束</div>
      ) : finishSetting ? (
        <div
          className="flex justify-center bg-coolors_6"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="flex justify-center flex-wrap w-10/12 bg-white">
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
            <div className="h-5/6">
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
                    data={data}
                    quarter={quarter}
                    aTeamData={aTeamData}
                    bTeamData={bTeamData}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
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
        style={{ width: "80vw" }}
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
      <div>
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
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="mt-5">
            {barData
              ? dataKeys?.map((item, index) => (
                  <Bar
                    widthA={barData[item]["A"]}
                    widthB={barData[item]["B"]}
                    label={item}
                    key={index}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

function Bar(props) {
  return (
    <div className="mb-3">
      <div
        style={{
          display: "flex",
          maxWidth: "300px",
        }}
      >
        <div
          className="mr-2"
          style={{
            width: `${props.widthA}px`,
            height: "12px",
            backgroundColor: "silver",
          }}
        />
        <div
          className="bg-coolors_2"
          style={{ height: "25px", width: "120px", textAlign: "center" }}
        >
          {props.label}
        </div>
        <div
          className="ml-2"
          style={{
            width: `${props.widthB}px`,
            height: "12px",
            backgroundColor: "silver",
          }}
        />
      </div>
    </div>
  );
}

{
  /* <Bar
  width={Object.values(barData[item])}
  widthB={barData[item].B}
  key={index}
/>; */
}
