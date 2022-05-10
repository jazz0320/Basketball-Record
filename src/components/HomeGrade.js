import { GeneralDiv, GeneralImg } from "../utils/StyleComponent";

function HomeGrade(props) {
  let roundDecimal = function (val, precision) {
    return (
      Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
      Math.pow(10, precision || 0)
    );
  };
  return (
    <GeneralDiv width="33vw" border="2px solid #adb5bd" borderRadius="10px">
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
          Rank
        </GeneralDiv>
        <GeneralDiv width="190px" textAlign="center">
          Team
        </GeneralDiv>
        <GeneralDiv width="30px" textAlign="right">
          W
        </GeneralDiv>
        <GeneralDiv width="50px" textAlign="right">
          L
        </GeneralDiv>
        <GeneralDiv width="70px" textAlign="right">
          Win%
        </GeneralDiv>
        <GeneralDiv width="60px" textAlign="right">
          GB
        </GeneralDiv>
      </GeneralDiv>
      <GeneralDiv height="62vh" overflowY="scroll" padding="0 10px">
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
        {props.teamGrade?.map((item, index) => (
          <GeneralDiv
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            divFontSize="20px"
            key={Object.keys(item)}
          >
            <GeneralDiv width="40px" textAlign="center">
              {index}
            </GeneralDiv>
            <GeneralDiv>
              <GeneralImg
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
        {props.teamGrade?.map((item, index) => (
          <GeneralDiv
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            divFontSize="20px"
            key={Object.keys(item)}
          >
            <GeneralDiv width="40px" textAlign="center">
              {index}
            </GeneralDiv>
            <GeneralDiv>
              <GeneralImg
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
