import { useEffect, useState } from "react";
import styled from "styled-components";

const ScoreBox = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  transition-duration: 0.5s;
  display: flex;
  z-index: 4;
`;

const IconComponet = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 100%;
  color: ${(props) => (props.$focus ? "#adb5bd" : "white")};
  border: ${(props) => (props.$focus ? "5px solid black" : null)};
  text-decoration: none;
  :hover {
    width: 70px;
    height: 70px;
  }
  :active {
    background-color: rgb(41, 41, 41);
  }
`;

const ScoreIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const LastRecordBox = styled.div`
  margin-top: 5px;
  transition-duration: 0.5s;
  width: ${(props) => (props.pagesize ? "740px" : "80vw")};
  padding: 5px;
  height: ${(props) => (props.pagesize ? "50px" : "8vh")};
  color: black;
  background-color: #f8f9fa;
  border-radius: 5px 5px 0 0;
  font-size: 16px;
  overflow-y: hidden;
  box-shadow: 0px 0px 5px 5px rgba(108, 117, 125, 0.4);
  &:hover {
    overflow-y: scroll;
  }
`;

function RecordRoom(props) {
  const [reverseLiveAction, setReverseLiveAction] = useState();

  useEffect(() => {
    let a = [...props.liveAction];
    a.reverse();
    setReverseLiveAction(a);
  }, [props.liveAction]);

  return (
    <>
      <ScoreBox>
        <IconComponet onClick={() => props.setOpenGradeButton((pre) => !pre)}>
          <ScoreIcon
            src={require("../img/score/score.png")}
            alt="Watch Record"
          />
        </IconComponet>
      </ScoreBox>
      <LastRecordBox pagesize={props.pageSize[1]}>
        {reverseLiveAction?.map((item, index) => (
          <div key={index}>
            <span>
              {item.minutes}:{item.seconds}
            </span>
            <span> , </span>
            <span>{item.team ? props.aTeam : props.bTeam}</span>
            <span> , </span>
            <span>{item.playerId}</span>
            <span> , </span>
            <span>{item.location}</span>
            <span> , </span>
            <span>{item.actionWord}</span>
            <span> , </span>
            <span>+{item.count}</span>
          </div>
        ))}
      </LastRecordBox>
    </>
  );
}

export default RecordRoom;
