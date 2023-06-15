import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import "./DetailsPage.css";
import { useLocation, useParams } from "react-router-dom";
import RegisterForm from '../RegisterForm/RegisterForm.js'

function DetailsPage() {
  const [popup, setPopup] = useState(false);

  const { title } = useParams();
  const events = useContext(AppContext);

  const event = events.find((event) => event.title === title);

  return (
    <div className="details">
      <div className="detail_image">
        <img src={event?.eventImage} alt="" />
      </div>
      <div className="details_title">
        <span>{event?.title}</span>
        <button onClick={() => setPopup(true)}>Register</button>
      </div>
      <div className="detail_description">
        <p>{event?.description}</p>
      </div>
      {popup && <RegisterForm popupOpen={setPopup} />}
    </div>
  );
}

export default DetailsPage;
