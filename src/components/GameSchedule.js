import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { getDocs, collection, db, getDoc, doc } from "../utils/firebase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const FullPageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #e9ecef;
`;

const ContentContainer = styled.div`
  width: 80vw;
  background-color: #f8f9fa;
  padding: 110px 2vw 1vh 2vw;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.5);
`;

function GameSchedule(props) {
  const [events, setEvents] = useState([]);
  const handleDateClick = (e) => {};

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
      <FullPageContainer>
        <ContentContainer>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            weekends={true}
            events={events}
          />
        </ContentContainer>
      </FullPageContainer>
    </>
  );
}

export default GameSchedule;
