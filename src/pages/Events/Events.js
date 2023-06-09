import React from "react";
import EventCards from "../../components/EventCards/EventCards";
import "./Events.css";
import events from "../../data/EventData/EventData";

function Events() {
  return (
    <div>
      <div className="event_div">
        <h1>Events</h1>
      </div>
      <div className="event_cards">
        {events.map((item, key) => (
          //console.log(item)
          <EventCards events={item} key={key} />
        ))}
      </div>
    </div>
  );
}

export default Events;
