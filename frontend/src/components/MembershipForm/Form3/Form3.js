import React from "react";
import "./Form3.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form3({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Phone Number</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="phone_form_container">
        <div className="phone_form">
          <div className="area_code">
            <input
              type="text"
              name="areaCode"
              value={data.areaCode}
              onChange={handleChange}
            />
            <label>Area Code</label>
          </div>
          <div className="phone_code">
            <input
              type="tel"
              name="phoneNum"
              value={data.phoneNum}
              onChange={handleChange}
            />
            <label>Phone Number</label>
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

export default Form3;
