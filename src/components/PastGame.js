import { useEffect, useState } from "react";
import { collection, doc, db, getDoc } from "../utils/firebase";
import "./LiveRoom.css";

function PastGame(props) {
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
  }, []);

  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            style={{
              backgroundSize: "cover",
              height: "130px",
              width: "130px",
              backgroundImage: `url(${aTeamLogo})`,
            }}
          ></div>
          <table>
            <thead>
              <tr>
                <th>隊伍</th>
                {quarter ? quarter.map((item, index) => <th>{item}</th>) : null}
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
              height: "130px",
              width: "130px",
              backgroundImage: `url(${bTeamLogo})`,
            }}
          ></div>
        </div>
        <div id="radio">
          <span
            className="round button"
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
            文字直播{" "}
          </span>

          <span
            className="round button"
            id={watchBox === "teamdata" ? "checkbutton" : null}
            onClick={() => {
              setWatchBox("teamdata");
            }}
          >
            {" "}
            球隊數據{" "}
          </span>
        </div>
        {watchBox === "boxscore" ? (
          <div>
            Boxscroe
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
            Livestream
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
            Teamdata
            <TeamData
              quarter={quarter}
              aTeamData={aTeamData}
              bTeamData={bTeamData}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PastGame;

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
      <table>
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
    console.log("qN", quarteNowLive);
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
      <div>
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
                <div key={index} style={{ display: "flex" }}>
                  <div style={{ width: "43vw" }}>
                    {item.team === true ? (
                      <>
                        <span>{item.team ? props.aTeam : props.bTeam}</span>
                        <span> , </span>
                        <span>{item.playerId}</span>
                        <span> , </span>
                        <span>{item.location}</span>
                        <span> , </span>
                        <span>得{item.count}分</span>
                      </>
                    ) : null}
                  </div>

                  <div
                    style={{
                      width: "14vw",
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

                  <div style={{ width: "43vw" }}>
                    {item.team === false ? (
                      <>
                        <span>{item.team ? props.aTeam : props.bTeam}</span>
                        <span> , </span>
                        <span>{item.playerId}</span>
                        <span> , </span>
                        <span>{item.location}</span>
                        <span> , </span>
                        <span>得{item.count}分</span>
                      </>
                    ) : null}
                  </div>
                </div>
              ))
          : actionNow
          ? actionNow
              .slice()
              .reverse()
              ?.map((item, index) => (
                <div
                  key={index}
                  style={{ display: "flex", textAlign: "center" }}
                >
                  <div style={{ width: "43vw" }}>
                    {item.team === true ? (
                      <>
                        <span>{item.team ? props.aTeam : props.bTeam}</span>
                        <span> , </span>
                        <span>{item.playerId}</span>
                        <span> , </span>
                        <span>{item.location}</span>
                        <span> , </span>
                        <span>得{item.count}分</span>
                      </>
                    ) : null}
                  </div>

                  <div style={{ width: "14vw" }}>
                    <span>
                      {item.minutes}:{item.seconds}
                    </span>
                  </div>

                  <div style={{ width: "43vw" }}>
                    {item.team === false ? (
                      <>
                        <span>{item.team ? props.aTeam : props.bTeam}</span>
                        <span> , </span>
                        <span>{item.playerId}</span>
                        <span> , </span>
                        <span>{item.location}</span>
                        <span> , </span>
                        <span>得{item.count}分</span>
                      </>
                    ) : null}
                  </div>
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
          <div>
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
    <>
      <div
        style={{
          display: "flex",
          maxWidth: "300px",
        }}
      >
        <div
          style={{
            width: `${props.widthA}px`,
            height: "12px",
            backgroundColor: "silver",
          }}
        />
        <div style={{ height: "20px", width: "120px", textAlign: "center" }}>
          {props.label}
        </div>
        <div
          style={{
            width: `${props.widthB}px`,
            height: "12px",
            backgroundColor: "silver",
          }}
        />
      </div>
    </>
  );
}
