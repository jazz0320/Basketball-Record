// import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "../Home/Home";

const NotFoundDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  background-color: #fff;
  height: 100vh;
  width: 100vw;
`;
const DetailDiv = styled.div`
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailLeaveDiv = styled.div`
  margin-top: 20px;
  cursor: pointer;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    span {
      border-bottom: 2px solid black;
    }
  }
`;

export default function NotFoundPage() {
  return (
    <>
      {/* <NotFoundDiv>
        <div>
          <DetailDiv>Sorry, 此網頁不存在。</DetailDiv>
          <img src={require("../../img/404/4quarters-mutombo-404.gif")} />
          <Link to="/">
            <DetailLeaveDiv>
              <span>回到首頁</span>
              <img src={require("../../img/logout/logout.png")} />
            </DetailLeaveDiv>
          </Link>
        </div>
      </NotFoundDiv>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes> */}
    </>
  );
}
