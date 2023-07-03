import React from "react";
// import "./Form11.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form12({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Spouse Email</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="e_form_container">
        <input
          type="email"
          name="sEmail"
          value={data.sEmail}
          onChange={handleChange}
        />
        <label>johndoe@gmail.com</label>
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

export default Form12;
