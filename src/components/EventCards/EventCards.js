import React from "react";
import "./EventCards.css";

function EventCards({ events }) {
  return (
    <div className="card_container">
      <div className="image_container">
        <img src={events.eventImage} alt="Event Image" />
      </div>
      <div className="card_content">
        <div className="card_title">
          <span>{events.title}</span>
        </div>
        <div className="card_body">
          <span>Register for {events.title}</span>
        </div>
      </div>
      <div className="card_btn">
          <button>Register</button>
        </div>
    </div>
  );
}

export default EventCards;
