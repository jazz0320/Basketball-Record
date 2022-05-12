import { GeneralDiv } from "../utils/StyleComponent";
import { useEffect, useRef, useState } from "react";

let gradeType = [
  "to",
  "oreb",
  "fta",
  "reb",
  "ftm",
  "stl",
  "pf",
  "ast",
  "fgRate",
  "threePtm",
  "fgm",
  "threePtRate",
  "ftRate",
  "threePta",
  "blk",
  "pts",
  "dreb",
  "fga",
];

function PlayerGrade(props) {
  const [checkDataType, setCheckDataType] = useState("pts");
  return (
    <GeneralDiv
      width="43vw"
      // height="60vh"
      border="2px solid #adb5bd"
      borderRadius="10px"
    >
      <GeneralDiv padding="5px 10px">
        <select
          value={checkDataType}
          onChange={(e) => setCheckDataType(e.target.value)}
        >
          {gradeType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </GeneralDiv>
      <GradeOutCome
        playerGrade={props.playerGrade}
        checkDataType={checkDataType}
      />
    </GeneralDiv>
  );
}
export default PlayerGrade;

function GradeOutCome(props) {
  const [sortData, setSortData] = useState();
  useEffect(() => {
    let data = [...props.playerGrade].sort(function (a, b) {
      return b[props.checkDataType] - a[props.checkDataType];
    });
    setSortData(data);
  }, [props.checkDataType, props.playerGrade]);
  return (
    <GeneralDiv divFontSize="20px">
      <GeneralDiv
        display="flex"
        backgroundColor="#343a40"
        color="#f8f9fa"
        padding="0 10px"
        justifyContent="space-around"
      >
        <GeneralDiv width="40px" textAlign="center">
          Rank
        </GeneralDiv>
        <GeneralDiv width="350px" textAling="center">
          Player
        </GeneralDiv>
        <GeneralDiv width="120px">Team</GeneralDiv>
        <GeneralDiv width="80px">Number</GeneralDiv>
      </GeneralDiv>
      <GeneralDiv height="59vh" overflowY="scroll">
        {sortData?.map((data, index) => (
          <GeneralDiv
            key={data.name}
            display="flex"
            alignItems="center"
            marginBottom="10px"
            justifyContent="space-around"
          >
            <GeneralDiv width="50px" textAling="center">
              {index + 1}
            </GeneralDiv>
            <GeneralDiv
              backgroundImage={`url(${data.pic})`}
              height="100px"
              width="100px"
              borderRadius="100%"
              backgroundSize="contain"
              backgroundRepeat="no-repeat"
            />
            <GeneralDiv width="250px" textAling="center">
              {data.name}
            </GeneralDiv>
            <GeneralDiv width="120px">{data.team}</GeneralDiv>
            <GeneralDiv width="120px" textAling="center">
              {data[props.checkDataType]}
            </GeneralDiv>
          </GeneralDiv>
        ))}
      </GeneralDiv>
    </GeneralDiv>
  );
}
