import { useState, useRef, useEffect } from "react";
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
import "./TeamInf.css";
import styled from "styled-components";

const PlayerChangeBlock = styled.div`
  display: ${(props) => (props.$focus ? "none" : "block")};
`;
const PlayerButton = styled.button`
  display: ${(props) => (props.$check ? "none" : "block")};
`;

function TeamInf(props) {
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
  };

  return (
    <>
      {memberTeamExist ? (
        <ExistTeam memberTeamExist={memberTeamExist} userId={props.userId} />
      ) : (
        <div>
          <div>
            球隊名稱{" "}
            <input
              value={team.current}
              onChange={(e) => {
                teamName.current = e.target.value;
              }}
            ></input>
          </div>
          {props.userId}
          <div>
            {imgSrc.logoPic ? <img src={imgSrc.logoPic}></img> : null}
            球隊Logo<input type="file" name="logoPic" onChange={upload}></input>
          </div>
          <div>
            {imgSrc["teamRelated1"] ? (
              <img src={imgSrc.teamRelated1}></img>
            ) : null}
            球隊相關照片
            <input type="file" name="teamRelated1" onChange={upload}></input>
          </div>
          <div></div>
          <div>
            球員登錄
            {teamMemberNumbers.map((_, index) => (
              <div key={index} style={{ paddingLeft: "10px" }}>
                球員{index + 1}
                <div style={{ paddingLeft: "10px" }}>
                  <div>
                    名字{" "}
                    <input
                      name="playername"
                      onChange={(e) => wirtePlayersInf(e, index)}
                    ></input>
                  </div>
                  <div>
                    綽號(球衣上的名字){" "}
                    <input
                      name="playerNicname"
                      onChange={(e) => wirtePlayersInf(e, index)}
                    ></input>
                  </div>
                  <div>
                    背號{" "}
                    <input
                      name="playernum"
                      onChange={(e) => wirtePlayersInf(e, index)}
                    ></input>
                  </div>
                  <div>
                    {imgSrc[`playerPic${index}`] ? (
                      <img src={imgSrc[`playerPic${index}`]}></img>
                    ) : null}
                    球員正面照
                    <input
                      type="file"
                      name={`playerPic${index}`}
                      onChange={upload}
                    ></input>
                  </div>
                  <button onClick={() => deletePlayer(index)}>移除球員</button>
                </div>
              </div>
            ))}
            <button onClick={addPlayer}>新增球員</button>
          </div>
          <button onClick={submitTeamInf}>送出</button>
        </div>
      )}
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
      <div>隊伍已存在</div>
      {checkDelete ? (
        <div>
          確認刪除？
          <button
            onClick={() => {
              setCheckDelete(false);
              deletePlayer(deletePlayerIndex);
            }}
          >
            確認
          </button>
          <button onClick={() => setCheckDelete(false)}>取消</button>
        </div>
      ) : null}

      <div>
        <img src={teamLogo}></img>
        <input type="file" name="logo" onChange={(e) => upload(e)}></input>
      </div>
      <div>
        <img src={teamPics}></img>
        <input type="file" name="team_pic" onChange={(e) => upload(e)}></input>
      </div>
      <div>
        {teamPlayers?.map((player, index) => (
          <div>
            <PlayerChangeBlock $focus={revisePlayer === index}>
              <div>名字:{player.name}</div>
              <div>
                背號:
                {player.num}
              </div>
              <div>
                照片:
                <img src={player.pic}></img>
              </div>
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
          </div>
        ))}
      </div>
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
    <div>
      <div>
        名字:
        <input
          name="name"
          value={newPlayer.name}
          onChange={(e) => writePlayers(e)}
        ></input>
      </div>
      <div>
        背號:
        <input
          name="num"
          value={newPlayer.num}
          onChange={(e) => writePlayers(e)}
        />
      </div>
      <div>
        照片:
        <img src={newPlayer.pic}></img>
        <input type="file" name="pic" onChange={(e) => writePlayers(e)}></input>
      </div>
      <button onClick={submitCorrection}>確認修改</button>
    </div>
  );
}

export default TeamInf;
