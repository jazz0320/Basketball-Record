import { useEffect, useState } from "react";
import {
  GeneralDiv,
  GeneralButton,
  ButtonSubmit,
} from "../utils/StyleComponent";

function RecordRoom(props) {
  const [reverseLiveAction, setReverseLiveAction] = useState();
  const [pointerState, setPointerState] = useState("none");
  const [hideRecord, setHideRecord] = useState(false);
  const [horizontalLeft, setHorizontalLeft] = useState(true);

  useEffect(() => {
    let a = [...props.liveAction];
    a.reverse();
    setReverseLiveAction(a);
  }, [props.liveAction]);

  return (
    <>
      {/* <div>
        {props.quarter &&
          props.quarter.map((q, index) => <span key={index}>{q}</span>)}
      </div> */}
      <GeneralDiv
        position="fixed"
        bottom={hideRecord ? "5px" : "15vh"}
        left={horizontalLeft ? "0" : null}
        right={horizontalLeft ? null : "0"}
        transitionDuration="0.5s"
      >
        <ButtonSubmit
          padding="1px 3px"
          margin=" 0 5px 0 0"
          onClick={() => {
            if (horizontalLeft === true) {
              setHorizontalLeft(false);
            } else {
              setHorizontalLeft(true);
            }
          }}
        >
          {horizontalLeft ? ">" : "<"}
        </ButtonSubmit>
        <ButtonSubmit
          width="70px"
          padding="1px 3px"
          margin=" 0 5px 0 0"
          onClick={() => {
            if (hideRecord === false) {
              setHideRecord(true);
            } else {
              setHideRecord(false);
            }
          }}
        >
          {hideRecord ? "Open" : "Close"}
        </ButtonSubmit>
        <ButtonSubmit
          width="80px"
          backgroundColor={pointerState === "none" ? null : "#d62828"}
          padding="1px 3px"
          onClick={() => {
            if (pointerState === "none") {
              setPointerState("");
            } else {
              setPointerState("none");
            }
          }}
        >
          {pointerState === "none" ? "Check" : "Cancel"}
        </ButtonSubmit>
      </GeneralDiv>
      <GeneralDiv
        transitionDuration="0.5s"
        position="fixed"
        bottom="0"
        left={horizontalLeft ? "0" : null}
        right={horizontalLeft ? null : "0"}
        width={hideRecord ? "0px" : "45vw"}
        padding={hideRecord ? "0px" : "5px"}
        height={hideRecord ? "0px" : "15vh"}
        backgroundColor={
          pointerState === "none"
            ? "rgba(206, 212, 218,0.4)"
            : "rgba(206, 212, 218,0.8)"
        }
        border="1px solid #212529"
        borderRadius="10px 10px 0 0"
        fontSize="20px"
        overflowY="hidden"
        hoverOverflowY="scroll"
        pointerEvents={pointerState}
      >
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
      </GeneralDiv>
    </>
  );
}

export default RecordRoom;
