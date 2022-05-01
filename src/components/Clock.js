import React, { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";
import styled from "styled-components";
import {
  ButtonForChange,
  Select_Player,
  ButtonSubmit,
} from "../utils/StyleComponent";

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

  const TimeBlock = styled.div`
    height: 110px;
    width: 18vw;
    background-color: #343a40;
    display: flex;
    justify-content: center;
    div {
      color: #f8f9fa;
    }
  `;
  const BigClock = styled.div`
    /* position: "relative"; */
  `;

  return (
    <TimeBlock>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select_Player
          style={{ width: "80px" }}
          onChange={(e) => props.setQuarterNow(Number(e.target.value))}
        >
          <option value={1}>1st</option>
          <option value={2}>2nd</option>
          <option value={3}>3rd</option>
          <option value={4}>4th</option>
        </Select_Player>
      </div>

      <BigClock
      // className={`clock_tick ${props.timerSeconds === false ? "none" : ""}`}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonForChange
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
            <i
              className="fa-solid fa-angle-up"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </div>
        <div style={{ fontSize: "36px" }}>
          {props.timerMinutes < 10 ? "0" : ""}
          {props.timerMinutes}:{props.timerSeconds < 10 ? "0" : ""}
          {props.timerSeconds}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonForChange
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
            <i
              className="fa-solid fa-angle-down"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </div>
      </BigClock>
      <div style={{ marginLeft: "15px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonForChange
            onClick={() => {
              setShotClockRestTime(shotClockRestTime + 1000);
              setShotClock(shotClock + 1);
            }}
          >
            <i
              className="fa-solid fa-angle-up"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </div>
        <div style={{ fontSize: "36px" }}>{shotClock}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonForChange
            onClick={() => {
              setShotClockRestTime(shotClockRestTime - 1000);
              setShotClock(shotClock - 1);
            }}
          >
            <i
              className="fa-solid fa-angle-down"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "120px",
          marginLeft: "20px",
        }}
      >
        <div>
          <ButtonSubmit
            onClick={reset24seconds}
            style={{
              height: "30px",
              padding: "0px",
              fontSize: "20px",
              margin: "0px",
              marginTop: "15px",
              border: "1px solid white",
            }}
          >
            重置24秒
          </ButtonSubmit>
        </div>
        <div>
          <ButtonSubmit
            style={{
              height: "30px",
              padding: "0px",
              fontSize: "20px",
              margin: "0px",
              border: "1px solid white",
            }}
            onClick={stop}
          >
            暫停
          </ButtonSubmit>
        </div>
        <div>
          <ButtonSubmit
            style={{
              height: "30px",
              padding: "0px",
              fontSize: "20px",

              margin: "0px",
              marginLeft: "10px",
              border: "1px solid white",
            }}
            onClick={startTime}
          >
            開始
          </ButtonSubmit>
        </div>
      </div>
    </TimeBlock>
  );
}

export default Clock;
