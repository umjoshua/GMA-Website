import React from "react";
import "./EventCards.css";
import { useNavigate } from "react-router-dom";

function EventCards({ event }) {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate(`/details/${encodeURIComponent(event.title)}`);
  };
  return (
    <div className="card_container">
      <div className="image_container">
        <img src={event.eventImage} alt="Event_Image" />
      </div>
      <div className="card_content">
        <div className="card_title">
          <span>{event.title}</span>
        </div>
        <div className="card_body">
          <span>Register for {event.title}</span>
        </div>
      </div>
      <div className="card_btn">
        <button onClick={handleRegister} className="card_button">
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCards;
