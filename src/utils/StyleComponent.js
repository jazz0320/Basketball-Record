import styled, { createGlobalStyle } from "styled-components";

const Div_Record = styled.div`
  display: fiexd;
`;
const DivBeforeGame_Record = styled.div`
  display: flex;
  background-color: #343a40;
  color: #f8f9fa;
  font-size: 40px;
`;

const TeamBlock = styled.div`
  width: 50vw;
  border: 1px solid black;
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

const TeamBlockDetail_Team = styled.div`
  margin-top: 3vh;
  width: 600px;
  display: flex;
  justify-content: center;
`;
const TeamBlockDetail_Player = styled.div`
  height: 900px;
  width: 600px;
  display: flex;
  justify-content: center;
`;

const Select_Team = styled.select`
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

const Select_PlayerImg = styled.div`
  width: 140px;
  height: 140px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Select_Player = styled.select`
  -webkit-appearance: none;
  width: 320px;
  height: 60px;
  font-size: 40px;
  -webkit-text-stroke: 1px #495057;
  color: aliceblue;
  background-color: transparent;
  text-align: center;
  border: none;
`;

const TeamBlockDetail_Player_Div = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 40px;
`;

const RegulationBlock = styled.div`
  position: fixed;
  width: 6vw;
  left: 47vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 17vh;
`;
const RegulationBlock_Cell = styled.div`
  font-size: 44px;
  margin-bottom: 60px;
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
  font-size: 2rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 1.5rem 2rem;
  margin: 1rem;
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

const DivGameStart_Record = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #e9ecef;
`;
const DivGameStart_Container = styled.div`
  width: 90vw;
  background-color: #f8f9fa;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export {
  Div_Record,
  DivBeforeGame_Record,
  TeamBlock,
  RegulationBlock,
  TeamBlockDetail,
  TeamBlockDetail_Team,
  TeamBlockDetail_Player,
  ButtonForChange,
  TeamBlockDetail_Player_Div,
  Select_Team,
  Select_Player,
  Select_PlayerImg,
  RegulationBlock_Cell,
  ButtonSubmit,
};

// 開始比賽
const PopupDiv = styled.div`
  padding-top: 1.5vw;
  position: fixed;
  margin-top: 30vh;
  margin-left: 40vw;
  background-color: #495057;
  height: 14vh;
  width: 20vw;
  z-index: 10;
  color: #f8f9fa;
  font-size: 40px;
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
  height: 710px;
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
  margin: 0 0 0.25vw 0;
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
  DivGameStart_Record,
  DivGameStart_Container,
};

//共用
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    ${"" /* background: #f8f9fa; */}
  }
  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }
`;
export { GlobalStyle };
