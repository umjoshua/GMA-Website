import React from "react";
import "./Form1.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Form1({ data, handleChange }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Name of the Applicant</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="name_form_container">
        <div>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
          <label>First Name</label>
        </div>
        <div>
          <input
            type="text"
            name="middleName"
            value={data.middleName}
            onChange={handleChange}
          />
          <label>Middle Name</label>
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
          <label>Last Name</label>
        </div>
      </div>
      <div className="name_button">
        <button>
          Next
          <div className="name_arrow">
            <ArrowForwardIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Form1;
