import { useEffect, useState } from "react";
import App from "./App";
import styled from "styled-components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
const SideBar = styled.div`
  background-color: green;
  width: 15vw;
  height: 100vh;
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
            to="/record"
          >
            Record
          </LinkComponet>
          <span> | </span>
          <LinkComponet
            $focus={navActive === 2}
            onClick={() => setNavActive(2)}
            to="/team-inf"
          >
            球隊資訊
          </LinkComponet>
        </SideBar>
      </div>
    </>
  );
}

export default Profile;
