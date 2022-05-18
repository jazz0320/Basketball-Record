import styled, { createGlobalStyle } from "styled-components";

//General
const GeneralDiv = styled.div`
  font-weight: ${(props) => props.fontWeight};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  z-index: ${(props) => props.zIndex};
  line-height: ${(props) => props.lineHeight};
  vertical-align: ${(props) => props.verticalAlign};
  box-shadow: ${(props) => props.boxShadow};
  background: ${(props) => props.background};
  text-align: ${(props) => props.textAlign};
  overflow-y: ${(props) => props.overflowY};
  overflow-x: ${(props) => props.overflowX};
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
  background-repeat: ${(props) => props.backgroundRepeat};
  background-position: ${(props) => props.backgroundPosition};
  text-align: ${(props) => props.textAling};
  transition-duration: ${(props) => props.transitionDuration};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  pointer-events: ${(props) => props.pointerEvents};
  &:hover {
    display: ${(props) => props.hoverDisplay};
    box-shadow: ${(props) => props.hoverBoxShadow};
    pointer-events: ${(props) => props.hoverPointerEvents};
    transition-duration: ${(props) => props.hoverTransitionDuration};
    margin: ${(props) => props.hoverMargin};
    height: ${(props) => props.hoverHeight};
    width: ${(props) => props.hoverWidth};
    overflow-y: ${(props) => props.hoverOverflowY};
    background-color: ${(props) => props.hoverBackgroundColor};
  }
  div {
    font-size: ${(props) => props.divFontSize};
  }
  span {
    font-size: ${(props) => props.spanFontSize};
  }
`;

const GeneralButton = styled.button`
  box-shadow: ${(props) => props.boxShadow};
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
    box-shadow: ${(props) => props.hoverBoxShadow};
    background-color: ${(props) => props.hoverBackgroundColor};
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
  -webkit-transform: ${(props) => props.rotate};
  -moz-transform: ${(props) => props.rotate};
  -ms-transform: ${(props) => props.rotate};
  -o-transform: ${(props) => props.rotate};
  transform: ${(props) => props.rotate};
  filter: ${(props) => props.filter};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  src: ${(props) => props.src};
  transition-duration: ${(props) => props.transitionDuration};
  &:hover {
    box-shadow: ${(props) => props.hoverBoxShadow};
    transition-duration: ${(props) => props.hoverTransitionDuration};
    margin: ${(props) => props.hoverMargin};
    height: ${(props) => props.hoverHeight};
    width: ${(props) => props.hoverWidth};
  }
`;

const GeneralInput = styled.input`
  display: ${(props) => props.display};
  width: ${(props) => props.width};
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

const GeneralLabel = styled.label`
  z-index: ${(props) => props.zIndex};
  cursor: ${(props) => props.cursor};
  text-align: ${(props) => props.textAlign};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  background-color: ${(props) => props.backgroundColor};
  font-size: ${(props) => props.fontSize};
  border: ${(props) => props.border};
  width: ${(props) => props.width};
  &:hover {
    display: ${(props) => props.hoverDisplay};
  }
`;

const GeneralSelect = styled.select`
  color: ${(props) => props.color};
  height: ${(props) => props.height};
  cursor: pointer;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  font-size: ${(props) => props.fontSize};
`;

const GeneralSpan = styled.span`
  border-radius: ${(props) => props.borderRadius};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  cursor: ${(props) => props.cursor};
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverColor};
  }
`;
export {
  GeneralSpan,
  GeneralDiv,
  GeneralButton,
  GeneralImg,
  GeneralInput,
  GeneralSelect,
  GeneralLabel,
};

//Record Before Game
const Div_Record = styled.div`
  display: fiexd;
`;
const DivBeforeGameRecord = styled.div`
  width: 100vw;
  height: 100%;
  background-color: #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #212529;
  font-size: 30px;
`;

const TeamBlock = styled.div`
  width: 40vw;
  height: calc(100vh - 100px);
  display: flex;
  background-image: ${(props) => props.backgroundImage};
  background-position: ${(props) => props.backgroundPosition};
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
  box-shadow: ${(props) => props.boxShadow};
  /* background: linear-gradient(to bottom, #212529, #495057); */
  background-color: #f8f9fa;
  background-image: ${(props) => props.backgroundImage};
  background-position: ${(props) => props.backgroundPosition};
  background-size: cover;
  background-repeat: no-repeat;
  width: 40vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamBlockDetailTeam = styled.div`
  display: ${(props) => (props.display ? props.display : "flex")};
  margin-top: 5vh;
  padding: 0 1.5vw;
  width: 375px;
  align-items: center;
  justify-content: center;
`;
const TeamBlockDetailPlayer = styled.div`
  z-index: 10;
  /* backdrop-filter: blur(3px); */
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  margin-top: 23vh;
  margin-bottom: 4vh;
  height: 46vh;
  width: 500px;
  display: flex;
  justify-content: center;
`;

