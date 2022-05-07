import styled, { createGlobalStyle } from "styled-components";

//General
const GeneralDiv = styled.div`
  text-align: ${(props) => props.textAlign};
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
  background-position: ${(props) => props.backgroundPosition};
  text-align: ${(props) => props.textAling};
  transition-duration: ${(props) => props.transitionDuration};
  position: ${(props) => props.position};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  pointer-events: ${(props) => props.pointerEvents};
  &:hover {
    pointer-events: ${(props) => props.hoverPointerEvents};
    transition-duration: ${(props) => props.hoverTransitionDuration};
    margin: ${(props) => props.hoverMargin};
    height: ${(props) => props.hoverHeight};
    width: ${(props) => props.hoverWidth};
    overflow-y: ${(props) => props.hoverOverflowY};
    background-color: ${(props) => props.hoverBackgroundColor};
  }
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
  pointer-events: ${(props) => props.pointerEvents};
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverColor};
    color: ${(props) => props.hoverColor};
    font-size: ${(props) => props.hoverFontSize};
    pointer-events: ${(props) => props.hoverPointerEvents};
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
  cursor: ${(props) => props.cursor};
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  ::placeholder {
    color: ${(props) => props.placeholderColor};
    font-size: ${(props) => props.placeholderFontSize};
    font-style: ${(props) => props.placeholderStyle};
  }
`;
const GeneralSelect = styled.select`
  cursor: pointer;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  font-size: ${(props) => props.fontSize};
`;

export { GeneralDiv, GeneralButton, GeneralImg, GeneralInput, GeneralSelect };

//Record Before Game
const Div_Record = styled.div`
  display: fiexd;
`;
const DivBeforeGameRecord = styled.div`
  display: flex;
  background-color: #343a40;
  color: #f8f9fa;
  font-size: 30px;
`;

const TeamBlock = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  &:nth-child(2) {
    flex-direction: row-reverse;
  }
  justify-content: space-between;
`;

const TeamBlockLogoDiv = styled.div`
  width: calc(50vw - 375px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TeamBlockLogoImg = styled.img`
  width: 80%;
  src: ${(props) => props.backgroundImage};

  -webkit-filter: drop-shadow(12px 12px 7px rgba(255, 255, 255, 0.7));
  filter: drop-shadow(12px 12px 7px rgba(255, 255, 255, 0.7));
`;

const TeamBlockDetail = styled.div`
  background: linear-gradient(to bottom, #212529, #495057);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamBlockDetailTeam = styled.div`
  margin-top: 5vh;
  padding: 0 1.5vw;
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TeamBlockDetailPlayer = styled.div`
  height: 46vh;
  width: 375px;
  display: flex;
  justify-content: center;
`;

const SelectTeam = styled.select`
  cursor: pointer;
  -webkit-appearance: none;
  width: 375px;
  height: 50px;
  font-size: 36px;
  /* -webkit-text-stroke: 1px #495057; */
  /* color: aliceblue; */
  background-color: transparent;

  text-align: center;
  border: none;
`;

const SelectPlayerImg = styled.div`
  border-radius: 100%;
  width: 8vh;
  height: 8vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SelectPlayer = styled.select`
  cursor: pointer;
  -webkit-appearance: none;
  width: 200px;
  height: 3rem;
  font-size: 1.5rem;
  /* -webkit-text-stroke: 1px #495057; */
  color: aliceblue;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const TeamBlockDetailPlayerDiv = styled.div`
  padding: 0 1.5vw;
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 0.5vh;
`;

const RegulationBlock = styled.div`
  position: absolute;
  width: 7vw;
  left: 47vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 18vh;
`;
const RegulationBlockCell = styled.div`
  font-size: 32px;
  margin-bottom: 1vh;
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
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#343A40"};
  border: 1px solid ${() => "#212529"};
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: ${(props) => props.fontSize};
  /* font-size: 2rem; */
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0.5rem"};
  user-select: none;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};

  /* padding: 1rem 1.5rem; */
  /* margin: 0 0.5rem; */
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${(props) =>
      props.hoverBackgroundColor ? props.hoverBackgroundColor : "#495057"};
    ${() => `transform: translateY(-3px)`}
  }

  &:active {
    background-color: ${() => "#212529"};
  }
`;

const DivGameStartRecord = styled.div`
  width: 100vw;
  height: 100vh;
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
  height: 100%;
  overflow-y: scroll;
  justify-content: center;
`;

export {
  Div_Record,
  DivBeforeGameRecord,
  TeamBlock,
  RegulationBlock,
  TeamBlockDetail,
  TeamBlockLogoDiv,
  TeamBlockLogoImg,
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
  height: ${(props) => (props.height ? props.height : "14vh")};
  width: ${(props) => (props.width ? props.width : "20vw")};
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
  justify-content: center;
`;

const TeamOnTheGround = styled.div`
  margin: ${(props) => props.margin};
  height: 650px;
  width: ${(props) => props.width};
  overflow-x: ${(props) => props.overflowX};
  /* overflow: scroll; */
  display: flex;

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  /* justify-content: center; */
  flex-direction: column;
  flex-wrap: wrap;
  &:first-child {
    flex-wrap: wrap-reverse;
    overflow-x: ${(props) => props.overflowXFirst};
  }

  &:last-child {
    overflow-x: ${(props) => props.overflowXLast};
  }
`;

const LiveActionBolck = styled.div`
  font-size: 24px;
  margin: 0.5vh 0 0 0;
  display: flex;
  border: 2px solid #495057;
  border-radius: 5px;
  padding: 5px 10px;
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
