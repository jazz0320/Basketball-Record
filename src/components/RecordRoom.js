// import React, { useEffect, useState } from "react";

import { useEffect, useState } from "react";

function RecordRoom(props) {
  const [reverseLiveAction, setReverseLiveAction] = useState();
  useEffect(() => {
    let a = [...props.liveAction];
    a.reverse();
    setReverseLiveAction(a);
  }, [props.liveAction]);

  return (
    <>
      {/* <div>
        {props.quarter &&
          props.quarter.map((q, index) => <span key={index}>{q}</span>)}
      </div> */}
      <div
        className="text-2xl mt-2 overflow-y-scroll"
        style={{ width: "70vh", height: "9vh" }}
      >
        {reverseLiveAction?.map((item, index) => (
          <div key={index}>
            <span>
              {item.minutes}:{item.seconds}
            </span>
            <span> , </span>
            <span>{item.team ? props.aTeam : props.bTeam}</span>
            <span> , </span>
            <span>{item.playerId}</span>
            <span> , </span>
            <span>{item.location}</span>
            <span> , </span>
            <span>{item.actionWord}</span>
            <span> , </span>
            <span>+{item.count}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecordRoom;
