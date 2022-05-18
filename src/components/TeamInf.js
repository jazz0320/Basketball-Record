import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
  doc,
  db,
  getDoc,
} from "../utils/firebase";
import styled from "styled-components";
import {
  PopupDiv,
  ButtonSubmit,
  GeneralLabel,
  GeneralDiv,
  GeneralImg,
  GeneralInput,
  GeneralButton,
} from "../utils/StyleComponent";

const PlayerChangeBlock = styled.div`
  width: 34vw;
  height: 205px;
  display: flex;
  padding: 0.5vh 0.5vw;
  display: ${(props) => (props.$focus ? "none" : "flex")};
`;
const PlayerButton = styled.button`
  border-radius: 5px;
  border: #495057 1px solid;
  padding: 5px 10px;
  margin: ${(props) => props.margin};
  &:hover {
    background-color: #e9ecef;
  }
  &:active {
    background-color: #495057;
    color: #f8f9fa;
  }
  display: ${(props) => (props.$check ? "none" : "block")};
`;
const UserInput = styled.input`
  border: 1px solid #adb5bd;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: ${(props) => props.fontSize};
`;

function TeamInf(props) {
  let redirect = useNavigate();
  const [teamMemberNumbers, setTeamMemberNumbers] = useState([1, 2, 3, 4, 5]);
  const team = useRef();
  const teamName = useRef();
  const teamMembers = useRef({});
  const [imgSrc, setImgSrc] = useState({});
  const [memberTeamExist, setMemberTeamExist] = useState();

  async function teamExistCheck() {
    const querySnapshot = await getDoc(
      doc(db, "member_data", `${props.userId}`)
    );
    if (querySnapshot.data()) {
      setMemberTeamExist(querySnapshot.data().team);
    }
  }

  teamExistCheck();

  const addPlayer = function () {
    let num = teamMemberNumbers.length;
    num += 1;
    setTeamMemberNumbers((prev) => [...prev, num]);
  };

  const deletePlayer = function (itemIndex) {
    const cc = [...teamMemberNumbers];
    const newTeam = cc.filter((_, index) => index !== itemIndex);
    setTeamMemberNumbers([...newTeam]);
  };

  const upload = async function (e) {
    const file = e.target.files[0];
    const path = file.name;
    const imgRef = ref(storage, `${props.userId}/${path}`);
    await uploadBytes(imgRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(ref(storage, `${props.userId}/${path}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        let oldImgSrc = { ...imgSrc };
        oldImgSrc[e.target.name] = url;
        setImgSrc(oldImgSrc);
        console.log("url", url);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const wirtePlayersInf = function (e, index) {
    if (teamMembers.current[`player${index}`]) {
      teamMembers.current[`player${index}`][`${e.target.name}`] =
        e.target.value;
    } else {
      teamMembers.current[`player${index}`] = {};
      teamMembers.current[`player${index}`][`${e.target.name}`] =
        e.target.value;
    }
    console.log("obj", teamMembers.current);
  };

  const submitTeamInf = async function () {
    let abc = [];
    for (let i = 0; i < Object.keys(teamMembers.current).length; i++) {
      console.log("bbb", abc);
      let b = {
        name: teamMembers.current[`player${i}`].playername,
        num: teamMembers.current[`player${i}`].playernum,
        nic: teamMembers.current[`player${i}`].playerNicname,
        id: `#${teamMembers.current[`player${i}`].playernum} ${
          teamMembers.current[`player${i}`].playername
        }`,
        pic: imgSrc[`playerPic${i}`],
        fgm: 0,
        fga: 0,
        fgRate: 0,
        threePtm: 0,
        threePta: 0,
        threePtRate: 0,
        ftm: 0,
        fta: 0,
        ftRate: 0,
        oreb: 0,
        dreb: 0,
        reb: 0,
        ast: 0,
        stl: 0,
        blk: 0,
        to: 0,
        pf: 0,
        pts: 0,
        data_situation: "done",
      };
      abc.push(b);
      console.log("ccc", abc);
    }

    await setDoc(
      doc(db, "team_data", `${teamName.current}`),
      {
        logo: `${imgSrc.logoPic}`,
        team_pic: `${imgSrc.teamRelated1}`,
        players: abc,
        winLoss: [0, 0],
      },
      { merge: true }
    );
    await setDoc(
      doc(db, "member_data", `${props.userId}`),
      {
        role: 1,
        team: teamName.current,
      },
      { merge: true }
    );
    redirect("/team-inf");
  };

  return (
    <>
      <GeneralDiv
        width="100vw"
        display="flex"
        justifyContent="center"
        backgroundColor="#e9ecef"
      >
        <GeneralDiv
          marginTop="100px"
          width="80vw"
          backgroundColor="#f8f9fa"
          padding="1vh 2vw"
        >
          {memberTeamExist ? (
            <ExistTeam
              memberTeamExist={memberTeamExist}
              userId={props.userId}
            />
          ) : (
            <GeneralDiv position="relative" padding="0 0 100px 0">
              <GeneralDiv fontSize="28px" marginBottom="0.5vh">
                球隊名稱{" "}
                <UserInput
                  value={team.current}
                  onChange={(e) => {
                    teamName.current = e.target.value;
                  }}
                />
              </GeneralDiv>
              <GeneralDiv display="flex" alignItems="end">
                <GeneralDiv marginBottom="0.5vh">
                  <GeneralDiv fontSize="28px" marginBottom="0.3vh">
                    球隊Logo
                  </GeneralDiv>
                  <GeneralDiv
                    margin="0 0.5vw 0 1vw"
                    border="1px solid #ced4da"
                    height="205px"
                    width="205px"
                  >
                    {imgSrc.logoPic ? (
                      <GeneralImg
                        height="200px"
                        width="200px"
                        src={imgSrc.logoPic}
                      />
                    ) : (
                      <GeneralImg
                        height="200px"
                        width="200px"
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fpic2.png?alt=media&token=71104548-b3f0-4d35-bd3b-fbd0a81912c3"
                        }
                      />
                    )}
                  </GeneralDiv>
                </GeneralDiv>
                <input type="file" name="logoPic" onChange={upload}></input>
              </GeneralDiv>

              <div>
                <GeneralDiv fontSize="28px" boxShadow="0" marginBottom="1vh">
                  球員登錄
                </GeneralDiv>

                <GeneralDiv display="flex" flexWrap="wrap">
                  {teamMemberNumbers.map((_, index) => (
                    <GeneralDiv
                      width="35vw"
                      margin=" 0 1vw 1vh 1vw"
                      border="1px solid #ced4da"
                      borderRadius="10px"
                      padding="5px"
                      key={index}
                    >
                      <GeneralDiv fontSize="20px">球員{index + 1}</GeneralDiv>

                      <GeneralDiv padding="10px" display="flex" height="250px">
                        <GeneralDiv
                          border="1px solid #E9ECEF"
                          height="205px"
                          width="205px"
                          marginRight="0.5vw"
                          marginBottom="5px"
                        >
                          {imgSrc[`playerPic${index}`] ? (
                            <GeneralImg
                              height="200px"
                              width="200px"
                              src={imgSrc[`playerPic${index}`]}
                            />
                          ) : (
                            <GeneralImg
                              height="200px"
                              width="200px"
                              src={
                                "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fperson.png?alt=media&token=ee15ed01-e153-41d6-a8a1-ed0528073690"
                              }
                            />
                          )}

                          <input
                            type="file"
                            name={`playerPic${index}`}
                            onChange={upload}
                          ></input>
                        </GeneralDiv>
                        <GeneralDiv
                          display="flex"
                          justifyContent="center"
                          flexWrap="wrap"
                          alignItems="start"
                        >
                          <GeneralDiv marginBottom="5px">
                            名字{" "}
                            <UserInput
                              name="playername"
                              onChange={(e) => wirtePlayersInf(e, index)}
                            />
                          </GeneralDiv>
                          <GeneralDiv marginBottom="5px">
                            綽號{" "}
                            <UserInput
                              name="playerNicname"
                              onChange={(e) => wirtePlayersInf(e, index)}
                            />
                          </GeneralDiv>
                          <GeneralDiv marginBottom="5px">
                            背號{" "}
                            <UserInput
                              name="playernum"
                              onChange={(e) => wirtePlayersInf(e, index)}
                            />
                          </GeneralDiv>
                          <GeneralButton
                            border="#495057 1px solid"
                            borderRadius="10px"
                            padding="5px 10px"
                            fontSize="18px"
                            hoverBackgroundColor="#E9ECEF"
                            activeBackgroundColor="#495057"
                            activeColor="#F8F9FA"
                            onClick={() => deletePlayer(index)}
                          >
                            移除球員
                          </GeneralButton>
                        </GeneralDiv>
                      </GeneralDiv>
                    </GeneralDiv>
                  ))}

                  <GeneralButton
                    width="35vw"
                    height="290px"
                    margin=" 0 1vw 1vh 1vw"
                    border="1px solid #ced4da"
                    borderRadius="10px"
                    padding="5px"
                    onClick={addPlayer}
                    fontSize="40px"
                    hoverBackgroundColor="#E9ECEF"
                    activeBackgroundColor="#495057"
                    activeColor="#F8F9FA"
                    hoverFontSize="50px"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </GeneralButton>
                </GeneralDiv>
              </div>
              <ButtonSubmit
                padding="10px"
                width="100px"
                margin="10px"
                position="absolute"
                onClick={submitTeamInf}
                right="40px"
                bottom="20px"
              >
                送出
              </ButtonSubmit>
            </GeneralDiv>
          )}
        </GeneralDiv>
      </GeneralDiv>
    </>
  );
}

function ExistTeam(props) {
  const [teamLogo, setTeamLogo] = useState();
  const [teamPics, setTeamPics] = useState();
  const [teamPlayers, setTeamPlayers] = useState();
  const [revisePlayer, setRevisePlayer] = useState();
  const [checkDelete, setCheckDelete] = useState();
  const [deletePlayerIndex, setDeletePlayerIndex] = useState();
  const [changePic, setChangePic] = useState(false);

  async function getExistTeamData() {
    if (props.memberTeamExist !== undefined) {
      const querySnapshot = await getDoc(
        doc(db, "team_data", `${props.memberTeamExist}`)
      );
      setTeamLogo(querySnapshot.data().logo);
      setTeamPics(querySnapshot.data().team_pic);
      setTeamPlayers(querySnapshot.data().players);
    }
  }
  useEffect(() => {
    getExistTeamData();
  }, []);

  const deletePlayer = async function (itemIndex) {
    const cc = [...teamPlayers];
    const newTeam = cc.filter((_, index) => index !== itemIndex);
    setTeamPlayers(newTeam);
    await setDoc(
      doc(db, "team_data", `${props.memberTeamExist}`),
      {
        players: newTeam,
      },
      { merge: true }
    );
  };

  const upload = async function (e) {
    const inputName = e.target.name;
    const file = e.target.files[0];
    const path = file.name;
    const imgRef = ref(storage, `${props.userId}/${path}`);
    let a;
    await uploadBytes(imgRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(ref(storage, `${props.userId}/${path}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        setTeamLogo(url);
        const picUpload = async function () {
          await setDoc(
            doc(db, "team_data", `${props.memberTeamExist}`),
            {
              [`${inputName}`]: url,
            },
            { merge: true }
          );
        };
        picUpload();
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  return (
    <>
      {checkDelete ? (
        <PopupDiv
          position="fixed"
          fontSize="28px"
          height="10vh"
          width="20vw"
          flexWrap="wrap"
          border="1px #adb5bd solid "
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <GeneralDiv
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="15vw"
            fontSize="28px"
          >
            確認刪除？
          </GeneralDiv>
          <GeneralDiv
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="10vw"
            display="flex"
          >
            <PlayerButton
              onClick={() => {
                setCheckDelete(false);
                deletePlayer(deletePlayerIndex);
              }}
            >
              確認
            </PlayerButton>
            <PlayerButton onClick={() => setCheckDelete(false)}>
              取消
            </PlayerButton>
          </GeneralDiv>
        </PopupDiv>
      ) : null}
      <GeneralDiv fontSize="40px" marginLeft="1vw">
        {props.memberTeamExist}
      </GeneralDiv>
      <GeneralDiv position="relative" marginLeft="1vw">
        <GeneralImg
          height="300px"
          width="300px"
          src={teamLogo}
          onMouseOver={() => setChangePic((pre) => !pre)}
        />
        {changePic && (
          <GeneralDiv
            onMouseOut={() => setChangePic((pre) => !pre)}
            height="300px"
            width="300px"
            position="absolute"
            top="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="rgba(0,0,0,0.3)"
          >
            <GeneralLabel
              zIndex="10"
              cursor="pointer"
              border="2px solid rgba(0,0,0,0.7)"
              padding="8px"
              textAlign="center"
              backgroundColor="white"
            >
              更換Logo
              <GeneralInput
                display="none"
                type="file"
                name="logo"
                onChange={(e) => upload(e)}
              />
            </GeneralLabel>
          </GeneralDiv>
        )}
      </GeneralDiv>
      {/* <div>
        <GeneralImg height="200px" width="200px" src={teamPics} />
        <input type="file" name="team_pic" onChange={(e) => upload(e)}></input>
      </div> */}
      <GeneralDiv display="flex" flexWrap="wrap">
        {teamPlayers?.map((player, index) => (
          <GeneralDiv
            // width="35vw"
            margin=" 0 1vw 1vh 1vw"
            border="1px solid #ced4da"
            borderRadius="10px"
            padding="5px"
            key={index}
            boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.5);"
            hoverBoxShadow="0px 0px 5px 5px rgba(0, 0, 0, 0.5);"
          >
            <GeneralDiv fontSize="20px">球員{index + 1}</GeneralDiv>
            <PlayerChangeBlock $focus={revisePlayer === index}>
              <GeneralDiv
                border="1px solid #E9ECEF"
                height="165px"
                width="205px"
                marginRight="0.5vw"
                marginBottom="5px"
              >
                <GeneralImg height="160px" width="200px" src={player.pic} />
              </GeneralDiv>
              <GeneralDiv
                width="18vw"
                display="flex"
                padding="10px"
                // justifyContent="center"
                flexWrap="wrap"
                alignItems="start"
              >
                <GeneralDiv fontSize="20px" marginBottom="5px" width="18vw">
                  名字:{player.name}
                </GeneralDiv>
                <GeneralDiv fontSize="20px" marginBottom="5px" width="18vw">
                  背號:
                  {player.num}
                </GeneralDiv>
                <GeneralDiv
                  width="13vw"
                  display="flex"
                  padding="2px 10px"
                  justifyContent="space-between"
                >
                  <PlayerButton
                    $check={revisePlayer === index}
                    onClick={() => {
                      setRevisePlayer(index);
                    }}
                  >
                    修改
                  </PlayerButton>
                  <PlayerButton
                    $check={revisePlayer === index}
                    onClick={() => {
                      setCheckDelete(true);
                      setDeletePlayerIndex(index);
                    }}
                  >
                    移除球員
                  </PlayerButton>
                </GeneralDiv>
              </GeneralDiv>
            </PlayerChangeBlock>
            <PlayerChangeBlock $focus={revisePlayer !== index}>
              <ModifyPlayer
                player={player}
                userId={props.userId}
                setTeamPlayers={setTeamPlayers}
                teamPlayers={teamPlayers}
                playerOrder={index}
                setRevisePlayer={setRevisePlayer}
                memberTeamExist={props.memberTeamExist}
              />
            </PlayerChangeBlock>
          </GeneralDiv>
        ))}
      </GeneralDiv>
    </>
  );
}

function ModifyPlayer(props) {
  const oldState = {
    ...props.player,
    name: props.player.name,
    id: props.player.id,
    pic: props.player.pic,
    num: props.player.num,
  };

  const [newPlayer, setNewPlayer] = useState(oldState);

  const upload = async function (e, data) {
    const file = e.target.files[0];
    const path = file.name;
    const imgRef = ref(storage, `${props.userId}/${path}`);
    let a;
    await uploadBytes(imgRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(ref(storage, `${props.userId}/${path}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        data.pic = url;
        setNewPlayer(data);
      })
      .catch((error) => {
        // Handle any errors
      });
  };
  let data = { ...newPlayer };
  const writePlayers = function (e) {
    if (e.target.name === "pic") {
      upload(e, data);
    } else {
      data[e.target.name] = e.target.value;
      setNewPlayer(data);
    }
  };

  const submitCorrection = async function () {
    let oldTeamPlayer = [...props.teamPlayers];
    oldTeamPlayer[props.playerOrder] = newPlayer;
    props.setTeamPlayers(oldTeamPlayer);
    props.setRevisePlayer();
    await setDoc(
      doc(db, "team_data", `${props.memberTeamExist}`),
      {
        players: oldTeamPlayer,
      },
      { merge: true }
    );
  };
  return (
    <>
      <GeneralDiv width="200px">
        <GeneralImg
          height="160px"
          width="200px"
          src={newPlayer.pic}
        ></GeneralImg>
        <input type="file" name="pic" onChange={(e) => writePlayers(e)}></input>
      </GeneralDiv>
      <GeneralDiv
        width="12vw"
        display="flex"
        padding="10px"
        // justifyContent="center"
        flexWrap="wrap"
        alignItems="start"
      >
        <GeneralDiv width="11vw">
          名字:
          <UserInput
            name="name"
            value={newPlayer.name}
            onChange={(e) => writePlayers(e)}
          />
        </GeneralDiv>
        <GeneralDiv width="11vw">
          背號:
          <UserInput
            name="num"
            value={newPlayer.num}
            onChange={(e) => writePlayers(e)}
          />
        </GeneralDiv>
        <GeneralDiv
          width="10vw"
          display="flex"
          padding="2px 10px"
          justifyContent="center"
        >
          <PlayerButton onClick={submitCorrection}>確認修改</PlayerButton>
        </GeneralDiv>
      </GeneralDiv>
    </>
  );
}

export default TeamInf;
