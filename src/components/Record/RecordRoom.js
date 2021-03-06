import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PopupBlur = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  background-color: rgba(0, 0, 0);
  opacity: 0.5;
`;

const PopupDiv = styled.div`
  position: fixed;
  background-color: #495057;
  color: #f8f9fa;
  font-size: 24px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
  height: 60%;
  top: 20%;
  width: 80%;
  left: 10%;
  @media (max-width: 1440px) {
    font-size: 18px;
  }
  @media (max-width: 1024px) {
    font-size: 18px;
    width: 90%;
    left: 5%;
  }
  z-index: 99;
`;

const ScoreTable = styled.table`
  background-color: #343a40;
  color: white;
  text-align: center;
  border-radius: 5px;
  border: 0px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px 10px;
`;
const CloseDiv = styled.div`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  span {
    position: absolute;
    right: 0px;
    visibility: hidden;
    font-size: 14px;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  }
  &:hover {
    span {
      visibility: visible;
    }
  }
`;

const ScoreBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 5px;
  right: 5px;
  @media (max-width: 1024px) {
    top: 5px;
    left: 5px;
    flex-direction: row;
    height: 70px;
    width: 150px;
  }
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
  span {
    position: absolute;
    right: 70px;
    @media (max-width: 1024px) {
      top: 60px;
      left: 60px;
    }
    visibility: hidden;
    font-size: 14px;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  }
  &:hover {
    span {
      visibility: visible;
    }
  }
  :active {
    background-color: rgb(41, 41, 41);
  }
`;
const IconComponetForReadMe = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
  @media (max-width: 1024px) {
    margin-right: 10px;
  }
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
  span {
    position: absolute;
    right: 70px;
    @media (max-width: 1024px) {
      top: 60px;
      left: 0px;
    }
    visibility: hidden;
    font-size: 14px;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
  }
  &:hover {
    span {
      visibility: visible;
    }
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
  const [openReadMe, setOpenReadMe] = useState(false);
  useEffect(() => {
    let a = [...props.liveAction];
    a.reverse();
    setReverseLiveAction(a);
  }, [props.liveAction]);

  return (
    <>
      {openReadMe && (
        <div>
          <PopupBlur />
          <PopupDiv>
            <CloseDiv
              onClick={() => {
                setOpenReadMe(false);
              }}
            >
              <img src={require("../../img/close/closeR.png")} />
              <span>??????</span>
            </CloseDiv>
            <ScoreTable cellPadding="10" border="5">
              <thead>
                <tr>
                  <td>????????????</td>
                  <td>?????????</td>
                  <td>??????</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td bgcolor="#ffadad">1.????????????</td>
                  <td bgcolor="#ffadad">`</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">Crtl + Q</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">S</td>
                  <td>??????</td>
                </tr>
                <tr>
                  <td bgcolor="#ffd6a5">2.????????????</td>
                  <td bgcolor="#ffd6a5">1 ~ 5</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">Q</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">D</td>
                  <td>??????</td>
                </tr>
                <tr>
                  <td bgcolor="#a0c4ff">3.????????????</td>
                  <td bgcolor="#a0c4ff">????????????????????????</td>
                  <td>??????????????????</td>
                  <td bgcolor="#4f772d">Crtl + Z</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">R</td>
                  <td>??????24???</td>
                </tr>
                <tr>
                  <td bgcolor="#4f772d">4.????????????</td>
                  <td bgcolor="#4f772d">Z</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">E</td>
                  <td>??????</td>
                  <td bgcolor="#4f772d">K</td>
                  <td>????????????</td>
                </tr>
                <tr>
                  <td bgcolor="#ce6a85">5.????????????</td>
                  <td bgcolor="#4f772d">Crtl + W</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">F</td>
                  <td>??????</td>
                  <td bgcolor="#4f772d">L</td>
                  <td>????????????</td>
                </tr>
                <tr>
                  <td></td>
                  <td bgcolor="#4f772d">W</td>
                  <td>????????????</td>
                  <td bgcolor="#4f772d">A</td>
                  <td>??????</td>
                  <td bgcolor="#ce6a85">Enter</td>
                  <td>????????????</td>
                </tr>
              </tbody>
            </ScoreTable>
          </PopupDiv>
        </div>
      )}

      <ScoreBox>
        <IconComponetForReadMe onClick={() => setOpenReadMe(true)}>
          <ScoreIcon
            src={require("../../img/read/read.png")}
            alt="Watch Record"
          />
          <span>???????????????</span>
        </IconComponetForReadMe>
        <IconComponet onClick={() => props.setOpenGradeButton((pre) => !pre)}>
          <ScoreIcon
            src={require("../../img/score/score.png")}
            alt="Watch Record"
          />
          <span>????????????</span>
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

RecordRoom.propTypes = {
  liveAction: PropTypes.array,
  setOpenGradeButton: PropTypes.func,
  pageSize: PropTypes.array,
  aTeam: PropTypes.string,
  bTeam: PropTypes.string,
};

export default RecordRoom;
