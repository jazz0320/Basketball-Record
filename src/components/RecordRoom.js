// import React, { useEffect, useState } from "react";

function RecordRoom(props) {
  return (
    <>
      <div>
        {props.quarter &&
          props.quarter.map((q, index) => <span key={index}>{q}</span>)}
      </div>
      <div>
        {props.liveAction?.map((item, index) => (
          <div key={index}>
            <span>
              {item.minutes}:{item.seconds}
            </span>
            <span> , </span>
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
            <span>{item.actionWord}</span>
            <span> , </span>
            <span>得{item.count}分</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default RecordRoom;
