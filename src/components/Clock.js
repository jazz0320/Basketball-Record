import React, { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";

function Clock(props) {
  const [restTime, setRestTime] = useState();
  const [shotClockRestTime, setShotClockRestTime] = useState();
  const [shotClock, setShotClock] = useState(0);
  // const [timerMinutes, props.setTimerMinutes] = useState(0);
  // const [timerSeconds, props.setTimerSeconds] = useState(0);
  //timer
  let interval = useRef();
  let timePast = 0;
  let shotClockTimepast = 0;
  const shotClockDuration = 24000;

  useEffect(() => {
    if (props.eachTime) {
      props.setTimerMinutes(props.eachTime);
      props.setTimerSeconds(0);
      setShotClock(24);
    }
  }, [props.eachTime]);

  const startQuarterTimer = () => {
    if (props.eachTime) {
      interval.current = setInterval(() => {
        const duration = props.eachTime * 60 * 1000;
        const distance = duration - timePast;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const shotClockDistance =
          (shotClockDuration - shotClockTimepast) / 1000;

        timePast += 1000;
        shotClockTimepast += 1000;
        setRestTime(distance);
        setShotClockRestTime(shotClockDistance * 1000);
        if ((distance < 0) | (shotClockDistance < 0)) {
          //stop timer
          clearInterval(interval.current);
        } else {
          //update timer
          setShotClock(shotClockDistance);
          props.setTimerMinutes(minutes);
          props.setTimerSeconds(seconds);
        }
      }, 1000);
    }
  };

  const restartTime = function () {
    timePast = 0;
    shotClockTimepast = 0;
    interval.current = setInterval(() => {
      const distance = restTime - timePast;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      timePast += 1000;
      setRestTime(distance);

      const shotClockDistance = (shotClockRestTime - shotClockTimepast) / 1000;
      shotClockTimepast += 1000;
      setShotClockRestTime(shotClockDistance);

      if ((distance < 0) | (shotClockDistance < 0)) {
        //stop timer
        clearInterval(interval.current);
      } else {
        //update timer
        setShotClock(shotClockDistance);
        props.setTimerMinutes(minutes);
        props.setTimerSeconds(seconds);
      }
    }, 1000);
  };

  const start = function () {
    alert("開始");
    startQuarterTimer();
  };

  const stop = function () {
    alert("暫停");
    clearInterval(interval.current);
  };

  useEffect(() => {
    async function gameTime() {
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          time_shotClock: Number(shotClock),
        },
        { merge: true }
      );
    }
    gameTime();
  }, [shotClock]);

  useEffect(() => {
    async function gameTime() {
      await setDoc(
        doc(db, "game_data", "live_game"),
        {
          time_minutes: Number(props.timerMinutes),
          time_seconds: Number(props.timerSeconds),
        },
        { merge: true }
      );
    }
    gameTime();
  }, [props.timerSeconds]);

  return (
    <div>
      <select onChange={(e) => props.setQuarterNow(e.target.value)}>
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
      </div>

      <button
        onClick={() => {
          start();
        }}
      >
        開始
      </button>
      <button
        onClick={() => {
          stop();
        }}
      >
        暫停
      </button>
      <button
        onClick={() => {
          restartTime();
        }}
      >
        再開始
      </button>
    </div>
  );
}

export default Clock;
