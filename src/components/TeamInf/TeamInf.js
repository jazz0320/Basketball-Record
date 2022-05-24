import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ExistTeam from "./ExistTeam";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
  doc,
  db,
  getDoc,
} from "../../utils/firebase";
import styled from "styled-components/macro";

const FullPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #e9ecef;
`;

const ContentContainer = styled.div`
  position: relative;
  width: 80vw;
  background-color: #f8f9fa;
  padding: 110px 2vw 1vh 2vw;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.5);
`;

const TeamDataBox = styled.div`
  position: relative;
`;
const BigTitle = styled.div`
  font-size: 28px;
  margin-bottom: 0.7vh;
`;
const PlayerContainer = styled.div`
  padding: 10px;
  display: flex;
  height: 250px;
`;

const UserInput = styled.input`
  border: 1px solid #adb5bd;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: ${(props) => props.fontSize};
`;

const EachPlayerBlock = styled.div`
  width: 35vw;
  margin: 0 1vw 1vh 1vw;
  border: 1px solid #ced4da;
  border-radius: 10px;
  padding: 5px;
`;

const RemovePlayerButton = styled.button`
  border: #495057 1px solid;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 18px;
  &:hover {
    background-color: #e9ecef;
  }
  &:active {
    background-color: #495057;
    color: #f8f9fa;
  }
`;
const LogoImgBox = styled.div`
  margin: 0 0.5vw 0 1vw;
  border: 1px solid #ced4da;
  height: 205px;
  width: 205px;
`;

const PicImg = styled.img`
  height: 200px;
  width: 200px;
`;

const PlayerImgBox = styled.div`
  border: 1px solid #e9ecef;
  height: 205px;
  width: 205px;
  margin-right: 0.5vw;
  margin-bottom: 5px;
`;

const PlayerDataBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: start;
  > div {
    margin-bottom: 5px;
  }
`;

const AddOnePlayerButton = styled.button`
  width: 35vw;
  height: 290px;
  margin: 0 1vw 1vh 1vw;
  border: 1px solid #ced4da;
  border-radius: 10px;
  padding: 5px;
  font-size: 40px;
  &:hover {
    font-size: 50px;
    background-color: #e9ecef;
  }
  &:active {
    background-color: #495057;
    color: #f8f9fa;
  }
`;

const ButtonSubmit = styled.button`
  padding: 10px;
  width: 100px;
  margin: 10px;
  position: absolute;
  right: 40px;
  bottom: 20px;
  background-color: #343a40;
  border: 1px solid white;
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  transition: all 0.1s ease-in;
  ::-moz-focus-inner {
    border: 0;
  }
  &:hover {
    background-color: #495057;
    ${() => `transform: translateY(-3px)`}
  }

  &:active {
    background-color: ${() => "#212529"};
  }
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
    await uploadBytes(imgRef, file).then((snapshot) => {});
    await getDownloadURL(ref(storage, `${props.userId}/${path}`))
      .then((url) => {
        let oldImgSrc = { ...imgSrc };
        oldImgSrc[e.target.name] = url;
        setImgSrc(oldImgSrc);
      })
      .catch((error) => {});
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
  };

  const submitTeamInf = async function () {
    let abc = [];
    for (let i = 0; i < Object.keys(teamMembers.current).length; i++) {
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
      <FullPageContainer>
        <ContentContainer>
          {memberTeamExist ? (
            <ExistTeam
              memberTeamExist={memberTeamExist}
              userId={props.userId}
            />
          ) : (
            <TeamDataBox>
              <BigTitle>
                球隊名稱{" "}
                <UserInput
                  value={team.current}
                  onChange={(e) => {
                    teamName.current = e.target.value;
                  }}
                />
              </BigTitle>
              <div
                css={`
                  display: flex;
                  align-items: end;
                `}
              >
                <div
                  css={`
                    margin-bottom: 0.5vh;
                  `}
                >
                  <BigTitle>球隊Logo</BigTitle>
                  <LogoImgBox>
                    {imgSrc.logoPic ? (
                      <PicImg src={imgSrc.logoPic} />
                    ) : (
                      <PicImg
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/forWebsite%2Fpic2.png?alt=media&token=71104548-b3f0-4d35-bd3b-fbd0a81912c3"
                        }
                      />
                    )}
                  </LogoImgBox>
                </div>
                <input type="file" name="logoPic" onChange={upload}></input>
              </div>

              <div>
                <BigTitle>球員登錄</BigTitle>

                <div
                  css={`
                    display: flex;
                    flex-wrap: wrap;
                  `}
                >
                  {teamMemberNumbers.map((_, index) => (
                    <EachPlayerBlock key={index}>
                      <div
                        css={`
                          font-size: 20px;
                        `}
                      >
                        球員{index + 1}
                      </div>
                      <PlayerContainer>
                        <PlayerImgBox>
                          {imgSrc[`playerPic${index}`] ? (
                            <PicImg src={imgSrc[`playerPic${index}`]} />
                          ) : (
                            <PicImg
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
                        </PlayerImgBox>
                        <PlayerDataBox>
                          <div>
                            名字{" "}
                            <UserInput
                              name="playername"
                              onChange={(e) => wirtePlayersInf(e, index)}
                            />
                          </div>
                          <div>
                            綽號{" "}
                            <UserInput
                              name="playerNicname"
                              onChange={(e) => wirtePlayersInf(e, index)}
                            />
                          </div>
                          <div>
                            背號{" "}
                            <UserInput
                              name="playernum"
                              onChange={(e) => wirtePlayersInf(e, index)}
                            />
                          </div>
                          <RemovePlayerButton
                            onClick={() => deletePlayer(index)}
                          >
                            移除球員
                          </RemovePlayerButton>
                        </PlayerDataBox>
                      </PlayerContainer>
                    </EachPlayerBlock>
                  ))}

                  <AddOnePlayerButton onClick={addPlayer}>
                    <i className="fa-solid fa-plus"></i>
                  </AddOnePlayerButton>
                </div>
              </div>
              <ButtonSubmit onClick={submitTeamInf}>送出</ButtonSubmit>
            </TeamDataBox>
          )}
        </ContentContainer>
      </FullPageContainer>
    </>
  );
}

export default TeamInf;
