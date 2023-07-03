import React, { useState } from "react";
import "./Form5.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form5({ handlePrevious,handleNext,selectedOption, setSelectedOption }) {
  //const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Gender</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="phone_form_container">
        <div className="gender_form">
          <div className="male">
            <label>
              <input
                type="radio"
                value="male"
                checked={selectedOption === "male"}
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
              />
              Male
            </label>
          </div>
          <div className="female">
            <label>
              <input
                type="radio"
                value="female"
                checked={selectedOption === "female"}
                onChange={(event) => {
                  setSelectedOption(event.target.value);
                }}
              />
              Female
            </label>
          </div>
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

export default Form5;
