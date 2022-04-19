import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, db } from "../utils/firebase";

function LiveRoom(props) {
  const [liveAction, setLiveAction] = useState();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "game_data", "live_game"), (doc) => {
      console.log("Current data: ", doc.data().live_action);
      setLiveAction(doc.data().live_action);
    });
    // unsub();
  }, []);

  return (
    <>
      <div>{liveAction ? liveAction[0].action : ""}</div>
      {/* <div>
        {props.quarter &&
          props.quarter.map((q, index) => <span key={index}>{q}</span>)}
      </div>
      <div>
        {props.liveAction?.map((item, index) => (
          <div key={index}>
            <span>{item.team ? props.aTeam : props.bTeam}</span>
            <span> , </span>
            <span>
              {item.team
                ? props.aTeamPlayers[item.player]["name"]
                : props.bTeamPlayers[item.player]["name"]}
            </span>
            <span> , </span>
            <span>{item.location}</span>
            <span> , </span>
            <span>得{item.count}分</span>
          </div>
        ))}
      </div> */}
    </>
  );
}

export default LiveRoom;
