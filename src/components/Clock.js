import React, { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";
import styled from "styled-components";
import {
  ButtonForChange,
  SelectPlayer,
  ButtonSubmit,
  GeneralDiv,
} from "../utils/StyleComponent";

const TimeBlock = styled.div`
  height: 50px;
  width: 500px;
  background-color: #343a40;
  display: flex;
  justify-content: space-around;
  border-radius: 5px 0 0 5px;
  div {
    color: #f8f9fa;
  }
`;
const BigClock = styled.div`
  align-items: center;
  width: 110px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

function Clock(props) {
  const [restTime, setRestTime] = useState();
  const [shotClockRestTime, setShotClockRestTime] = useState(0);
  const [shotClock, setShotClock] = useState(24);
  const timeFreeze = useRef(true);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    if (props.restartGameTime.current !== undefined) {
      setRestTime(props.restartGameTime.current * 1000);
      const minutes = Math.floor(props.restartGameTime.current / 60);
      const seconds = Math.floor(
        Math.floor(props.restartGameTime.current % 60)
      );
      props.setTimerMinutes(minutes);
      props.setTimerSeconds(seconds);
      setGameStart(true);
    }
    if (props.restartGameShotTime.current !== undefined) {
      setShotClockRestTime(props.restartGameShotTime.current);
    }
  }, [props.restartGameTime.current, props.restartGameShotTime.current]);

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
          console.log("abc", distance);
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
    if (e.key === "r") {
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
  //       doc(db, "live_game", props.liveGameName.current),
  //       {
  //         time_shotClock: Number(shotClock),
  //       },
  //       { merge: true }
  //     );
  //   }
  //   gameTime();
  // }, [shotClock]);

  useEffect(() => {
    async function gameTime() {
      await setDoc(
        doc(db, "live_game", props.liveGameName.current),
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
    <TimeBlock>
      <GeneralDiv display="flex" alignItems="center">
        <SelectPlayer
          width="60px"
          fontSize="30px"
          color="white"
          className="cursor-pointer"
          onChange={(e) => props.setQuarterNow(Number(e.target.value))}
        >
          <option value={1}>1st</option>
          <option value={2}>2nd</option>
          <option value={3}>3rd</option>
          <option value={4}>4th</option>
        </SelectPlayer>
      </GeneralDiv>

      <BigClock>
        <GeneralDiv display="flex" justifyContent="center">
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
              className="fa-solid fa-angle-left"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </GeneralDiv>
        <div className="cursor-default" style={{ fontSize: "24px" }}>
          {props.timerMinutes < 10 ? "0" : ""}
          {props.timerMinutes}:{props.timerSeconds < 10 ? "0" : ""}
          {props.timerSeconds}
        </div>
        <GeneralDiv display="flex" justifyContent="center">
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
              className="fa-solid fa-angle-right"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </GeneralDiv>
      </BigClock>
      <GeneralDiv
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        width="70px"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonForChange
            onClick={() => {
              setShotClockRestTime(shotClockRestTime + 1000);
              setShotClock(shotClock + 1);
            }}
          >
            <i
              className="fa-solid fa-angle-left"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </div>
        <div className="cursor-default" style={{ fontSize: "24px" }}>
          {shotClock}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ButtonForChange
            onClick={() => {
              setShotClockRestTime(shotClockRestTime - 1000);
              setShotClock(shotClock - 1);
            }}
          >
            <i
              className="fa-solid fa-angle-right"
              style={{ fontSize: "24px" }}
            ></i>
          </ButtonForChange>
        </div>
      </GeneralDiv>
      <GeneralDiv
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
        width="200px"
      >
        <div>
          <ButtonSubmit
            onClick={reset24seconds}
            style={{
              height: "30px",
              padding: "1px 5px",
              fontSize: "16px",
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
              padding: "1px 5px",
              fontSize: "16px",
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
              padding: "1px 5px",
              fontSize: "16px",
              margin: "0px",
              marginLeft: "5px",
              border: "1px solid white",
            }}
            onClick={startTime}
          >
            開始
          </ButtonSubmit>
        </div>
      </GeneralDiv>
    </TimeBlock>
  );
}

export default Clock;
