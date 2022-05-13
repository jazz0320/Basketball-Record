import { GeneralDiv, GeneralImg } from "../utils/StyleComponent";
import { useEffect, useRef, useState } from "react";

let gradeType = [
  ["to", "失誤"],
  ["oreb", "進攻籃板"],
  ["reb", "籃板"],
  ["stl", "抄截"],
  ["pf", "犯規"],
  ["ast", "助攻"],
  ["fgRate", "命中率"],
  ["threePtRate", "三分命中率"],
  ["ftRate", "罰球命中率"],
  ["blk", "火鍋"],
  ["pts", "得分"],
  ["dreb", "防守籃板"],
];

function PlayerGrade(props) {
  const [checkDataType, setCheckDataType] = useState("pts");
  return (
    <GeneralDiv
      width="37vw"
      height="calc(100vh - 200px)"
      border="2px solid #adb5bd"
      borderRadius="10px"
      boxShadow="0px 2px 5px 3px rgba(0, 0, 0, 0.3);"
    >
      <GradeOutCome
        checkDataType={checkDataType}
        setCheckDataType={setCheckDataType}
        gradeType={gradeType}
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
    setSortData(data.slice(0, 10));
  }, [props.checkDataType, props.playerGrade]);
  return (
    <GeneralDiv>
      <GeneralDiv
        divFontSize="20px"
        display="flex"
        backgroundColor="#343a40"
        color="#f8f9fa"
        padding="0 10px"
        justifyContent="space-around"
        borderRadius="6px 6px 0 0"
        height="36px"
      >
        <GeneralDiv
          width="60px"
          textAlign="center"
          height="30px"
          margin="auto 0"
        >
          排名
        </GeneralDiv>
        <GeneralDiv
          width="330px"
          textAling="center"
          height="30px"
          margin="auto 0"
        >
          球員
        </GeneralDiv>
        <GeneralDiv width="120px" height="30px" margin="auto 0">
          隊伍
        </GeneralDiv>
        <GeneralDiv width="80px" height="30px" margin="auto 0">
          數據
        </GeneralDiv>
      </GeneralDiv>
      <GeneralDiv padding="5px 10px" fontSize="20px">
        <select
          value={props.checkDataType}
          onChange={(e) => props.setCheckDataType(e.target.value)}
        >
          {props.gradeType.map((type) => (
            <option key={type[0]} value={type[0]}>
              {type[1]}
            </option>
          ))}
        </select>
      </GeneralDiv>
      <GeneralDiv height="calc(100vh - 280px)" overflowY="scroll">
        {sortData?.map((data, index) => (
          <GeneralDiv
            key={data.name}
            display="flex"
            alignItems="center"
            marginBottom="10px"
            justifyContent="space-around"
          >
            <GeneralDiv
              width="50px"
              textAling="center"
              fontSize={index < 3 ? `${20 + (3 - index) * 4}px` : "20px"}
            >
              {index + 1}
            </GeneralDiv>
            <GeneralDiv>
              <GeneralImg
                filter={"drop-shadow(-10px 6px 3px rgba(0, 0, 0, 0.5))"}
                height={index < 3 ? `${100 + (3 - index) * 8}px` : "80px"}
                width={index < 3 ? `${136 + (3 - index) * 11}px` : "109px"}
                src={data.pic}
              />
            </GeneralDiv>
            <GeneralDiv width="250px" textAling="center" fontSize="20px">
              {data.name}
            </GeneralDiv>
            <GeneralDiv width="120px" fontSize="20px">
              {data.team}
            </GeneralDiv>
            <GeneralDiv width="120px" textAling="center" fontSize="20px">
              {data[props.checkDataType]}
            </GeneralDiv>
          </GeneralDiv>
        ))}
      </GeneralDiv>
    </GeneralDiv>
  );
}
