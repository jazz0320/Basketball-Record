import styled, { createGlobalStyle } from "styled-components";

//General
const GeneralDiv = styled.div`
  overflow-y: ${(props) => props.overflowY};
  box-shadow: ${(props) => props.boxShadow};
  cursor: ${(props) => props.cursor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: ${(props) => props.display};
  flex-wrap: ${(props) => props.flexWrap};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  margin: ${(props) => props.margin};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  background-image: ${(props) => props.backgroundImage};
  background-size: ${(props) => props.backgroundSize};
  text-align: ${(props) => props.textAling};
`;

const GeneralButton = styled.button`
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  cursor: ${(props) => props.cursor};
  color: ${(props) => props.color};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverColor};
    font-size: ${(props) => props.hoverFontSize};
  }
  &::active {
    background-color: ${(props) => props.activeBackgroundColor};
    color: ${(props) => props.activeColor};
  }
`;

const GeneralImg = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const GeneralInput = styled.input`
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  ::placeholder {
    color: ${(props) => props.placeholderColor};
    font-size: ${(props) => props.placeholderFontSize};
    font-style: ${(props) => props.placeholderStyle};
  }
`;

export { GeneralDiv, GeneralButton, GeneralImg, GeneralInput };

//Record Before Game
const Div_Record = styled.div`
  display: fiexd;
`;
const DivBeforeGameRecord = styled.div`
  display: flex;
  background-color: #343a40;
  color: #f8f9fa;
  font-size: 40px;
`;

const TeamBlock = styled.div`
  width: 50vw;
  background-image: ${(props) => props.backgroundImage};
  /* border: 1px solid black; */
  height: calc(100vh - 110px);

  display: flex;
  &:nth-child(2) {
    flex-direction: row-reverse;
  }
  justify-content: space-between;
`;
const TeamBlockDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamBlockDetailTeam = styled.div`
  margin-top: 3vh;
  width: 600px;
  display: flex;
  justify-content: center;
`;
const TeamBlockDetailPlayer = styled.div`
  height: 40vh;
  width: 600px;
  display: flex;
  justify-content: center;
`;

const SelectTeam = styled.select`
  cursor: pointer;
  -webkit-appearance: none;
  width: 500px;
  height: 60px;
  font-size: 50px;
  -webkit-text-stroke: 1px #495057;
  color: aliceblue;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const SelectPlayerImg = styled.div`
  width: 5.5vh;
  height: 5vh;
  background-size: contain;
  background-repeat: no-repeat;
`;

const SelectPlayer = styled.select`
  cursor: pointer;
  -webkit-appearance: none;
  width: 320px;
  height: 3rem;
  font-size: 2rem;
  -webkit-text-stroke: 1px #495057;
  color: aliceblue;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const TeamBlockDetailPlayerDiv = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5vh;
`;

const RegulationBlock = styled.div`
  position: absolute;
  width: 6vw;
  left: 47vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15vh;
`;
const RegulationBlockCell = styled.div`
  font-size: 44px;
  margin-bottom: 2vh;
  justify-content: space-around;
  display: flex;
`;

const ButtonForChange = styled.button`
  color: #f8f9fa;
  background-color: transparent;
  cursor: pointer;
  border: 0px;
  &:hover {
    background: gray;
    color: black;
  }
`;
const ButtonSubmit = styled.button`
  background-color: ${() => "#343A40"};
  border: 1px solid ${() => "#212529"};
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: ${(props) => props.fontSize};
  /* font-size: 2rem; */
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};

  /* padding: 1rem 1.5rem; */
  /* margin: 0 0.5rem; */
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${() => "#495057"};
    ${() => `transform: translateY(-3px)`}
  }

  &:active {
    background-color: ${() => "#212529"};
  }
`;

const DivGameStartRecord = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #e9ecef;
`;
const DivGameStart_Container = styled.div`
  width: 80vw;
  background-color: #f8f9fa;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export {
  Div_Record,
  DivBeforeGameRecord,
  TeamBlock,
  RegulationBlock,
  TeamBlockDetail,
  TeamBlockDetailTeam,
  TeamBlockDetailPlayer,
  ButtonForChange,
  TeamBlockDetailPlayerDiv,
  SelectTeam,
  SelectPlayer,
  SelectPlayerImg,
  RegulationBlockCell,
  ButtonSubmit,
};

// 開始比賽
const PopupDiv = styled.div`
  position: fixed;
  top: 30vh;
  left: 40vw;
  background-color: #495057;
  height: 14vh;
  width: 20vw;
  z-index: 10;
  color: #f8f9fa;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "40px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 6%;
`;

const GroundContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
`;

const TeamOnTheGround = styled.div`
  height: 720px;
  width: 270px;
  overflow: scroll;
  display: flex;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LiveActionBolck = styled.div`
  font-size: 36px;
  margin: 0.5vh 0 0 0;
  display: flex;
  border: 2px solid #495057;
  border-radius: 5px;
  padding: 5px 0 5px 10px;
  width: 54.5vw;
  div {
    padding: 1px 3px;
    border: 1px solid #495057;
    border-radius: 5px;
    background-color: #ced4da;
    animation-name: popup;
    /* transition: all 3s ease-out; */
    animation-duration: 0.3s;

    @keyframes popup {
      0% {
        transform: translateY(20px);
        background-color: #343a40;
        color: white;
      }
      90% {
        transform: translateY(-10px);
        background-color: #6c757d;
        color: white;
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

export {
  PopupDiv,
  GroundContainer,
  TeamOnTheGround,
  LiveActionBolck,
  DivGameStartRecord,
  DivGameStart_Container,
};
