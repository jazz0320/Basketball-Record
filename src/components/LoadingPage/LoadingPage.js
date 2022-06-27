import styled from "styled-components";

const LoadDiv = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  position: fixed;
`;

function LoadingPage() {
  return (
    <LoadDiv>
      <img src={require("../../img/loading/loading.gif")} />
    </LoadDiv>
  );
}
export default LoadingPage;
