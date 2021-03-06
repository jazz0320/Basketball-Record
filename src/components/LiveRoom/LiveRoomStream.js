import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ChooseQuarter = styled.span`
  border-radius: 5px;
  display: inline-block;
  padding: 5px 10px;
  background-color: ${(props) => (props.quarteNowLive ? "#5e7380" : "#f7f7f7")};
  color: ${(props) => (props.quarteNowLive ? "#fff" : "#333")};
  cursor: pointer;
  hover {
    background-color: #bbb;
    color: #fff;
  }
`;

const QuarterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LiveActionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LiveActionlines = styled.div`
  display: flex;
  margin-top: 14px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LiveRoomLines = styled.div`
  padding: 0 8px;
  span {
    font-size: 14px;
  }
`;
const LinesPlayerPic = styled.img`
  height: 56px;
  width: 65px;
  border-radius: 100%;
  margin: 0 5px;
`;

const LinesForATeam = styled.div`
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 33vw;
  @media (max-width: 1024px) {
    width: 37vw;
  }
  @media (max-width: 768px) {
    width: 65vw;
  }
  @media (max-width: 414px) {
    width: 80vw;
  }

  background-color: #e9ecef;
  box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
`;

const RWDTimeDiv = styled.div`
  display: none;
  font-size: 14px;
  color: #6c757d;
  @media (max-width: 768px) {
    display: block;
  }
`;
const RWDTimeDivBteam = styled.div`
  display: none;
  text-align: end;
  font-size: 14px;
  color: #6c757d;
  @media (max-width: 768px) {
    display: block;
  }
`;

const LinesForBTeam = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 33vw;
  @media (max-width: 1024px) {
    width: 37vw;
  }
  @media (max-width: 768px) {
    width: 65vw;
  }
  @media (max-width: 414px) {
    width: 80vw;
  }

  background-color: #e9ecef;
  box-shadow: 0px 2px 2px 3px rgba(0, 0, 0, 0.2);
`;

const SpaceDiv = styled.div`
  width: 33vw;
  @media (max-width: 1024px) {
    width: 37vw;
  }
  @media (max-width: 768px) {
    width: 31.5%;
  }
  @media (max-width: 640px) {
    width: 31%;
  }
  @media (max-width: 500px) {
    width: 30%;
  }
  @media (max-width: 414px) {
    width: 14.3%;
  }
`;

const TimeDiv = styled.div`
  width: 8vw;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
  flex-wrap: wrap;
  justify-content: center;
  background-color: #ced4da;
  margin: 0 20px;
  padding: 5px 0;
  align-items: center;
  box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.3);
`;

