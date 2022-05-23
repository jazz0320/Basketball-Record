export const action = function (e, playerLocationScoreNumber) {
  if (playerLocationScoreNumber === 2) {
    if (e.ctrlKey && e.key === "q") {
      dispatchPlayerActions({ type: "score2" });
    } else if (e.key === "q") {
      dispatchPlayerActions({ type: "miss2pts" });
    }
  } else if (playerLocationScoreNumber === 3) {
    if (e.ctrlKey && e.key === "q") {
      dispatchPlayerActions({ type: "score3" });
    } else if (e.key === "q") {
      dispatchPlayerActions({ type: "miss3pts" });
    }
  }
  if (e.ctrlKey && e.key === "z") {
    dispatchPlayerActions({ type: "ft" });
  } else if (e.key === "z") {
    dispatchPlayerActions({ type: "missFt" });
  }
  if (e.ctrlKey && e.key === "w") {
    dispatchPlayerActions({ type: "offReb" });
  } else if (e.key === "w") {
    dispatchPlayerActions({ type: "defReb" });
  }
  if (e.key === "a") {
    dispatchPlayerActions({ type: "assist" });
  }
  if (e.key === "s") {
    dispatchPlayerActions({ type: "steal" });
  }
  if (e.key === "d") {
    dispatchPlayerActions({ type: "block" });
  }
  if (e.key === "e") {
    dispatchPlayerActions({ type: "turnover" });
  }
  if (e.key === "f") {
    dispatchPlayerActions({ type: "personalFoul" });
  }
};
const submit = async function (e) {
  if (e.key === "Enter") {
    if (
      (activePlayer === undefined) |
      (playerLocation === undefined) |
      (playerActions === undefined)
    ) {
      return;
    }
    let data;
    let teamDataNow;
    if (leftSide) {
      data = props.aTeamPlayers;
      teamDataNow = [...props.aTeamData];
    } else {
      data = props.bTeamPlayers;
      teamDataNow = [...props.bTeamData];
    }

    const recordData = function (inf, num) {
      data[activePlayer][inf] += num;
      teamDataNow[props.quarterNow - 1][inf] += num;
      teamDataNow[props.quarter.length][inf] += num;
    };
    const recordPercent = function (rate, num, dem) {
      data[activePlayer][rate] =
        data[activePlayer][num] / data[activePlayer][dem];
      teamDataNow[props.quarterNow - 1][rate] =
        teamDataNow[props.quarterNow - 1][num] /
        teamDataNow[props.quarterNow - 1][dem];
      teamDataNow[props.quarter.length][rate] =
        teamDataNow[props.quarter.length][num] /
        teamDataNow[props.quarter.length][dem];
    };

    if (playerActions.action === "pts") {
      if (playerActions.type === "ft") {
        if (playerActions.actionNumber === 1) {
          recordData("ftm", 1);
        }
        recordData("fta", 1);
        recordPercent("ftRate", "ftm", "fta");
      } else {
        if (playerActions.type === "3pt") {
          if (playerActions.actionNumber === 3) {
            setAffectShotClockBehavior((prev) => !prev);
            setAffectTimeStopBehavior((prev) => !prev);
            recordData("threePtm", 1);
          }
          recordData("threePta", 1);
          recordPercent("threePtRate", "threePtm", "threePta");
        }
        if (playerActions.actionNumber > 0) {
          setAffectShotClockBehavior((prev) => !prev);
          setAffectTimeStopBehavior((prev) => !prev);
          recordData("fgm", 1);
        }
        recordData("fga", 1);
        recordPercent("fgRate", "fgm", "fga");
      }

      recordData("pts", playerActions.actionNumber);
    } else if (playerActions.action === "reb") {
      if (playerActions.type === "def") {
        setAffectShotClockBehavior((prev) => !prev);
        recordData("dreb", 1);
      } else {
        recordData("oreb", 1);
      }
      recordData("reb", 1);
    } else if (playerActions.action === "ast") {
      recordData("ast", 1);
    } else if (playerActions.action === "stl") {
      setAffectShotClockBehavior((prev) => !prev);
      recordData("stl", 1);
    } else if (playerActions.action === "blk") {
      recordData("blk", 1);
    } else if (playerActions.action === "to") {
      recordData("to", 1);
    } else if (playerActions.action === "pf") {
      setAffectTimeStopBehavior((prev) => !prev);
      recordData("pf", 1);
    }

    if (leftSide) {
      props.setATeamPlayers([...data]);
      props.setATeamData([...teamDataNow]);
      setDoc(
        doc(db, "live_game", props.liveGameName.current),
        {
          A_team_player: data,
          A_team_data: teamDataNow,
        },
        { merge: true }
      );
      if (playerActions.action === "pts") {
        setDoc(
          doc(db, "game_schedule", props.liveGameName.current),
          {
            aTeam_score: teamDataNow[props.quarter.length]["pts"],
          },
          { merge: true }
        );
      }
    } else {
      props.setBTeamPlayers([...data]);
      props.setBTeamData([...teamDataNow]);
      setDoc(
        doc(db, "live_game", props.liveGameName.current),
        {
          B_team_player: data,
          B_team_data: teamDataNow,
        },
        { merge: true }
      );
      if (playerActions.action === "pts") {
        setDoc(
          doc(db, "game_schedule", props.liveGameName.current),
          {
            bTeam_score: teamDataNow[props.quarter.length]["pts"],
          },
          { merge: true }
        );
      }
    }

    props.setLiveAction((prev) => [
      ...prev,
      {
        quarterNow: props.quarterNow,
        team: leftSide,
        player: activePlayer,
        playerId: activePlayerId,
        playerPic: activePlayerPic,
        location: playerLocation,
        axis: playerAxis,
        action: playerActions.action,
        actionWord: playerActions.actionWord,
        count: playerActions.actionNumber,
        minutes: props.timerMinutes,
        seconds: timerSeconds,
      },
    ]);
    let actionLive = [
      ...props.liveAction,
      {
        quarterNow: props.quarterNow,
        team: leftSide,
        player: activePlayer,
        playerId: activePlayerId,
        playerPic: activePlayerPic,
        axis: playerAxis,
        location: playerLocation,
        action: playerActions.action,
        actionWord: playerActions.actionWord,
        count: playerActions.actionNumber,
        minutes: props.timerMinutes,
        seconds: timerSeconds,
      },
    ];

    setDoc(
      doc(db, "live_game", props.liveGameName.current),
      {
        live_action: actionLive,
      },
      { merge: true }
    );
    setActivePlayer();
    setActivePlayerId();
    dispatchPlayerActions({ type: "intial" });
    setPlayerAxis();
    setPlayerLocation();
  }
};
