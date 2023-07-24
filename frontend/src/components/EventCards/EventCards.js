import React from "react";
import "./EventCards.css";
import { useNavigate } from "react-router-dom";

function EventCards({ event }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/event/${encodeURIComponent(event._id)}`);
  };
  return (
    <div className="card_container" onClick={handleView}>
      <div className="image_container">
        <img className="event-img" src={event.file} alt="Event Poster" />
      </div>
      <div className="card_content">
        <div className="card_title">
          <span>{event.title}</span>
        </div>
        <div className="card_body">
          <span>Click to view details</span>
        </div>
      </div>
      <div className="card_btn">
        <button onClick={handleView} className="card_button">
          View
        </button>
      </div>
    </div>
  );
}

export default EventCards;
