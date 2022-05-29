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
  font-size: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
  height: 60vh;
  top: 20vh;
  width: 70vw;
  @media (max-width: 1024px) {
    font-size: 30px;
    left: 25vw;
    width: 50vw;
  }
  z-index: 99;
  left: 15vw;
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
    width: 70px;
    height: 70px;
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
              <span>取消</span>
            </CloseDiv>
            <ScoreTable cellPadding="10" border="5">
              <thead>
                <tr>
                  <td>紀錄順序</td>
                  <td>快捷鍵</td>
                  <td>功能</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td bgcolor="#ffadad">1.選擇隊伍</td>
                  <td bgcolor="#ffadad">`</td>
                  <td>交換隊伍</td>
                  <td bgcolor="#4f772d">Crtl + Q</td>
                  <td>出手得分</td>
                  <td bgcolor="#4f772d">S</td>
                  <td>抄截</td>
                </tr>
                <tr>
                  <td bgcolor="#ffd6a5">2.選擇球員</td>
                  <td bgcolor="#ffd6a5">1 ~ 5</td>
                  <td>選擇球員</td>
                  <td bgcolor="#4f772d">Q</td>
                  <td>出手未進</td>
                  <td bgcolor="#4f772d">D</td>
                  <td>火鍋</td>
                </tr>
                <tr>
                  <td bgcolor="#a0c4ff">3.選擇位置</td>
                  <td bgcolor="#a0c4ff">滑鼠左鍵點擊球場</td>
                  <td>紀錄事件位置</td>
                  <td bgcolor="#4f772d">Crtl + Z</td>
                  <td>罰球得分</td>
                  <td bgcolor="#4f772d">R</td>
                  <td>重置24秒</td>
                </tr>
                <tr>
                  <td bgcolor="#4f772d">4.選擇動作</td>
                  <td bgcolor="#4f772d">Z</td>
                  <td>罰球未進</td>
                  <td bgcolor="#4f772d">E</td>
                  <td>失誤</td>
                  <td bgcolor="#4f772d">K</td>
                  <td>時間開始</td>
                </tr>
                <tr>
                  <td bgcolor="#ce6a85">5.紀錄送出</td>
                  <td bgcolor="#4f772d">Crtl + W</td>
                  <td>進攻籃板</td>
                  <td bgcolor="#4f772d">F</td>
                  <td>犯規</td>
                  <td bgcolor="#4f772d">L</td>
                  <td>時間暫停</td>
                </tr>
                <tr>
                  <td></td>
                  <td bgcolor="#4f772d">W</td>
                  <td>防守籃板</td>
                  <td bgcolor="#4f772d">A</td>
                  <td>助攻</td>
                  <td bgcolor="#ce6a85">Enter</td>
                  <td>紀錄送出</td>
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
          <span>查看分數</span>
        </IconComponetForReadMe>
        <IconComponet onClick={() => props.setOpenGradeButton((pre) => !pre)}>
          <ScoreIcon
            src={require("../../img/score/score.png")}
            alt="Watch Record"
          />
          <span>查看分數</span>
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
