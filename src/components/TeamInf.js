import { useState, useRef, useEffect } from "react";
import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
  doc,
  db,
  getDocs,
  getDoc,
  collection,
} from "../utils/firebase";
import "./TeamInf.css";

function TeamInf(props) {
  const [teamMemberNumbers, setTeamMemberNumbers] = useState([1, 2, 3, 4, 5]);
  const team = useRef();
  const teamName = useRef();
  const teamMembers = useRef({});
  const [imgSrc, setImgSrc] = useState({});
  const memberTeamExist = useRef();

  async function teamExistCheck() {
    const querySnapshot = await getDoc(
      doc(db, "member_data", `${props.userId}`)
    );
    memberTeamExist.current = querySnapshot.data().team;
  }

  teamExistCheck();

  const addPlayer = function () {
    let num = teamMemberNumbers.length;
    num += 1;
    setTeamMemberNumbers((prev) => [...prev, num]);
  };

  const deletePlayer = function (itemIndex) {
    console.log("iiii", itemIndex);
    const cc = [...teamMemberNumbers];
    console.log("123", cc);
    const newTeam = cc.filter((_, index) => index !== itemIndex);
    console.log("nt", newTeam);
    setTeamMemberNumbers([...newTeam]);
  };
  console.log("teamName", teamName.current);

  const upload = async function (e) {
    const file = e.target.files[0];
    const path = file.name;
    const imgRef = ref(storage, `${props.userId}/${path}`);
    await uploadBytes(imgRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      console.log("Uccc", snapshot);
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
    console.log("aaa", abc);
    console.log("sadas", Object.keys(teamMembers.current).length);
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
  console.log("before", memberTeamExist.current);

  return (
    <>
      {memberTeamExist ? (
        <ExistTeam memberTeamExist={memberTeamExist} />
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
  console.log("now", props.memberTeamExist.current);
  if (props.memberTeamExist.current) {
    async function getExistTeamData() {
      const querySnapshot = await getDoc(
        doc(db, "team_data", `${props.memberTeamExist.current}`)
      );
      setTeamLogo(querySnapshot.data().logo);
      setTeamPics(querySnapshot.data().team_pic);
      setTeamPlayers(querySnapshot.data().players);
    }
    getExistTeamData();
  }
  return (
    <>
      <div>隊伍已存在</div>
      <div>
        <img src={teamLogo}></img>
      </div>
    </>
  );
}

export default TeamInf;
