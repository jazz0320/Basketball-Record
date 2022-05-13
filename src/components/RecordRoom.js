import { useEffect, useState } from "react";
import { GeneralDiv, IconComponet, GeneralImg } from "../utils/StyleComponent";

function RecordRoom(props) {
  const [reverseLiveAction, setReverseLiveAction] = useState();

  useEffect(() => {
    let a = [...props.liveAction];
    a.reverse();
    setReverseLiveAction(a);
  }, [props.liveAction]);

  return (
    <>
      <GeneralDiv
        position="fixed"
        bottom="5px"
        right="5px"
        transitionDuration="0.5s"
        display="flex"
        zIndex="4"
      >
        <IconComponet onClick={() => props.setOpenGradeButton((pre) => !pre)}>
          <GeneralImg
            width="50px"
            height="50px"
            src={require("../img/score/score.png")}
            alt="Watch Record"
          />
        </IconComponet>
      </GeneralDiv>
      <GeneralDiv
        marginTop="5px"
        transitionDuration="0.5s"
        width={props.pageSize[1] ? "740px" : "80vw"}
        padding="5px"
        height={props.pageSize[1] ? "50px" : "8vh"}
        color="black"
        backgroundColor="#f8f9fa"
        borderRadius="5px 5px 0 0"
        fontSize="16px"
        overflowY="hidden"
        hoverOverflowY="scroll"
        boxShadow="0px 0px 5px 5px rgba(108,117,125, 0.4);"
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
