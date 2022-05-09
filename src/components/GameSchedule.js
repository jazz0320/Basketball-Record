import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { GeneralDiv } from "../utils/StyleComponent";

function GameSchedule() {
  const handleDateClick = (e) => {
    console.log(e);
  };

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
            events={[
              { title: "event 1", date: "2022-04-01", allDay: true },
              {
                title: "event 2",
                allDay: true,
                date: "2022-04-02",
                url: "https://firebasestorage.googleapis.com/v0/b/basketball-record.appspot.com/o/test2%40test.com%2F600x600.jpeg?alt=media&token=5b52f811-3d45-42dd-9aae-296cb5940c5b",
              },
            ]}
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
