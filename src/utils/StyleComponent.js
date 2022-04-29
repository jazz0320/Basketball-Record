import styled from "styled-components";

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

const ButtonBeforeGame = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 0px;
  &:hover {
    background: gray;
    color: black;
  }
`;
const ButtonSubmitSetting = styled.button`
  background-color: ${() => "hsla(347, 49%, 46%, 1)"};
  border: 1px solid
    ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 60%, 1)" : "hsla(0, 0%, 0%, 0.4)"};
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
    background-color: ${() => "hsla(347, 49%, 51%, 1)"};
    ${() => `transform: translateY(-3px)`}
  }

  &:active {
    background-color: "hsla(347, 49%, 26%, 1)";
  }
`;

const DivGameStart_Record = styled.div``;

export {
  Div_Record,
  DivBeforeGame_Record,
  DivGameStart_Record,
  TeamBlock,
  RegulationBlock,
  TeamBlockDetail,
  TeamBlockDetail_Team,
  TeamBlockDetail_Player,
  ButtonBeforeGame,
  TeamBlockDetail_Player_Div,
  Select_Team,
  Select_Player,
  Select_PlayerImg,
  RegulationBlock_Cell,
  ButtonSubmitSetting,
};

// display: ${(props) => (props.$set ? "block" : "none")};
