import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { GeneralDiv } from "../utils/StyleComponent";
import { getDocs, collection, db, getDoc, doc } from "../utils/firebase";
import { useEffect, useState } from "react";

function GameSchedule(props) {
  const [events, setEvents] = useState([]);
  const handleDateClick = (e) => {
    console.log(e);
  };

  async function loadingSchedule() {
    let teamName;
    const querySnapshot1 = await getDoc(
      doc(db, "member_data", `${props.userId}`)
    );
    if (querySnapshot1.data()) {
      teamName = querySnapshot1.data().team;

      const querySnapshot2 = await getDocs(
        collection(db, "team_data", teamName, "game_schedule")
      );
      querySnapshot2.forEach((doc) => {
        console.log(doc.id);
        let event = {
          title: `${doc.data().opponent} ${doc.data().time_time}`,
          date: doc.data().time_date,
        };
        setEvents((pre) => [...pre, event]);
      });
    }
  }

  useEffect(() => {
    loadingSchedule();
  }, [props.userId]);

  return (
    <>
      <GeneralDiv
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        backgroundColor="#e9ecef"
      >
        <GeneralDiv width="80vw" backgroundColor="#f8f9fa" padding="1vh 2vw">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            weekends={true}
            eventContent={renderEventContent}
            events={
              events
              //   [
              //   {
              //     title: "event 2",
              //     allDay: true,
              //     date: "2022-04-02",
              //     url: "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/test2%40test.com%2F600x600.jpeg?alt=media&token=5b52f811-3d45-42dd-9aae-296cb5940c5b",
              //   },
              // ]
            }
          />
        </GeneralDiv>
      </GeneralDiv>
    </>
  );
}

function renderEventContent(eventInfo) {
  return (
    <div

    //   style={{
    //     backgroundImage: `url(${eventInfo.event.url})`,
    //   }}
    >
      <p>{eventInfo.event.title}</p>
      <img className="eventimage" src={eventInfo.event.url} />
    </div>
  );
}

export default GameSchedule;
