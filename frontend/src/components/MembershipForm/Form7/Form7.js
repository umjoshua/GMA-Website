import React, { useState } from "react";
import "./Form7.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form7({
  handlePrevious,
  selectedGroup,
  setSelectedGroup,
  handleNext,
}) {
  const bloodGroups = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  //const [selectedGroup, setSelectedGroup] = useState("");
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Blood Group</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="blood_form_container">
        <select
          id="bloodGroup"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          <option value="">-- Select --</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
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

export default Form7;
