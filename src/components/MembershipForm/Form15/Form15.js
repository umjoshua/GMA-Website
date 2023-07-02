import React, { useState } from "react";
import "./Form15.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form15({ handlePrevious, handleNext, selectedMemOption, setSelectedMemOption }) {
  // const [selectedMemOption, setSelectedMemOption] = useState(null);

  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Type of Membership</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="phone_form_container">
        <div className="mem_form">
          <div className="full_mem">
            <label>
              <input
                type="radio"
                value="full_membership"
                checked={selectedMemOption === "full_membership"}
                onChange={(event) => {
                  setSelectedMemOption(event.target.value);
                }}
              />
              Full Membership
            </label>
          </div>
          <div className="ass_mem">
            <label>
              <input
                type="radio"
                value="associate_membership"
                checked={selectedMemOption === "associate_membership"}
                onChange={(event) => {
                  setSelectedMemOption(event.target.value);
                }}
              />
              Associate Membership
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

export default Form15;
