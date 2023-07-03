import React from "react";
import "./Form14.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form14({
  handlePrevious,
  selectedCheckboxes,
  handleCheckboxChange,
  handleNext,
}) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Preferred method of contact</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="p_form_container">
        <div className="p_first">
          <label>
            <input
              type="checkbox"
              value="email"
              checked={selectedCheckboxes.includes("email")}
              onChange={handleCheckboxChange}
            />
            Email
          </label>
          <label>
            <input
              type="checkbox"
              value="textMessage"
              checked={selectedCheckboxes.includes("textMessage")}
              onChange={handleCheckboxChange}
            />
            Text Message
          </label>
        </div>
        <div className="p_first">
          <label>
            <input
              type="checkbox"
              value="whatsappMessage"
              checked={selectedCheckboxes.includes("whatsappMessage")}
              onChange={handleCheckboxChange}
            />
            WhatsApp Message
          </label>
          <label>
            <input
              type="checkbox"
              value="FaceBook"
              checked={selectedCheckboxes.includes("Facebook")}
              onChange={handleCheckboxChange}
            />
            Facebook
          </label>
        </div>
      </div>
      <div className="addr_button">
        <button onClick={handlePrevious}>
          <div className="name_arrow">
            <ArrowBackIcon />
          </div>
          Previous
        </button>
        <button onClick={handleNext}>
          Next
          <div className="name_arrow">
            <ArrowForwardIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Form14;
