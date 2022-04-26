import { useEffect, useState, useReducer, useRef } from "react";

function Test() {
  useEffect(() => {
    window.addEventListener("gamepadconnected", (event) => {
      console.log("Gamepad connected");
      console.log(event.gamepad);
    });
  }, []);

  return <div>test</div>;
}

export default Test;
