import React from "react";
import "./Form4.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form4({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Email</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="email_form">
        <div className="email_con">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <label>Email</label>
        </div>
        <div className="verify">
          <button>Sent Verification Code</button>
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

export default Form4;
