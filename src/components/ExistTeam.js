import { useState, useEffect } from "react";
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
import styled from "styled-components/macro";

const PopupDiv = styled.div`
  position: fixed;
  font-size: 28px;
  height: 25vh;
  width: 20vw;
  flex-wrap: wrap;
  border: 1px #adb5bd solid;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 30vh;
  left: 40vw;
  background-color: #495057;
  z-index: 10;
  color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
  &:hover {
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.5);
  }
`;

const DeleteContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15vw;
  font-size: 28px;
`;

const DeleteCheckButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  display: flex;
`;

const UserInput = styled.input`
  border: 1px solid #adb5bd;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: ${(props) => props.fontSize};
`;

const PlayerChangeBlock = styled.div`
  width: 34vw;
  height: 205px;
  display: flex;
  padding: 0.5vh 0.5vw;
  display: ${(props) => (props.$focus ? "none" : "flex")};
`;
const CheckButton = styled.button`
  border-radius: 5px;
  border: grey 1px solid;
  padding: 5px 10px;
  margin: 0 1vw 0 0;
  &:hover {
    background-color: #e9ecef;
    color: black;
  }
  &:active {
    background-color: #495057;
    color: #f8f9fa;
  }
  display: ${(props) => (props.$check ? "none" : "block")};
`;

const TeamNameBox = styled.div`
  font-size: 40px;
  margin-left: 1vw;
`;

const LogoImgBox = styled.div`
  position: relative;
  margin-left: 1vw;
`;

const LogoImg = styled.img`
  height: 300px;
  width: 300px;
`;

const LogoImgChangheBox = styled.div`
  height: 300px;
  width: 300px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const LogoImgChageLabel = styled.label`
  z-index: 10;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.7);
  padding: 8px;
  text-align: center;
  background-color: white;
`;

const LogoInput = styled.input`
  display: none;
`;

const TeamMemberBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EachPlayerBlock = styled.div`
  margin: 0 1vw 1vh 1vw;
  border: 1px solid #ced4da;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
  &:hover {
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  }
`;
const PlayerImgBox = styled.div`
  border: 1px solid #e9ecef;
  height: 165px;
  width: 205px;
  margin-right: 0.5vw;
  margin-bottom: 5px;
`;

const PlayerImg = styled.img`
  height: 160px;
  width: 200px;
`;

const PlayerInfBox = styled.div`
  width: 18vw;
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  align-items: start;
`;
const PlayerInf = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  width: 18vw;
`;

const PlayerCheckButtonBox = styled.div`
  width: 13vw;
  display: flex;
  padding: 2px 10px;
  justify-content: center;
`;

function ExistTeam(props) {
  const [teamLogo, setTeamLogo] = useState();
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
    await uploadBytes(imgRef, file).then((snapshot) => {});
    await getDownloadURL(ref(storage, `${props.userId}/${path}`))
      .then((url) => {
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
      .catch((error) => {});
  };

  return (
    <>
      {checkDelete ? (
        <PopupDiv>
          <DeleteContent>確認刪除？</DeleteContent>
          <DeleteCheckButtonBox>
            <CheckButton
              onClick={() => {
                setCheckDelete(false);
                deletePlayer(deletePlayerIndex);
              }}
            >
              確認
            </CheckButton>
            <CheckButton onClick={() => setCheckDelete(false)}>
              取消
            </CheckButton>
          </DeleteCheckButtonBox>
        </PopupDiv>
      ) : null}
      <TeamNameBox>{props.memberTeamExist}</TeamNameBox>
      <LogoImgBox>
        <LogoImg
          src={teamLogo}
          onMouseOver={() => setChangePic((pre) => !pre)}
        />
        {changePic && (
          <LogoImgChangheBox onMouseOut={() => setChangePic((pre) => !pre)}>
            <LogoImgChageLabel>
              更換Logo
              <LogoInput type="file" name="logo" onChange={(e) => upload(e)} />
            </LogoImgChageLabel>
          </LogoImgChangheBox>
        )}
      </LogoImgBox>

      <TeamMemberBlock>
        {teamPlayers?.map((player, index) => (
          <EachPlayerBlock key={player.name}>
            <div
              css={`
                font-size: 20px;
              `}
            >
              球員{index + 1}
            </div>
            <PlayerChangeBlock $focus={revisePlayer === index}>
              <PlayerImgBox>
                <PlayerImg src={player.pic} />
              </PlayerImgBox>
              <PlayerInfBox>
                <PlayerInf>名字:{player.name}</PlayerInf>
                <PlayerInf>背號:{player.num}</PlayerInf>
                <PlayerCheckButtonBox>
                  <CheckButton
                    $check={revisePlayer === index}
                    onClick={() => {
                      setRevisePlayer(index);
                    }}
                  >
                    修改
                  </CheckButton>
                  <CheckButton
                    $check={revisePlayer === index}
                    onClick={() => {
                      setCheckDelete(true);
                      setDeletePlayerIndex(index);
                    }}
                  >
                    移除球員
                  </CheckButton>
                </PlayerCheckButtonBox>
              </PlayerInfBox>
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
          </EachPlayerBlock>
        ))}
      </TeamMemberBlock>
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
    await uploadBytes(imgRef, file).then((snapshot) => {});
    await getDownloadURL(ref(storage, `${props.userId}/${path}`))
      .then((url) => {
        data.pic = url;
        setNewPlayer(data);
      })
      .catch((error) => {});
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
      <PlayerImgBox>
        <PlayerImg src={newPlayer.pic}></PlayerImg>
        <input type="file" name="pic" onChange={(e) => writePlayers(e)}></input>
      </PlayerImgBox>
      <PlayerInfBox>
        <PlayerInf>
          名字:
          <UserInput
            name="name"
            value={newPlayer.name}
            onChange={(e) => writePlayers(e)}
          />
        </PlayerInf>
        <PlayerInf>
          背號:
          <UserInput
            name="num"
            value={newPlayer.num}
            onChange={(e) => writePlayers(e)}
          />
        </PlayerInf>
        <PlayerCheckButtonBox>
          <CheckButton onClick={submitCorrection}>確認修改</CheckButton>
        </PlayerCheckButtonBox>
      </PlayerInfBox>
    </>
  );
}

export default ExistTeam;
