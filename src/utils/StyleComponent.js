import styled from "styled-components";

const Div_Record = styled.div`
  display: fiexd;
`;
const DivBeforeGame_Record = styled.div`
  display: ${(props) => (props.$setGame ? "none" : "block")};
`;
const DivGameStart_Record = styled.div`
  display: ${(props) => (props.$set ? "block" : "none")};
`;

export { Div_Record, DivBeforeGame_Record, DivGameStart_Record };
