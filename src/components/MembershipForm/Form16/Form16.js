import React, { useState } from "react";
import "./Form16.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form16({ data, handleChange, handlePrevious, activeButton, setActiveButton, handleNext }) {
  // const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonValue) => {
    setActiveButton(buttonValue);
  };

  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Membership fee paid ?</span>
        <span className="name_sub">
          BSB: 063871 A/C No: 1034 5666 A/C Name: Geelong Malayalee Association
          Inc.
        </span>
      </div>
      <div className="fee_form_container">
        <input
          type="button"
          value="Yes"
          onClick={() => handleButtonClick("Yes")}
          className={activeButton === "Yes" ? "active" : ""}
        />
        <input
          type="button"
          value="No"
          onClick={() => handleButtonClick("2")}
          className={activeButton === "No" ? "active" : ""}
        ></input>
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

export default Form16;
