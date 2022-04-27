import { useEffect, useState } from "react";
import App from "./App";
import styled from "styled-components";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
const SideBar = styled.div`
  background-color: green;
`;

const LinkComponet = styled(Link)`
  width: 7vw;
  border: 1px solid gray;
  text-align: center;
  background-color: ${(props) => (props.$focus ? "gray" : "white")};
  color: black;
  text-decoration: none;
  :active {
    background-color: rgb(41, 41, 41);
  }
`;

function Profile(props) {
  const [navActive, setNavActive] = useState();
  return (
    <>
      <div>
        <SideBar>
          <LinkComponet
            $focus={navActive === 1}
            onClick={() => setNavActive(1)}
            to="game-arrange"
          >
            安排比賽
          </LinkComponet>
          <span> | </span>
          <LinkComponet
            $focus={navActive === 2}
            onClick={() => setNavActive(2)}
            to="team-inf"
          >
            球隊資訊
          </LinkComponet>
          <span> | </span>
          <LinkComponet
            $focus={navActive === 3}
            onClick={() => setNavActive(3)}
            to="game-schedule"
          >
            賽程安排
          </LinkComponet>
        </SideBar>
      </div>
      <Outlet />
    </>
  );
}

export default Profile;
