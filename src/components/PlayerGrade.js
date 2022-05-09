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
  const checkDataType = useRef("pts");
  return (
    <GeneralDiv width="40vw" height="60vh">
      <GeneralDiv>
        <select
          value={checkDataType.current}
          onChange={(e) => (checkDataType.current = e.target.value)}
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
  const [sortData, setSortData] = useState([]);
  useEffect(() => {
    let data = props.playerGrade.sort(function (a, b) {
      return a[props.checkDataType] - b[props.checkDataType];
    });
    setSortData(data);
  }, []);
  return (
    <GeneralDiv>
      {sortData?.map((data) => (
        <GeneralDiv>
          <GeneralDiv
            backgroundImage={`url(${data.pic})`}
            height="80px"
            width="80px"
          />
          <GeneralDiv>{data.id}</GeneralDiv>
          <GeneralDiv>{data.team}</GeneralDiv>
          <GeneralDiv>{data[props.checkDataType]}</GeneralDiv>
        </GeneralDiv>
      ))}
    </GeneralDiv>
  );
}
