import React from "react";
// import "./Form11.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form11({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Spouse Phone Number</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="e_form_container">
        <input
          type="tel"
          placeholder="(###) ###-####"
          name="sPhone"
          value={data.sPhone}
          onChange={handleChange}
        />
        <label>
          Please enter 10 digit mobile number excluding the country code
        </label>
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

export default Form11;
