import React, { useContext } from "react";
import { AppContext } from "../../App";
import EventCards from "../../components/EventCards/EventCards";
import "./Events.css";

function Events() {
  const events = useContext(AppContext);
  return (
    <div style={{ marginTop: "40px", marginBottom: "50px" }}>
      <div className="event_div">
        <h1>Upcoming Events</h1>
      </div>
      <div className="event_cards">
        {events.length >= 1 ? events.map((item, key) => (
          <EventCards event={item} key={key} />
        )) : <div style={{ fontStyle: "italic", fontSize: 'large' }}>No upcoming events</div>}
      </div>
    </div>
  );
}

export default Events;
