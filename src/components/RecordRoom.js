// import React, { useEffect, useState } from "react";

function RecordRoom(props) {
  return (
    <div>
      {props.quarter &&
        props.quarter.map((q, index) => <span key={index}>{q}</span>)}
    </div>
  );
}

export default RecordRoom;