function LiveRoomStream(props) {
  const [quarteNowLive, setQuarterNowLive] = useState(props.quarter.length);
  const [actionNow, setActionNow] = useState();
  useEffect(() => {
    if (
      quarteNowLive === 0 ||
      quarteNowLive === 1 ||
      quarteNowLive === 2 ||
      quarteNowLive === 3
    ) {
      let result = props.liveAction.filter(
        (item) => item.quarterNow === quarteNowLive + 1
      );

      setActionNow(result);
    } else {
      setActionNow();
    }
  }, [quarteNowLive, props.liveAction]);

  return (
    <>
      <QuarterDiv>
        {props.quarter &&
          props.quarter.map((q, index) => (
            <ChooseQuarter
              key={q}
              quarteNowLive={quarteNowLive === index}
              onClick={() => {
                setQuarterNowLive(index);
              }}
            >
              {" "}
              {q}{" "}
            </ChooseQuarter>
          ))}
        <ChooseQuarter
          quarteNowLive={quarteNowLive === props.quarter.length}
          onClick={() => {
            setQuarterNowLive(props.quarter.length);
          }}
        >
          {" "}
          All{" "}
        </ChooseQuarter>
      </QuarterDiv>
      <LiveActionContainer>
        {quarteNowLive === props.quarter.length
          ? props.liveAction
              .slice()
              .reverse()
              ?.map((item, index) => (
                <>
                  <LiveActionlines key={index}>
                    {item.team === true ? (
                      <div>
                        <LinesForATeam>
                          <LiveRoomLines>
                            <span>{item.team ? props.aTeam : props.bTeam}</span>
                            <span> , </span>
                            <span>{item.playerId}</span>
                            <span> , </span>
                            <span>{item.location}</span>
                            <span> , </span>
                            <span>
                              {item.actionWord}+{item.count}
                            </span>
                          </LiveRoomLines>

                          <LinesPlayerPic src={`${item.playerPic}`} />
                        </LinesForATeam>
                        <RWDTimeDiv>
                          ???{item.quarterNow}???,{item.minutes}:
                          {item.seconds < 10 ? "0" : null}
                          {item.seconds}
                        </RWDTimeDiv>
                      </div>
                    ) : (
                      <SpaceDiv />
                    )}

                    <TimeDiv>
                      <span>???{item.quarterNow}???</span>
                      <span>
                        {item.minutes}:{item.seconds < 10 ? "0" : null}
                        {item.seconds}
                      </span>
                    </TimeDiv>

                    {item.team === false ? (
                      <div>
                        <LinesForBTeam>
                          <LinesPlayerPic src={`${item.playerPic}`} />
                          <LiveRoomLines>
                            <span>{item.team ? props.aTeam : props.bTeam}</span>
                            <span> , </span>
                            <span>{item.playerId}</span>
                            <span> , </span>
                            <span>{item.location}</span>
                            <span> , </span>
                            <span>
                              {item.actionWord}+{item.count}
                            </span>
                          </LiveRoomLines>
                        </LinesForBTeam>
                        <RWDTimeDivBteam>
                          ???{item.quarterNow}???,{item.minutes}:
                          {item.seconds < 10 ? "0" : null}
                          {item.seconds}
                        </RWDTimeDivBteam>
                      </div>
                    ) : (
                      <SpaceDiv />
                    )}
                  </LiveActionlines>
                </>
              ))
          : actionNow
          ? actionNow
              .slice()
              .reverse()
              ?.map((item, index) => (
                <LiveActionlines key={index}>
                  {item.team === true ? (
                    <LinesForATeam>
                      <LiveRoomLines>
                        <span>{item.team ? props.aTeam : props.bTeam}</span>
                        <span> , </span>
                        <span>{item.playerId}</span>
                        <span> , </span>
                        <span>{item.location}</span>
                        <span> , </span>
                        <span>???{item.count}???</span>
                      </LiveRoomLines>
                      <LinesPlayerPic src={`${item.playerPic}`} />
                    </LinesForATeam>
                  ) : (
                    <SpaceDiv />
                  )}

                  <TimeDiv>
                    <span>
                      {item.minutes}:{item.seconds < 10 ? "0" : null}
                      {item.seconds}
                    </span>
                  </TimeDiv>

                  {item.team === false ? (
                    <LinesForBTeam>
                      <LinesPlayerPic src={`${item.playerPic}`} />
                      <LiveRoomLines>
                        <span>{item.team ? props.aTeam : props.bTeam}</span>
                        <span> , </span>
                        <span>{item.playerId}</span>
                        <span> , </span>
                        <span>{item.location}</span>
                        <span> , </span>
                        <span>???{item.count}???</span>
                      </LiveRoomLines>
                    </LinesForBTeam>
                  ) : (
                    <SpaceDiv />
                  )}
                </LiveActionlines>
              ))
          : null}
      </LiveActionContainer>
    </>
  );
}

LiveRoomStream.propTypes = {
  quarter: PropTypes.array,
  liveAction: PropTypes.array,
  aTeam: PropTypes.string,
  bTeam: PropTypes.string,
};

export default LiveRoomStream;
