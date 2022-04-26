import { useEffect, useState, useReducer, useRef } from "react";
import { getDocs, doc, db, collection } from "../utils/firebase";
import { Link, Outlet } from "react-router-dom";
import LiveRoom from "./LiveRoom";

function GameData(props) {
  const [pastGame, setPastGame] = useState();

  async function loadingData() {
    let data = {};
    let gameIds = [];
    const querySnapshot = await getDocs(collection(db, "past_data"));
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
      gameIds.push(doc.id);
    });
    setPastGame(data);
    props.setPastGameRoutes(gameIds);
  }
  useEffect(() => {
    loadingData();
  }, []);

  return (
    <div>
      <nav>
        {props.pastGameRoutes?.map((game, index) => (
          <Link to={`${game}`} key={game}>
            {game}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default GameData;
