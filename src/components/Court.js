import "./Court.css";
import { useRef } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";

const CourtContainer = styled.div`
  height: 730px;
  border: 1px solid #adb5bd;
  box-shadow: 0px 0px 7px 5px rgba(108, 117, 125, 0.4);
`;

const CourtBorder = styled.div`
  border: white 15px solid;
  border-bottom: 0px;
`;

const CourtLine = styled.div`
  position: relative;
  border: 1px solid #e9ecef;
  background-color: white;
`;

function Court(props) {
  const playerLastAxis = useRef();
  const basketballPic = useRef();

  let adjustY = 1;
  let adjustX = 1;

  function getCursorPosition(vas, event) {
    //clear 上一個定點
    let cvs = document.getElementById("cvs");
    let ctx = cvs.getContext("2d");
    if (playerLastAxis.current !== undefined) {
      ctx.clearRect(
        playerLastAxis.current.x / adjustX - 32,
        playerLastAxis.current.y / adjustY - 32,
        64,
        64
      );
    }
    const rect = vas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let axis = { x: x, y: y };
    props.setPlayerAxis(axis);
    playerLastAxis.current = axis;
    //add point
    basketballPic.current =
      "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fbasketball-32.png?alt=media&token=c613878c-bad8-4891-9e9e-ebdd6a833c9a";

    let base_image = new Image();
    const back = require("../img/basketball.png");
    base_image.src = back;

    base_image.opacity = 1;

    base_image.onload = () =>
      ctx.drawImage(
        base_image,
        Number(x / adjustX - 32),
        Number(y / adjustY - 32),
        64,
        64
      );
  }

  const locationInf = (location, num) => {
    flushSync(() => {
      props.setPlayerLocation();
      props.setPlayerLocationScoreNumber();
      props.dispatchPlayerActions({ type: "intial" });
    });
    props.setPlayerLocation(location);
    props.setPlayerLocationScoreNumber(num);
  };

  return (
    <CourtContainer>
      <CourtBorder>
        <CourtLine id="svgDiv">
          <canvas
            width={700}
            height={700}
            id="cvs"
            style={{ position: "absolute", pointerEvents: "none" }}
          ></canvas>
          <svg
            onClick={(e) => {
              getCursorPosition(e.currentTarget, e);
            }}
            version="1.1"
            id="myObj"
            style={{ height: "700px" }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 555 555"
            //   style="enable-background:new 0 0 555 555;"
            xmlSpace="preserve"
          >
            <defs>
              <pattern
                id="img1"
                patternUnits="userSpaceOnUse"
                width="250"
                height="492"
              >
                <image
                  xlinkHref="https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fbasketball-floor.jpeg?alt=media&token=952a1355-3f13-4697-8f89-00819d4b247e"
                  x="0"
                  y="-10"
                  width="70%"
                  height="100%"
                />
              </pattern>
            </defs>

            <g>
              <defs>
                <rect
                  id="SVGID_1_"
                  x="168.6"
                  y="102"
                  width="241"
                  height="59.9"
                />
              </defs>
              <path
                onClick={() => {
                  locationInf("中場半圓", 2);
                }}
                className="st0"
                style={{ fill: "white" }}
                id="obj2"
                d="M278.5,419.6c42.7,0,76,33.4,78.3,73.3h-9.9c-1.7-33.2-31.4-63.9-68.4-63.3c-37,0.5-65.5,29.4-67.1,63.2H201
		C203.7,453.7,235.8,419.6,278.5,419.6z"
              />
            </g>
            <g>
              <defs>
                <rect
                  id="SVGID_1_"
                  x="168.6"
                  y="102"
                  width="241"
                  height="59.9"
                />
              </defs>
              <clipPath id="SVGID_2_">
                <use xlinkHref="#SVGID_1_" style={{ overflow: "visible" }} />
              </clipPath>
              <g className="st1">
                <path
                  onClick={() => {
                    locationInf("禁區弧線", 2);
                  }}
                  className="st0"
                  d="M277,156.5c-53.1,0-96.3-41.3-96.3-92c0-50.7,43.2-92,96.3-92c53.1,0,96.3,41.3,96.3,92
			C373.3,115.3,330.1,156.5,277,156.5z M277-23.5c-50.9,0-92.3,39.5-92.3,88c0,48.5,41.4,88,92.3,88s92.3-39.5,92.3-88
			C369.3,16,327.9-23.5,277-23.5z"
                />
              </g>
            </g>
            <path
              onClick={() => {
                locationInf("左側45度角中距離", 2);
              }}
              id="lc1624_1_1_"
              className="st4"
              d="M134.3,162.3l-77.2,60c10,11.6,25.1,27.2,44.9,42.5c23,17.9,47.9,32.2,74.1,42.4
	c2.7,1,5.4,2,7.9,2.9l26.2-72.9c-2.6-5.7-4.5-11.7-5.5-18c-5.1-2.3-10-4.8-14.8-7.4h-6.1v-3.7C164.6,196.1,147.7,180.5,134.3,162.3z
	"
            />
            <path
              onClick={() => {
                locationInf("弧頂三分線", 3);
              }}
              id="c24Plus_1_1_"
              className="st4"
              d="M396.4,492.9l-46-165.3c-23,5.9-46.9,8.7-71.3,8.7c-24.9,0-49.4-3.1-73-9l-44.7,165.6H201
	c2.5-40.8,36.5-73.3,77.9-73.3c41.3,0,75.4,32.5,77.8,73.3H396.4z"
            />
            <path
              onClick={() => {
                locationInf("終場半圓內", 3);
              }}
              id="c24Plus_2_1_"
              className="st4"
              d="M279,429.5c-36,0-65.5,28.1-68,63.4h135.9C344.4,457.6,314.9,429.5,279,429.5z"
            />
            <path
              onClick={() => {
                locationInf("左側45度角三分", 3);
              }}
              id="lc24Plus_1_1_"
              className="st4"
              d="M202.2,326.2c-10.1-2.7-20.1-5.9-30-9.8c-27.1-10.6-52.9-25.4-76.6-43.9
	c-40.5-31.6-61-62.8-61.8-64.1l-0.5-0.8H1v285.3h156.2L202.2,326.2z"
            />
            <path
              onClick={() => {
                locationInf("禁區弧線內", 2);
              }}
              id="c08_1_1_"
              className="st4"
              d="M305.1,148.2c-8.2-3.8-17.5-5.9-27.1-5.9c-10,0-19.4,2.3-27.9,6.3c8.6,2.6,17.7,4,27,4
	C286.7,152.6,296.1,151,305.1,148.2z"
            />
            <path
              onClick={() => {
                locationInf("禁區弧線外,罰球線內", 2);
              }}
              id="c816_2_1_"
              className="st4"
              d="M213.7,201.9h128.4c-1.6-21.8-14.2-40.7-32.1-51c-10.5,3.7-21.6,5.7-32.9,5.7l0,0
	c-11,0-21.7-1.9-31.8-5.4C227.6,161.7,215.4,180.2,213.7,201.9z"
            />
            <path
              onClick={() => {
                locationInf("禁區弧線外右側,禁區內", 2);
              }}
              id="c816_3_3_"
              className="st4"
              d="M342.3,169.7V132c-3.6,3.2-7.4,6.1-11.6,8.8c-3.1,2-6.3,3.8-9.6,5.5
	C329.7,152.4,337.1,160.4,342.3,169.7z"
            />
            <path
              onClick={() => {
                locationInf("中距離弧頂", 2);
              }}
              id="c1624_1_1_"
              className="st4"
              d="M278,271.3c29.9,0,55.1-20.5,62.4-48.3c-20.1,7.6-41.5,11.6-63.3,11.6
	c-21,0-41.7-3.7-61.3-10.9c0.5,1.8,1,3.5,1.6,5.2l0,0l0,0C226.4,253.6,250.2,271.3,278,271.3z"
            />
            <path
              onClick={() => {
                locationInf("禁區弧線外左側,禁區內", 2);
              }}
              id="c816_3_2_"
              className="st4"
              d="M213.5,169.7c5.3-9.1,12.3-17,20.6-23.1c-7.3-3.5-14.3-7.9-20.6-13.2V169.7z"
            />
            <path
              onClick={() => {
                locationInf("罰球線", 2);
              }}
              id="c816_4_1_"
              className="st4"
              d="M342.1,211.8H213.7c0.2,2.5,0.5,4.9,1,7.2c19.7,7.6,40.9,11.6,62.4,11.6
	c22.1,0,43.9-4.2,64.3-12.3C341.7,216.1,342,214,342.1,211.8z"
            />
            <path
              onClick={() => {
                locationInf("禁區左側", 2);
              }}
              id="c08_2_1_"
              className="st4"
              d="M203.6,118V1.2h-9.9v102.3C196.6,108.7,199.9,113.5,203.6,118z"
            />
            <path
              onClick={() => {
                locationInf("弧頂遠中距離", 2);
              }}
              id="c1624_2_1_"
              className="st4"
              d="M187.8,311.5c29.2,9.9,59.8,14.9,91.3,14.9c31.1,0,61.4-4.9,90-14.7l-25.3-70.5
	c-12.5,23.8-37.3,40-65.8,40c-28.2,0-52.8-15.8-65.3-39L187.8,311.5z"
            />
            <path
              onClick={() => {
                locationInf("禁區弧線外左側45度,禁區內", 2);
              }}
              id="c816_5_1_"
              className="st4"
              d="M193.7,201.9h9.9v-77.9c-3.6-3.9-6.9-8.2-9.9-12.7V201.9z"
            />
            <path
              onClick={() => {
                locationInf("禁區右側", 2);
              }}
              id="c08_3_1_"
              className="st4"
              d="M352.3,115.7c2.9-3.6,5.5-7.4,7.7-11.5V1.2h-7.7V115.7z"
            />
            <path
              onClick={() => {
                locationInf("右側遠中距離", 2);
              }}
              id="r1624_1_1_"
              className="st4"
              d="M454.3,57.1c0,31-8,61.5-23.4,88.3c-2.7,4.7-5.6,9.1-8.6,13.6l78.1,60.7
	c6.2-7.5,10-13.1,11.6-15.4V1.2h-66.7C451.3,19.2,454.3,38,454.3,57.1z"
            />
            <path
              onClick={() => {
                locationInf("右側中距離", 2);
              }}
              id="r816_1_1_"
              className="st4"
              d="M369.9,203.6c23.7-15.1,43.6-35.9,57.6-60.3c14.9-26.1,22.8-55.9,22.8-86.3
	c0-19.1-3.1-37.9-9.2-55.9h-71.2V203.6z"
            />
            <path
              onClick={() => {
                locationInf("籃下禁區", 2);
              }}
              id="c08_4_1_"
              className="st4"
              d="M237.9,144.1c11.6-7.4,25.3-11.7,40.1-11.7c14.4,0,27.8,4.1,39.2,11.2c9.2-4.3,17.7-10,25.2-17.1
	V1.2H213.5v127C220.9,134.7,229.1,140.1,237.9,144.1z"
            />
            <path
              onClick={() => {
                locationInf("左側中距離", 2);
              }}
              id="l816_1_1_"
              className="st4"
              d="M103.8,57.1c0,30.2,7.9,60,22.8,86.1c13.9,24.4,33.6,45.1,57.2,60.2V1.2H113
	C106.9,19.1,103.8,38,103.8,57.1z"
            />
            <path
              onClick={() => {
                locationInf("禁區弧線外左側45度,禁區內", 2);
              }}
              id="c816_8_1_"
              className="st4"
              d="M352.3,201.9h7.7v-90c-2.3,3.6-5,6.9-7.7,10.1V201.9z"
            />
            <path
              onClick={() => {
                locationInf("右側45度角中距離", 2);
              }}
              id="rc1624_1_1_"
              className="st4"
              d="M346.2,236.3l26.7,74.2c3-1,5.9-2.2,8.9-3.3c25.9-10.3,50.5-24.6,73-42.5
	c19.1-15.2,33.5-30.4,43.1-41.9L420,162.1c-13.6,18.4-30.5,34.2-50.1,46.2v3.5h-5.8c-4.2,2.3-8.4,4.5-12.7,6.4
	C350.5,224.6,348.7,230.6,346.2,236.3z"
            />
            <path
              onClick={() => {
                locationInf("左側遠中距離", 2);
              }}
              id="l1624_1_1_"
              className="st4"
              d="M99.8,57.1c0-19.1,3.1-37.9,9-55.9H42.9v203c1.6,2.3,5.5,7.7,11.6,15.1l77.4-60.2
	c-3.2-4.5-6-9.1-8.8-13.9C107.9,118.5,99.8,88,99.8,57.1z"
            />
            <path
              onClick={() => {
                locationInf("右側45度三分", 3);
              }}
              id="rc24Plus_1_1_"
              className="st4"
              d="M556,492.9V207.6h-34.5l-0.4,0.7c-0.8,1.3-20.4,32.5-60.2,64.1
	c-23.3,18.6-48.7,33.4-75.6,44c-10.1,4-20.6,7.4-31.2,10.2l46.3,166.3H556z"
            />
            <path
              onClick={() => {
                locationInf("左邊底角三分線上", 2);
              }}
              className="st15"
              style={{
                fill: "white",
                cursor: "pointer",
              }}
              d="M42.9,1.7c0,0.4,0,0.8,0,1.2c0,67.8,0,135.6,0,203.4c0,0.4,0,0.8,0,1.2c-3.3,0-6.6,0-10,0c0-0.6,0-1.1,0-1.7
	c0-67.5,0-135,0-202.4c0-0.6,0-1.1,0-1.7C36.3,1.7,39.6,1.7,42.9,1.7z"
            />
            <path
              // style={{ border: "none" }}
              onClick={() => {
                locationInf("右邊底角三分線上", 2);
              }}
              className="st15"
              style={{
                fill: "white",
                cursor: "pointer",
              }}
              id="ts77"
              d="M522,1.2c0,0.4,0,0.8,0,1.2c0,67.8,0,135.6,0,203.4c0,0.4,0,0.8,0,1.2c-3.3,0-6.6,0-10,0c0-0.6,0-1.1,0-1.7
	c0-67.5,0-135,0-202.4c0-0.6,0-1.1,0-1.7C515.4,1.2,518.7,1.2,522,1.2z"
            />
            <path
              className="st0"
              d="M32.9,207.5c3.3,0,6.6,0,10,0c0,0.1,0,0.2,0,0.2c-3.3,0-6.7,0-10,0C32.9,207.7,32.9,207.6,32.9,207.5z"
            />
            <g>
              <defs>
                <rect
                  id="SVGID_3_"
                  x="1.4"
                  y="196.8"
                  width="31.2"
                  height="13.2"
                />
              </defs>
              <clipPath id="SVGID_4_">
                <use xlinkHref="#SVGID_3_" style={{ overflow: "visible" }} />
              </clipPath>
              <g className="st9">
                <path
                  onClick={() => {
                    locationInf("左側三分", 3);
                  }}
                  className="st15"
                  style={{
                    fill: "white",
                    cursor: "pointer",
                  }}
                  d="M521.8,203.6V1.1h25.8v-1.2H-2.2v550.4h549.9v-57.4H400.4l-46.3-166.3c10.6-2.8,21.1-6.2,31.2-10.2
			c26.9-10.6,52.3-25.4,75.6-44c39.8-31.5,59.4-62.8,60.2-64.1l0.4-0.7h26.2v-4H521.8z M441,1.1c6.1,18,9.2,36.8,9.2,55.9
			c0,30.3-7.9,60.2-22.8,86.3c-14,24.4-33.9,45.2-57.6,60.3V1.1H441z M359.9,1.1v103c-2.3,4.1-4.9,7.9-7.7,11.5V1.1H359.9z
			 M352.2,121.9c2.8-3.2,5.5-6.5,7.7-10.1v90h-7.7V121.9z M342.3,1.1v125.3c-7.4,7-16,12.8-25.2,17.1c-11.4-7.1-24.8-11.2-39.2-11.2
			c-14.8,0-28.5,4.3-40.1,11.7c-8.8-4-17.1-9.3-24.4-15.9V1.1H342.3z M277,230.6c-21.5,0-42.6-4-62.4-11.6c-0.5-2.4-0.8-4.8-1-7.2
			h128.4c-0.1,2.2-0.4,4.4-0.8,6.5C320.9,226.4,299.1,230.6,277,230.6z M340.3,223c-7.2,27.8-32.4,48.3-62.4,48.3
			c-27.8,0-51.6-17.7-60.6-42.4c-0.6-1.7-1.1-3.4-1.6-5.2c19.5,7.2,40.3,10.9,61.3,10.9C298.7,234.6,320.2,230.6,340.3,223z
			 M189.9,211.8c4.8,2.7,9.7,5.2,14.8,7.4c1,6.3,2.9,12.4,5.5,18l-26.2,72.9c-2.6-0.9-5.3-1.9-7.9-2.9
			c-26.2-10.2-51.1-24.5-74.1-42.4C82.1,249.4,67,233.9,57,222.3l77.2-60c13.4,18.2,30.2,33.8,49.5,45.8v3.7H189.9z M193.6,111.2
			c3,4.5,6.3,8.8,9.9,12.7v77.9h-9.9V111.2z M213.5,133.4c6.3,5.3,13.3,9.7,20.6,13.2c-8.3,6.1-15.4,14-20.6,23.1V133.4z
			 M213.7,201.8c1.7-21.6,13.9-40.2,31.5-50.7c10.1,3.5,20.8,5.4,31.8,5.4c11.3,0,22.4-2,32.9-5.7c17.9,10.3,30.5,29.2,32.1,51
			H213.7z M250,148.6c8.4-4.1,17.8-6.3,27.9-6.3c9.6,0,18.8,2.2,27.1,5.9c-8.9,2.8-18.3,4.4-28,4.4
			C267.7,152.6,258.7,151.2,250,148.6z M321,146.2c3.3-1.7,6.5-3.5,9.6-5.5c4.2-2.7,8-5.7,11.6-8.8v37.8
			C337,160.4,329.7,152.4,321,146.2z M203.5,1.1V118c-3.7-4.5-7-9.3-9.9-14.5V1.1H203.5z M183.7,1.1v202.2
			c-23.6-15.1-43.3-35.8-57.2-60.2c-14.9-26.1-22.8-55.8-22.8-86.1c0-19.1,3.2-38,9.2-55.9H183.7z M42.8,73.6V1.1h65.9
			c-5.9,18-9,36.8-9,55.9c0,30.9,8.1,61.4,23.3,88.1c2.8,4.8,5.7,9.4,8.8,13.9l-77.4,60.2c-6.1-7.3-10-12.8-11.6-15.1V73.6
			 M32.9,73.6v130.1H1V1.1h31.9V73.6 M1,492.9V207.6h32.2l0.5,0.8c0.8,1.3,21.3,32.4,61.8,64.1c23.8,18.5,49.6,33.3,76.6,43.9
			c9.9,3.9,19.9,7.1,30,9.8l-45,166.7H1z M210.9,492.9c2.5-35.3,32-63.4,68-63.4c35.9,0,65.4,28.1,67.9,63.4H210.9z M396.3,492.9
			h-39.6c-2.5-40.8-36.5-73.3-77.8-73.3c-41.4,0-75.5,32.5-77.9,73.3h-39.7L206,327.3c23.6,5.9,48.1,9,73,9
			c24.4,0,48.3-2.9,71.3-8.7L396.3,492.9z M279,326.4c-31.5,0-62.2-5-91.3-14.9l24.9-69.3c12.6,23.2,37.2,39,65.3,39
			c28.6,0,53.3-16.2,65.8-40l25.3,70.5C340.4,321.5,310.1,326.4,279,326.4z M454.7,264.6c-22.5,17.9-47.1,32.2-73,42.5
			c-3,1.1-5.9,2.3-8.9,3.3l-26.7-74.2c2.5-5.7,4.3-11.7,5.3-18c4.3-2,8.5-4.2,12.7-6.4h5.8v-3.5c19.5-12,36.5-27.8,50.1-46.2
			l77.9,60.6C488.2,234.2,473.8,249.4,454.7,264.6z M511.9,204.2c-1.6,2.3-5.4,7.8-11.6,15.4l-78.1-60.7c3.1-4.5,5.9-8.9,8.6-13.6
			c15.4-26.8,23.4-57.2,23.4-88.3c0-19.1-3-37.9-9-55.9h66.7V204.2z"
                />
                <rect
                  x="547.7"
                  y="1.1"
                  className="st6"
                  width="8.3"
                  height="202.5"
                />
                <rect
                  x="547.7"
                  y="207.6"
                  className="st6"
                  width="8.3"
                  height="285.3"
                />
              </g>
            </g>
            <g>
              <defs>
                <rect
                  id="SVGID_5_"
                  x="521.9"
                  y="196.9"
                  width="34.3"
                  height="13.2"
                />
              </defs>
              <clipPath id="SVGID_6_">
                <use xlinkHref="#SVGID_5_" style={{ overflow: "visible" }} />
              </clipPath>
              <g className="st11" style={{ clipPath: "url(#SVGID_6_)" }}>
                <path
                  onClick={() => {
                    locationInf("右側三分", 3);
                  }}
                  className="st15"
                  style={{
                    fill: "white",
                    cursor: "pointer",
                  }}
                  d="M1094.3,203.7V1.3h28.4V0H518v550.4h604.7V493h-162l-50.9-166.3c11.7-2.8,23.2-6.2,34.3-10.2
			c29.6-10.6,57.5-25.4,83.1-44c43.7-31.5,65.3-62.8,66.2-64.1l0.4-0.7h28.8v-4H1094.3z M1005.4,1.3c6.8,18,10.1,36.8,10.1,55.9
			c0,30.3-8.7,60.2-25.1,86.3c-15.4,24.4-37.3,45.2-63.4,60.3V1.3H1005.4z M916.2,1.3v103c-2.5,4.1-5.3,7.9-8.5,11.5V1.3H916.2z
			 M907.7,122c3.1-3.2,6-6.5,8.5-10.1v90h-8.5V122z M896.8,1.3v125.3c-8.2,7-17.6,12.8-27.7,17.1c-12.5-7.1-27.3-11.2-43.1-11.2
			c-16.2,0-31.3,4.3-44.1,11.7c-9.7-4-18.8-9.3-26.8-15.9V1.3H896.8z M825.1,230.7c-23.7,0-46.9-4-68.6-11.6
			c-0.5-2.4-0.9-4.8-1.1-7.2h141.2c-0.1,2.2-0.4,4.4-0.9,6.5C873.4,226.5,849.4,230.7,825.1,230.7z M894.6,223.1
			c-8,27.8-35.7,48.3-68.6,48.3c-30.5,0-56.7-17.7-66.6-42.4c-0.7-1.7-1.2-3.4-1.7-5.2c21.5,7.2,44.3,10.9,67.4,10.9
			C848.9,234.7,872.5,230.7,894.6,223.1z M729.2,211.9c5.2,2.7,10.7,5.2,16.2,7.4c1.1,6.3,3.2,12.4,6,18l-28.8,72.9
			c-2.8-0.9-5.8-1.9-8.7-2.9c-28.8-10.2-56.2-24.5-81.5-42.4c-21.8-15.4-38.4-30.9-49.4-42.5l84.9-60c14.7,18.2,33.3,33.8,54.4,45.8
			v3.7H729.2z M733.4,111.3c3.3,4.5,7,8.8,10.9,12.7V202h-10.9V111.3z M755.2,133.5c7,5.3,14.6,9.7,22.7,13.2
			c-9.2,6.1-16.9,14-22.7,23.1V133.5z M755.4,202c1.9-21.6,15.3-40.2,34.7-50.7c11.1,3.5,22.9,5.4,35,5.4c12.4,0,24.6-2,36.2-5.7
			c19.7,10.3,33.6,29.2,35.3,51H755.4z M795.4,148.7c9.3-4.1,19.6-6.3,30.6-6.3c10.6,0,20.7,2.2,29.8,5.9
			c-9.8,2.8-20.2,4.4-30.8,4.4C814.8,152.7,804.9,151.3,795.4,148.7z M873.5,146.3c3.6-1.7,7.2-3.5,10.6-5.5
			c4.6-2.7,8.8-5.7,12.8-8.8v37.8C891,160.5,883,152.5,873.5,146.3z M744.3,1.3v116.8c-4-4.5-7.7-9.3-10.9-14.5V1.3H744.3z
			 M722.5,1.3v202.2c-26-15.1-47.7-35.8-62.9-60.2c-16.4-26.1-25.1-55.8-25.1-86.1c0-19.1,3.5-38,10.1-55.9H722.5z M567.5,73.7V1.3
			H640c-6.5,18-9.9,36.8-9.9,55.9c0,30.9,8.9,61.4,25.6,88.1c3.1,4.8,6.2,9.4,9.7,13.9l-85.2,60.2c-6.8-7.3-11-12.8-12.8-15.1V73.7
			 M556.6,73.7v130.1h-35.1V1.3h35.1V73.7 M521.5,493V207.7h35.4l0.5,0.8c0.9,1.3,23.4,32.4,67.9,64.1
			c26.2,18.5,54.5,33.3,84.3,43.9c10.9,3.9,21.9,7.1,33,9.8L693.2,493H521.5z M752.3,493c2.7-35.3,35.2-63.4,74.8-63.4
			c39.5,0,72,28.1,74.7,63.4H752.3z M956.2,493h-43.5c-2.7-40.8-40.1-73.3-85.6-73.3c-45.6,0-83,32.5-85.7,73.3h-43.6L747,327.4
			c26,5.9,52.9,9,80.3,9c26.8,0,53.1-2.9,78.4-8.7L956.2,493z M827.2,326.5c-34.7,0-68.4-5-100.4-14.9l27.4-69.3
			c13.8,23.2,40.9,39,71.9,39c31.4,0,58.7-16.2,72.4-40l27.8,70.5C894.7,321.6,861.5,326.5,827.2,326.5z M1020.5,264.7
			c-24.8,17.9-51.8,32.2-80.3,42.5c-3.3,1.1-6.5,2.3-9.8,3.3l-29.3-74.2c2.7-5.7,4.7-11.7,5.8-18c4.7-2,9.4-4.2,14-6.4h6.3v-3.5
			c21.5-12,40.1-27.8,55.1-46.2l85.7,60.6C1057.3,234.3,1041.5,249.5,1020.5,264.7z M1083.4,204.3c-1.7,2.3-5.9,7.8-12.8,15.4
			L984.7,159c3.4-4.5,6.5-8.9,9.5-13.6c16.9-26.8,25.7-57.2,25.7-88.3c0-19.1-3.3-37.9-9.9-55.9h73.4V204.3z"
                />
              </g>
            </g>
            <g>
              <defs>
                <polygon
                  id="SVGID_9_"
                  points="201.8,326.5 206.9,327.8 162.3,493 155.3,493 		"
                />
              </defs>
              <clipPath id="SVGID_8_">
                <use xlinkHref="#SVGID_9_" style={{ overflow: "visible" }} />
              </clipPath>
              <g className="st12" style={{ clipPath: "url(#SVGID_8_)" }}>
                <path
                  onClick={() => {
                    locationInf("左側45度三分", 3);
                  }}
                  className="st15"
                  style={{
                    fill: "white",
                    cursor: "pointer",
                  }}
                  d="M518.8,203.9V1.4h25.6V0.2H-0.8v550.4h545.2v-57.4H398.4l-45.9-166.3c10.5-2.8,20.9-6.2,31-10.2
			c26.6-10.6,51.8-25.4,74.9-44c39.4-31.5,58.9-62.8,59.7-64.1l0.4-0.7h26v-4H518.8z M438.7,1.4c6.1,18,9.1,36.8,9.1,55.9
			c0,30.3-7.9,60.2-22.6,86.3c-13.9,24.4-33.6,45.2-57.1,60.3V1.4H438.7z M358.2,1.4v103c-2.3,4.1-4.8,7.9-7.7,11.5V1.4H358.2z
			 M350.6,122.2c2.8-3.2,5.4-6.5,7.7-10.1v90h-7.7V122.2z M340.7,1.4v125.3c-7.4,7-15.8,12.8-25,17.1c-11.3-7.1-24.6-11.2-38.8-11.2
			c-14.6,0-28.2,4.3-39.7,11.7c-8.8-4-16.9-9.3-24.2-15.9V1.4H340.7z M276.1,230.9c-21.3,0-42.3-4-61.8-11.6c-0.5-2.4-0.8-4.8-1-7.2
			h127.3c-0.1,2.2-0.4,4.4-0.8,6.5C319.6,226.7,298,230.9,276.1,230.9z M338.8,223.2c-7.2,27.8-32.1,48.3-61.8,48.3
			c-27.5,0-51.1-17.7-60.1-42.4c-0.6-1.7-1.1-3.4-1.6-5.2c19.4,7.2,39.9,10.9,60.8,10.9C297.6,234.8,318.8,230.9,338.8,223.2z
			 M189.6,212c4.7,2.7,9.6,5.2,14.6,7.4c1,6.3,2.9,12.4,5.4,18l-26,72.9c-2.6-0.9-5.2-1.9-7.9-2.9c-26-10.2-50.6-24.5-73.4-42.4
			c-19.7-15.4-34.6-30.9-44.5-42.5l76.6-60c13.3,18.2,30,33.8,49.1,45.8v3.7H189.6z M193.4,111.5c2.9,4.5,6.3,8.8,9.8,12.7v77.9
			h-9.8V111.5z M213,133.7c6.3,5.3,13.2,9.7,20.4,13.2c-8.3,6.1-15.2,14-20.4,23.1V133.7z M213.2,202.1
			c1.7-21.6,13.8-40.2,31.3-50.7c10,3.5,20.6,5.4,31.6,5.4c11.2,0,22.2-2,32.6-5.7c17.8,10.3,30.3,29.2,31.9,51H213.2z M249.3,148.9
			c8.4-4.1,17.7-6.3,27.6-6.3c9.5,0,18.7,2.2,26.8,5.9c-8.8,2.8-18.2,4.4-27.7,4.4C266.8,152.8,257.9,151.4,249.3,148.9z
			 M319.7,146.5c3.2-1.7,6.5-3.5,9.5-5.5c4.1-2.7,8-5.7,11.5-8.8V170C335.5,160.7,328.3,152.6,319.7,146.5z M203.2,1.4v116.8
			c-3.6-4.5-7-9.3-9.8-14.5V1.4H203.2z M183.5,1.4v202.2c-23.4-15.1-43-35.8-56.7-60.2c-14.7-26.1-22.6-55.8-22.6-86.1
			c0-19.1,3.1-38,9.1-55.9H183.5z M43.8,73.8V1.4h65.4c-5.9,18-8.9,36.8-8.9,55.9c0,30.9,8.1,61.4,23.1,88.1
			c2.8,4.8,5.6,9.4,8.8,13.9l-76.8,60.2c-6.1-7.3-9.9-12.8-11.5-15.1V73.8 M34,73.8v130.1H2.3V1.4H34V73.8 M2.3,493.1V207.9h32
			l0.5,0.8c0.8,1.3,21.1,32.4,61.3,64.1c23.6,18.5,49.2,33.3,76,43.9c9.8,3.9,19.8,7.1,29.8,9.8l-44.6,166.7H2.3z M210.5,493.1
			c2.5-35.3,31.8-63.4,67.4-63.4c35.6,0,64.9,28.1,67.3,63.4H210.5z M394.3,493.1h-39.2c-2.5-40.8-36.2-73.3-77.2-73.3
			c-41.1,0-74.8,32.5-77.3,73.3h-39.3l44.3-165.6c23.4,5.9,47.7,9,72.4,9c24.2,0,47.9-2.9,70.7-8.7L394.3,493.1z M278,326.7
			c-31.3,0-61.6-5-90.5-14.9l24.7-69.3c12.5,23.2,36.9,39,64.8,39c28.3,0,52.9-16.2,65.3-40l25.1,70.5
			C338.9,321.8,308.9,326.7,278,326.7z M452.2,264.9c-22.3,17.9-46.7,32.2-72.4,42.5c-2.9,1.1-5.9,2.3-8.8,3.3l-26.4-74.2
			c2.5-5.7,4.2-11.7,5.2-18c4.2-2,8.5-4.2,12.6-6.4h5.7v-3.5c19.4-12,36.2-27.8,49.6-46.2l77.3,60.6
			C485.5,234.4,471.2,249.7,452.2,264.9z M509,204.5c-1.6,2.3-5.3,7.8-11.5,15.4L420,159.2c3-4.5,5.9-8.9,8.6-13.6
			c15.2-26.8,23.2-57.2,23.2-88.3c0-19.1-2.9-37.9-8.9-55.9H509V204.5z"
                />
                <rect
                  x="544.4"
                  y="1.4"
                  className="st6"
                  width="8.2"
                  height="202.5"
                />
                <rect
                  x="544.4"
                  y="207.9"
                  className="st6"
                  width="8.2"
                  height="285.3"
                />
              </g>
            </g>
            <polygon
              onClick={() => {
                locationInf("右側45度三分", 3);
              }}
              className="st15"
              style={{
                fill: "white",
                cursor: "pointer",
              }}
              points="354.2,327 400.4,492.9 396.4,492.9 350.5,328.1 "
            />
            <g>
              <path
                onClick={() => {
                  locationInf("禁區圓弧", 2);
                }}
                className="st0"
                style={{ fill: "white" }}
                d="M277.9,132.8c40.6,0,73.6,31.3,73.6,69.9h-9.8c0-33-28.6-59.9-63.7-59.9s-63.7,26.9-63.7,59.9h-9.8
		C204.3,164.1,237.3,132.8,277.9,132.8z"
              />
            </g>
            <rect
              onClick={() => {
                locationInf("罰球線上", 2);
              }}
              x="183.6"
              y="202.1"
              className="st15"
              style={{
                fill: "white",
                cursor: "pointer",
              }}
              width="186.4"
              height="9.5"
            />
            <rect
              onClick={() => {
                locationInf("左側禁區線上", 2);
              }}
              x="183.8"
              y="1.2"
              className="st0"
              width="9.9"
              height="200.7"
            />
            <rect
              onClick={() => {
                locationInf("左側禁區靠內線上", 2);
              }}
              x="203.8"
              y="1.2"
              className="st0"
              width="9.9"
              height="200.7"
            />
            <rect
              onClick={() => {
                locationInf("右側禁區靠內線上", 2);
              }}
              x="341.9"
              y="0.8"
              className="st0"
              width="9.9"
              height="200.7"
            />
            <rect
              onClick={() => {
                locationInf("右側禁區線上", 2);
              }}
              x="360.2"
              y="0.8"
              className="st0"
              width="9.9"
              height="200.7"
            />
            <polygon
              onClick={() => {
                locationInf("左側45度偏底角中距離", 2);
              }}
              className="st0"
              points="131.9,159 54.5,219.2 57.2,222.8 134.3,162.3 "
            />
            <polygon
              onClick={() => {
                locationInf("左側45度偏弧頂中距離", 2);
              }}
              className="st0"
              points="213.2,229.6 183.4,310 187.8,311.5 216.9,231.1 "
            />
            <polygon
              onClick={() => {
                locationInf("右側45度偏弧頂中距離", 2);
              }}
              className="st0"
              points="342.3,237.6 369.1,311.7 373.9,310.3 346.2,236.3 "
            />
            <polygon
              onClick={() => {
                locationInf("右側45度偏底角中距離", 2);
              }}
              className="st0"
              points="419.7,162.2 497.9,222.7 500.4,219.6 422.1,159 "
            />
            <g>
              <path
                onClick={() => {
                  locationInf("弧頂中距離", 2);
                }}
                className="st0"
                style={{ fill: "white" }}
                d="M277.6,281c-40.5,0-73.5-31.3-73.5-69.9h9.8c0,33,28.6,59.9,63.7,59.9s63.7-26.9,63.7-59.9h9.8
		C351.1,249.6,318.2,281,277.6,281z"
              />
            </g>
            <g>
              <defs>
                <rect
                  id="SVGID_11_"
                  x="83.7"
                  y="1.1"
                  width="411.7"
                  height="238.3"
                />
              </defs>
              <clipPath id="SVGID_10_">
                <use xlinkHref="#SVGID_11_" style={{ overflow: "visible" }} />
              </clipPath>
              <g className="st14" style={{ clipPath: "url(#SVGID_10_)" }}>
                <path
                  onClick={() => {
                    locationInf("中距離弧線", 2);
                  }}
                  className="st0"
                  d="M277,234.6c-97.9,0-177.5-79.2-177.5-176.5S179.2-118.4,277-118.4S454.5-39.2,454.5,58.1
			S374.9,234.6,277,234.6z M277-114.4c-95.7,0-173.5,77.4-173.5,172.5S181.4,230.6,277,230.6s173.5-77.4,173.5-172.5
			S372.7-114.4,277-114.4z"
                />
              </g>
            </g>
            <path
              onClick={() => {
                locationInf("右側45度三分踩線", 2);
              }}
              className="st15"
              style={{
                fill: "white",
                cursor: "pointer",
              }}
              d="M522,207c-10.1,16.3-23.7,30.7-37.2,44.4c-21.5,21.8-46,39.4-73.3,53.2c-11.5,5.8-23.5,10.7-35.7,15c-1,0.4-1.4,0.2-1.8-0.9
	c-0.7-2.6-1.6-5.2-2.5-7.9c3.2-1.2,6.3-2.3,9.4-3.4c25.6-9.7,49.3-22.8,70.9-39.6c17.8-15,34.7-30.7,48.7-48.4
	c4.4-4.9,7.9-9.8,11.5-15.1"
            />
            <path
              onClick={() => {
                locationInf("左側45度三分踩線", 2);
              }}
              className="st15"
              style={{
                fill: "white",
                cursor: "pointer",
              }}
              d="M32.8,206.7c10.1,16.3,23.7,30.7,37.2,44.4c21.5,21.8,46,39.4,73.3,53.2c11.5,5.8,26.1,11.3,38.3,15.6
	c0.5-1,0.3-1.3,0.6-2.4c0.7-2.6,0.9-4.5,1.8-7.2c-3.2-1.2-7.2-2-10.2-3.2c-25.3-10.9-47.5-24.7-70.3-40.6
	c-17.8-15-35.3-29.7-49.2-47.4c-4.4-4.9-7.9-9.8-11.5-15.1"
            />
            <path
              onClick={() => {
                locationInf("弧頂三分踩線", 2);
              }}
              className="st0"
              d="M181.9,319.8c17.9,6.9,41.4,11.5,60.4,14.2c30.3,4.4,61.6,2.8,91.7-2.7c11.9-2.2,26.5-6.5,38.4-10.3
	c1.3-0.4,2-1.9,1.5-3.2c0,0,0,0,0,0c-0.7-1.7-1-3.1-1.5-4.7c-0.4-1.3-1.8-2-3.1-1.6c-3,1-6.5,2.3-9,3.1
	c-25.3,8.2-50.1,11.3-79.2,11.8c-0.1,0-6.5-0.1-6.6-0.1c-24-0.8-41.9-2.4-63.7-8c-6.5-1.2-20.8-6-26.8-8.1"
            />
            <rect
              onClick={() => {
                locationInf("前場", 3);
              }}
              className="st4"
              x="1"
              y="492.9"
              width="553.6"
              height="61.9"
            />
            <g>
              <defs>
                <rect
                  id="SVGID_13_"
                  x="1.1"
                  y="1.3"
                  width="31.9"
                  height="202.5"
                />
              </defs>
              <clipPath id="SVGID_12_">
                <use xlinkHref="#SVGID_13_" style={{ overflow: "visible" }} />
              </clipPath>
              <path
                onClick={() => {
                  locationInf("左邊底角三分", 3);
                }}
                className="st4"
                //   id="r24Plus_1_1_"
                //   style="opacity:0.6;clip-path:url(#SVGID_12_);fill:#9E9E9E;enable-background:new    ;"
                d="M522,1.3v202.5
		h34.1V1.3H522H1.1l31.9-0.1l0,202.5H1.1V1.3"
              />
            </g>
            <g>
              <defs>
                <rect
                  id="SVGID_15_"
                  x="522.1"
                  y="1.1"
                  width="31.9"
                  height="202.5"
                />
              </defs>
              <clipPath id="SVGID_14_">
                <use xlinkHref="#SVGID_15_" style={{ overflow: "visible" }} />
              </clipPath>
              <path
                style={{ fill: "transparent" }}
                onClick={() => {
                  locationInf("右邊底角三分", 3);
                }}
                id="r24Plus_1_2_"
                className="st101"
                d="M1043,1.1v202.5h34.1V1.1H1043H522.1L554.1,1l0,202.5h-31.9V1.1"
              />
            </g>
          </svg>
        </CourtLine>
      </CourtBorder>
    </CourtContainer>
  );
}

export default Court;
