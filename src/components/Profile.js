import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { GeneralDiv, GeneralButton } from "../utils/StyleComponent";

const SideBar = styled.div`
  padding: 2vh 0;
  height: 100vh;
  width: 20vw;
  background-color: #495057;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const ContainDiv = styled.div`
  overflow-y: scroll;
  margin: 1vh 1vw;
  border: #ced4da 2px solid;
  border-radius: 10px;
  padding: 1vh 2vw;
  height: 98vh;
  width: 80vw;
`;

const LinkComponet = styled(Link)`
  font-size: 2rem;
  margin: 1vh 5vw;
  width: 7vw;
  height: 40px;
  text-align: center;
  /* background-color: ${(props) => (props.$focus ? "gray" : "white")}; */
  color: ${(props) => (props.$focus ? "#CED4DA" : "#F8F9FA")};
  text-decoration: none;
  :active {
    background-color: rgb(41, 41, 41);
  }
`;

function Profile(props) {
  const [navActive, setNavActive] = useState(0);
  return (
    <>
      <GeneralDiv height="100%" display="flex">
        <SideBar>
          <LinkComponet
            $focus={navActive === 0}
            onClick={() => setNavActive(0)}
            to="member-file"
          >
            Member
          </LinkComponet>

          <LinkComponet
            $focus={navActive === 1}
            onClick={() => setNavActive(1)}
            to="game-arrange"
          >
            Plan
          </LinkComponet>

          <LinkComponet
            $focus={navActive === 2}
            onClick={() => setNavActive(2)}
            to="team-inf"
          >
            Team
          </LinkComponet>

          <LinkComponet
            $focus={navActive === 3}
            onClick={() => setNavActive(3)}
            to="game-schedule"
          >
            Schedule
          </LinkComponet>
        </SideBar>
        <ContainDiv>
          <Outlet />
        </ContainDiv>
      </GeneralDiv>
    </>
  );
}

export default Profile;