const SelectTeam = styled.select`
  display: ${(props) => props.display};
  cursor: pointer;
  -webkit-appearance: none;
  width: 375px;
  height: 50px;
  font-size: 36px;
  background-color: transparent;

  text-align: center;
  border: none;
`;

const SelectPlayerImg = styled.div`
  border-radius: 100%;
  width: 13vh;
  height: 10vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SelectPlayer = styled.select`
  cursor: pointer;
  backdrop-filter: blur(3px);
  -webkit-appearance: none;
  width: ${(props) => (props.width ? props.width : "250px")};
  height: 3rem;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2rem")};
  color: ${(props) => (props.color ? props.color : "#212529")};
  background-color: transparent;
  text-align: center;
  border: none;
`;

const TeamBlockDetailPlayerDiv = styled.div`
  padding: 0 2vw;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1.5vh;
`;

const RegulationBlock = styled.div`
  z-index: 10;
  position: fixed;
  top: 100px;
  width: 20vw;
  left: 40vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4vh;
`;
const RegulationBlockCell = styled.div`
  font-size: 32px;
  margin-bottom: 1.5vh;
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
  z-index: ${(props) => props.zIndex};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#343A40"};
  border: 1px solid white;
  white-space: nowrap;
  color: ${(props) => (props.color ? props.color : "hsla(150, 14%, 97%, 1)")};
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
const DivGameStartLogo = styled.div`
  pointer-events: none;
  width: 10vw;
  height: 100%;
  background-image: ${(props) => props.backgroundImage};
  background-size: ${(props) => props.backgroundSize};
  background-repeat: ${(props) => props.backgroundRepeat};
  background-position: ${(props) => props.backgroundPosition};
  opacity: ${(props) => props.opacity};
  transition-duration: ${(props) => props.transitionDuration};
`;

const DivGameStart_Container = styled.div`
  width: 80vw;
  background-color: #f8f9fa;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow-y: scroll;
  justify-content: center;
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
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

export {
  IconComponet,
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
  DivGameStartLogo,
};

// 開始比賽
const PopupDiv = styled.div`
  position: fixed;
  box-shadow: ${(props) => props.boxShadow};
  top: ${(props) => (props.top ? props.top : "30vh")};
  left: ${(props) => (props.left ? props.left : "40vw")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#495057"};
  height: ${(props) => (props.height ? props.height : "14vh")};
  height: ${(props) => (props.height ? props.height : "14vh")};
  width: ${(props) => (props.width ? props.width : "20vw")};
  z-index: ${(props) => (props.zIndex ? props.zIndex : "10")};
  color: ${(props) => (props.color ? props.color : "#f8f9fa")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "40px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : "6%")};
  &:hover {
    box-shadow: ${(props) => props.hoverBoxShadow};
  }
`;

const PopupBlur = styled.div`
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: ${(props) => (props.zIndex ? props.zIndex : "6")};
  background-color: rgba(0, 0, 0);
  opacity: 0.5;
`;

const GroundContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
`;

const TeamOnTheGround = styled.div`
  height: 700px;
  width: 220px;

  width: ${(props) => props.width};
  overflow-x: ${(props) => props.overflowX};
  display: flex;
  align-items: center;

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  /* justify-content: center; */
  flex-direction: column;
  flex-wrap: wrap;
  &:first-child {
    flex-wrap: wrap-reverse;
  }

  &:last-child {
  }
`;

const LiveActionBolck = styled.div`
  box-shadow: 0px 0px 1px 3px rgba(108, 117, 125, 0.3);
  margin-bottom: 5px;
  height: 50px;
  font-size: 20px;
  display: flex;
  border-radius: 5px;
  padding: 7px 10px;
  width: 740px;
  div {
    overflow-x: hidden;
    color: ${(props) => (props.ok ? "white" : "#6c757d")};
    height: 36px;
    padding: 1px 10px;
    margin-right: 3px;
    box-shadow: 0px 0px 1px 1px rgba(108, 117, 125, 0.4);
    border-radius: 5px;
    background-color: ${(props) => (props.ok ? "#343a40" : "#adb5bd")};
    animation-name: popup;
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
  PopupBlur,
  GroundContainer,
  TeamOnTheGround,
  LiveActionBolck,
  DivGameStartRecord,
  DivGameStart_Container,
};

const LiveRoomActionBlock = styled.div`
  /* animation-name: popup;
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
  } */
`;

const LiveRoomLines = styled.div`
  /* animation-name: popup;
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
  } */
  span {
    font-size: ${(props) => props.spanFontSize};
  }
`;

export { LiveRoomLines, LiveRoomActionBlock };
