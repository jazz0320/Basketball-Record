import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { GeneralDiv, GeneralButton } from "../utils/StyleComponent";

const SideBar = styled.div`
  padding: 2vh 0;
  height: calc(100vh - 180px);
  width: 20vw;
  background-color: #495057;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const ContainDiv = styled.div`
  margin: 20px;
  border: #ced4da 2px solid;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
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
            會員資料
          </LinkComponet>

          <LinkComponet
            $focus={navActive === 1}
            onClick={() => setNavActive(1)}
            to="game-arrange"
          >
            安排比賽
          </LinkComponet>

          <LinkComponet
            $focus={navActive === 2}
            onClick={() => setNavActive(2)}
            to="team-inf"
          >
            球隊資訊
          </LinkComponet>

          <LinkComponet
            $focus={navActive === 3}
            onClick={() => setNavActive(3)}
            to="game-schedule"
          >
            賽程安排
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
