import React, { useContext } from "react";
import { AppContext } from "../../App";
import EventCards from "../../components/EventCards/EventCards";
import "./Events.css";

function Events() {
  const events = useContext(AppContext);
  return (
    <div>
      <div className="event_div">
        <h1>Upcoming Events</h1>
      </div>
      <div className="event_cards">
        {events.map((item, key) => (
          //console.log(item)
          <EventCards event={item} key={key} />
        ))}
      </div>
    </div>
  );
}

export default Events;
