import { useEffect, useState, useRef } from "react";
import { doc, db, setDoc } from "../utils/firebase";
import styled from "styled-components";

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
  font-size: 24px;
  align-items: center;
  width: 110px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ShotClock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70px;
  font-size: 24px;
`;

const Button = styled.button`
  height: 30px;
  padding: 1px 5px;
  font-size: 16px;
  border: 1px solid white;
  background-color: #343a40;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  transition: all 0.1s ease-in;
  ::-moz-focus-inner {
    border: 0;
  }
  &:hover {
    background-color: #495057;
    ${() => `transform: translateY(-3px)`}
  }
  &:active {
    background-color: ${() => "#212529"};
  }
`;

const ButtonForChangeTime = styled.button`
  color: #f8f9fa;
  background-color: transparent;
  cursor: pointer;
  border: 0px;
  &:hover {
    background: gray;
    color: black;
  }
`;

const SelectQuarter = styled.select`
  width: 60px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(3px);
  -webkit-appearance: none;
  height: 3rem;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 200px;
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
          clearInterval(interval.current);

          timeFreeze.current = true;
        } else {
          setShotClock(shotClockDistance);
          props.setTimerMinutes(minutes);
          props.setTimerSeconds(seconds);
        }
      }, 100);
    } else {
      if (timeFreeze.current === true) {
        alert("繼續");
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
            clearInterval(interval.current);

            timeFreeze.current = true;
          } else {
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
          clearInterval(interval.current);

          timeFreeze.current = true;
        } else {
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

  useEffect(() => {
    stop();
  }, [props.affectTimeStopBehavior]);

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
      <SelectQuarter
        onChange={(e) => props.setQuarterNow(Number(e.target.value))}
      >
        <option value={1}>1st</option>
        <option value={2}>2nd</option>
        <option value={3}>3rd</option>
        <option value={4}>4th</option>
      </SelectQuarter>

      <BigClock>
        <ButtonForChangeTime
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
          <i className="fa-solid fa-angle-left"></i>
        </ButtonForChangeTime>

        <div>
          {props.timerMinutes < 10 ? "0" : ""}
          {props.timerMinutes}:{props.timerSeconds < 10 ? "0" : ""}
          {props.timerSeconds}
        </div>

        <ButtonForChangeTime
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
          <i className="fa-solid fa-angle-right"></i>
        </ButtonForChangeTime>
      </BigClock>
      <ShotClock>
        <ButtonForChangeTime
          onClick={() => {
            setShotClockRestTime(shotClockRestTime + 1000);
            setShotClock(shotClock + 1);
          }}
        >
          <i className="fa-solid fa-angle-left"></i>
        </ButtonForChangeTime>

        <div>{shotClock}</div>

        <ButtonForChangeTime
          onClick={() => {
            setShotClockRestTime(shotClockRestTime - 1000);
            setShotClock(shotClock - 1);
          }}
        >
          <i className="fa-solid fa-angle-right"></i>
        </ButtonForChangeTime>
      </ShotClock>
      <TimerContainer>
        <div>
          <Button onClick={reset24seconds}>重置24秒</Button>
        </div>
        <div>
          <Button onClick={stop}>暫停</Button>
        </div>
        <div>
          <Button onClick={startTime}>開始</Button>
        </div>
      </TimerContainer>
    </TimeBlock>
  );
}

export default Clock;
