import React from "react";
import "./Form8.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form8({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">
          Emergency Contact Details in Kerala / India
        </span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="emergency_form_container">
        <div>
          <input
            type="text"
            name="eFname"
            value={data.eFname}
            onChange={handleChange}
          />
          <label>First Name</label>
        </div>
        <div>
          <input
            type="text"
            name="eLname"
            value={data.eLname}
            onChange={handleChange}
          />
          <label>Last Name</label>
        </div>
      </div>
      <div className="addr_button">
        <button onClick={handlePrevious}>
          <div className="name_arrow">
            <ArrowBackIcon />
          </div>
          Previous
        </button>
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

export default Form8;
