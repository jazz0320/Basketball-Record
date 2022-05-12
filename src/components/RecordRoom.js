import { useEffect, useState } from "react";
import {
  GeneralDiv,
  GeneralButton,
  IconComponet,
  ButtonSubmit,
  GeneralImg,
} from "../utils/StyleComponent";

function RecordRoom(props) {
  const [reverseLiveAction, setReverseLiveAction] = useState();
  const [pointerState, setPointerState] = useState("none");
  const [hideRecord, setHideRecord] = useState(false);
  const [openRecordButton, setOpenRecordButton] = useState(false);

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
        bottom="5px"
        right="5px"
        transitionDuration="0.5s"
        display="flex"
      >
        {openRecordButton && (
          <GeneralDiv width="100px">
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
        )}
        <IconComponet onClick={() => props.setOpenGradeButton((pre) => !pre)}>
          <GeneralImg
            width="50px"
            height="50px"
            src={require("../img/chat/chat1.png")}
            alt="Watch Record"
          />
        </IconComponet>
        <IconComponet onClick={() => setOpenRecordButton((pre) => !pre)}>
          <GeneralImg
            width="50px"
            height="50px"
            src={require("../img/chat/chat1.png")}
            alt="Watch Record"
          />
        </IconComponet>
      </GeneralDiv>
      <GeneralDiv
        transitionDuration="0.5s"
        position="fixed"
        bottom="0"
        width={hideRecord ? "0px" : "80vw"}
        padding={hideRecord ? "0px" : "5px"}
        height={hideRecord ? "0px" : "8vh"}
        color="white"
        backgroundColor={
          pointerState === "none"
            ? "rgba(33, 37, 41,0.4)"
            : "rgba(33, 37, 41,0.8)"
        }
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
