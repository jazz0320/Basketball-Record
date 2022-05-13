import { GeneralDiv, GeneralImg } from "../utils/StyleComponent";

function HomeGrade(props) {
  let roundDecimal = function (val, precision) {
    return (
      Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
      Math.pow(10, precision || 0)
    );
  };
  return (
    <GeneralDiv
      width="37vw"
      height="calc(100vh - 200px)"
      border="2px solid #adb5bd"
      borderRadius="10px"
      boxShadow="0px 2px 5px 3px rgba(0, 0, 0, 0.3);"
    >
      <GeneralDiv
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        height="4vh"
        backgroundColor="#343a40"
        color="#f8f9fa"
        borderRadius="6px 6px 0 0"
        padding="0 10px"
        divFontSize="20px"
      >
        <GeneralDiv width="40px" textAlign="center">
          排名
        </GeneralDiv>
        <GeneralDiv width="190px" textAlign="center">
          隊伍
        </GeneralDiv>
        <GeneralDiv width="40px" textAlign="right">
          勝
        </GeneralDiv>
        <GeneralDiv width="50px" textAlign="right">
          負
        </GeneralDiv>
        <GeneralDiv width="80px" textAlign="right">
          勝率%
        </GeneralDiv>
        <GeneralDiv width="50px" textAlign="right">
          勝差
        </GeneralDiv>
      </GeneralDiv>
      <GeneralDiv
        height="calc(100vh - 240px)"
        overflowY="scroll"
        padding="0 10px"
      >
        {props.teamGrade &&
          props.teamGrade?.map((item, index) => (
            <GeneralDiv
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              divFontSize="20px"
              key={Object.keys(item)}
            >
              <GeneralDiv width="40px" textAlign="center">
                {index + 1}
              </GeneralDiv>
              <GeneralDiv>
                <GeneralImg
                  filter={"drop-shadow(-10px 10px 3px rgba(0, 0, 0, 0.3))"}
                  src={item[Object.keys(item)]["logo"]}
                  width="80px"
                  height="80px"
                />
              </GeneralDiv>
              <GeneralDiv width="110px" textAlign="center">
                {Object.keys(item)}
              </GeneralDiv>
              <GeneralDiv width="30px" textAlign="right">
                {item[Object.keys(item)]["grade"][0]}
              </GeneralDiv>
              <GeneralDiv width="50px" textAlign="right">
                {item[Object.keys(item)]["grade"][1]}
              </GeneralDiv>
              <GeneralDiv width="70px" textAlign="right">
                {Math.round(
                  roundDecimal(
                    item[Object.keys(item)]["grade"][0] /
                      (item[Object.keys(item)]["grade"][1] +
                        item[Object.keys(item)]["grade"][0]),
                    2
                  ) * 100
                )}
                %
              </GeneralDiv>
              <GeneralDiv width="60px" textAlign="right">
                {index === 0
                  ? "0"
                  : (item[Object.keys(item)]["grade"][2] -
                      props.teamGrade[index - 1][
                        Object.keys(props.teamGrade[index - 1])
                      ]["grade"][2]) /
                    2}
              </GeneralDiv>
            </GeneralDiv>
          ))}
      </GeneralDiv>
    </GeneralDiv>
  );
}

export default HomeGrade;
