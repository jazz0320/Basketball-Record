import React, { useEffect, useState, useRef } from "react";

function Clock(props) {
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  //timer
  let interval = useRef();

  let timePast = 0;
  const startTimer = () => {
    interval = setInterval(() => {
      const duration = props.eachTime * 60 * 1000;
      const distance = duration - timePast;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      timePast += 1000;
      console.log("tt", timePast);
      console.log("dd", distance);
      console.log("seconds", seconds);
      if (distance < 0) {
        //stop timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  //componentDidMount
  useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
    startTimer();
  }, [props.finishSetting]);

  return (
    <div className="clock_container">
      <div className={`clock_tick ${timerSeconds === false ? "none" : ""}`}>
        大錶
        <span className="timer">
          {timerMinutes < 10 ? "0" : ""}
          {timerMinutes}
        </span>
        :
        <span className="timer">
          {timerSeconds < 10 ? "0" : ""}
          {timerSeconds}
        </span>
      </div>
    </div>
  );
}

export default Clock;
