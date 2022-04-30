import { useEffect, useState } from "react";
import { getDocs, doc, db, collection } from "../utils/firebase";
import { Link, Outlet } from "react-router-dom";
import LiveRoom from "./LiveRoom";

function LivesNow(props) {
  const [liveGames, setLiveGames] = useState();

  async function loadingData() {
    let data = {};
    let gameIds = [];
    const querySnapshot = await getDocs(collection(db, "live_game"));
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
      gameIds.push(doc.id);
    });
    setLiveGames(data);
    props.setLiveGameRoutes(gameIds);
  }
  useEffect(() => {
    loadingData();
  }, []);

  return (
    <div>
      <nav>
        {props.liveGameRoutes?.map((game) => (
          <Link to={`${game}`} key={game}>
            {game}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default LivesNow;
