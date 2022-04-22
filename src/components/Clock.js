import React, { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";

function Clock(props) {
  const [restTime, setRestTime] = useState();
  const [shotClockRestTime, setShotClockRestTime] = useState(0);
  const [shotClock, setShotClock] = useState(24);
  const [timeStop, setTimeStop] = useState(true);
  const [gameStart, setGameStart] = useState(false);

  //timer
  let interval = useRef();
  let timePast = 0;
  let shotClockTimepast = 0;
  const shotClockDuration = 24000;

  const action = function (e) {
    if (e.ctrlKey && e.key === "c") {
      if (timeStop === true) {
        startTime();
      } else if (timeStop === false) {
        stop();
      }
    } else if (e.key === "c") {
      reset24seconds();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", action);
  }, []);

  const startTime = function () {
    if (gameStart === false) {
      setGameStart(true);
      alert("開始");
      setTimeStop(false);
      interval.current = setInterval(() => {
        const duration = props.eachTime * 60 * 1000;
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
          console.log("startTTT");
          clearInterval(interval.current);
          setTimeStop(true);
        } else {
          //update timer
          setShotClock(shotClockDistance);
          props.setTimerMinutes(minutes);
          props.setTimerSeconds(seconds);
        }
      }, 100);
    } else {
      if (timeStop === true) {
        alert("繼續");
        setTimeStop(false);
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

          console.log("ssssccccc", shotClockTimepast);
          const shotClockDistance = shotClockRestTime - shotClockTimepast;
          shotClockTimepast += 100;
          setShotClockRestTime(shotClockDistance);

          console.log("ssss1", shotClockRestTime);
          console.log("ssss2", shotClockTimepast);
          console.log("ssss3", shotClockDistance);

          if ((distance < 0) | (shotClockDistance < 0)) {
            //stop timer
            console.log("startCCCC");
            clearInterval(interval.current);
            setTimeStop(true);
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
    alert("暫停");
    clearInterval(interval.current);
    setTimeStop(true);
  };

  const reset24seconds = function () {
    setShotClockRestTime(24000);
    setShotClock(24);
    if (timeStop === false) {
      console.log("work");
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
          setTimeStop(true);
        } else {
          //update timer

          setShotClock(shotClockDistance / 1000);
          props.setTimerMinutes(minutes);
          props.setTimerSeconds(seconds);
        }
      }, 100);
    }
  };

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

      <button
        onClick={() => {
          stop();
        }}
      >
        暫停
      </button>
      <button
        onClick={() => {
          startTime();
        }}
      >
        開始
      </button>
    </div>
  );
}

export default Clock;
