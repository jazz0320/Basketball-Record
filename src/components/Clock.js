import React, { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";

function Clock(props) {
  const [restTime, setRestTime] = useState();
  const [shotClockRestTime, setShotClockRestTime] = useState(0);
  const [shotClock, setShotClock] = useState(24);
  const timeFreeze = useRef(true);
  const [gameStart, setGameStart] = useState(false);

  //timer
  let interval = useRef();
  let timePast = 0;
  let shotClockTimepast = 0;
  const shotClockDuration = 24000;

  const startTime = function () {
    if (gameStart === false && timeFreeze.current === true) {
      setGameStart(true);
      alert("開始");
      timeFreeze.current = false;
      interval.current = setInterval(() => {
        const duration = Number(props.eachQuarterTime.current) * 60 * 1000;
        const distance = duration - timePast;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const shotClockDistance =
          (shotClockDuration - shotClockTimepast) / 1000;

        timePast += 100;
        shotClockTimepast += 100;
        setRestTime(distance);
        setShotClockRestTime(shotClockDistance * 1000);
        if ((distance < 0) | (shotClockDistance < 0)) {
          //stop timer
          clearInterval(interval.current);
          // setTimeStop(true);
          timeFreeze.current = true;
        } else {
          //update timer
          setShotClock(shotClockDistance);
          props.setTimerMinutes(minutes);
          props.setTimerSeconds(seconds);
        }
      }, 100);
    } else {
      if (timeFreeze.current === true) {
        alert("繼續");
        // setTimeStop(false);
        timeFreeze.current = false;
        timePast = 0;
        shotClockTimepast = 0;
        interval.current = setInterval(() => {
          const distance = restTime - timePast;
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          timePast += 100;
          setRestTime(distance);
          const shotClockDistance = shotClockRestTime - shotClockTimepast;
          shotClockTimepast += 100;
          setShotClockRestTime(shotClockDistance);
          if ((distance < 0) | (shotClockDistance < 0)) {
            //stop timer
            clearInterval(interval.current);
            // setTimeStop(true);
            timeFreeze.current = true;
          } else {
            //update timer

            setShotClock(shotClockDistance / 1000);
            props.setTimerMinutes(minutes);
            props.setTimerSeconds(seconds);
          }
        }, 100);
      }
    }
  };

  const stop = function () {
    if (timeFreeze.current === false) {
      alert("暫停");
      clearInterval(interval.current);
      // setTimeStop(true);
      timeFreeze.current = true;
    }
  };

  const reset24seconds = function () {
    setShotClockRestTime(24000);
    setShotClock(24);
    if (timeFreeze.current === false) {
      clearInterval(interval.current);

      timePast = 0;
      shotClockTimepast = 0;
      interval.current = setInterval(() => {
        const distance = restTime - timePast;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timePast += 100;
        setRestTime(distance);

        const shotClockDistance = 24000 - shotClockTimepast;
        shotClockTimepast += 100;
        setShotClockRestTime(shotClockDistance);

        if ((distance < 0) | (shotClockDistance < 0)) {
          //stop timer
          clearInterval(interval.current);
          // setTimeStop(true);
          timeFreeze.current = true;
        } else {
          //update timer
          setShotClock(shotClockDistance / 1000);
          props.setTimerMinutes(minutes);
          props.setTimerSeconds(seconds);
        }
      }, 100);
    }
  };

  const action = function (e) {
    if (e.key === "k") {
      startTime();
    }

    if (e.key === "l") {
      stop();
    }
    if (e.key === "j") {
      reset24seconds();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", action);
    return () => {
      window.removeEventListener("keydown", action);
    };
  }, [shotClockRestTime]);
  //behavior affect time
  useEffect(() => {
    stop();
  }, [props.affectTimeStopBehavior]);
  //behavior affect shotClock
  useEffect(() => {
    reset24seconds();
  }, [props.affectShotClockBehavior]);

  // useEffect(() => {
  //   async function gameTime() {
  //     await setDoc(
  //       doc(db, "game_data", "live_game"),
  //       {
  //         time_shotClock: Number(shotClock),
  //       },
  //       { merge: true }
  //     );
  //   }
  //   gameTime();
  // }, [shotClock]);

  // useEffect(() => {
  //   async function gameTime() {
  //     await setDoc(
  //       doc(db, "game_data", "live_game"),
  //       {
  //         time_minutes: Number(props.timerMinutes),
  //         time_seconds: Number(props.timerSeconds),
  //       },
  //       { merge: true }
  //     );
  //   }
  //   gameTime();
  // }, [props.timerSeconds]);

  return (
    <div>
      <select onChange={(e) => props.setQuarterNow(Number(e.target.value))}>
        <option value={1}>1st</option>
        <option value={2}>2nd</option>
        <option value={3}>3rd</option>
        <option value={4}>4th</option>
      </select>

      <div
        className={`clock_tick ${props.timerSeconds === false ? "none" : ""}`}
      >
        大錶
        <span>
          {props.timerMinutes < 10 ? "0" : ""}
          {props.timerMinutes}
        </span>
        :
        <span>
          {props.timerSeconds < 10 ? "0" : ""}
          {props.timerSeconds}
        </span>
        <span> </span>
        <span>
          <button
            onClick={() => {
              setRestTime(restTime + 1000);
              if (props.timerSeconds < 59) {
                props.setTimerSeconds(props.timerSeconds + 1);
              } else {
                props.setTimerMinutes(props.timerMinutes + 1);
                props.setTimerSeconds(0);
              }
            }}
          >
            +1
          </button>
        </span>
        <span>
          <button
            onClick={() => {
              setRestTime(restTime - 1000);
              if (props.timerSeconds > 0) {
                props.setTimerSeconds(props.timerSeconds - 1);
              } else {
                props.setTimerMinutes(props.timerMinutes - 1);
                props.setTimerSeconds(59);
              }
            }}
          >
            -1
          </button>
        </span>
      </div>
      <div>
        小錶
        {shotClock}
        <span> </span>
        <span>
          <button
            onClick={() => {
              setShotClockRestTime(shotClockRestTime + 1000);
              setShotClock(shotClock + 1);
            }}
          >
            +1
          </button>
        </span>
        <span>
          <button
            onClick={() => {
              setShotClockRestTime(shotClockRestTime - 1000);
              setShotClock(shotClock - 1);
            }}
          >
            -1
          </button>
        </span>
        <span>
          <button onClick={reset24seconds}>重置24秒</button>
        </span>
      </div>

      <button onClick={stop}>暫停</button>
      <button onClick={startTime}>開始</button>
    </div>
  );
}

export default Clock;
