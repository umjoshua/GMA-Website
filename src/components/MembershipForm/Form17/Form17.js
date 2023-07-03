import React, { useState } from "react";
import "./Form17.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form17({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">
          By ticking this box I agree I have read, understood and abide the
          rules of Geelong Malayalee Association(GMA). I also agree to be a
          member of Geelong Malayalee Association(GMA) and my details can be
          entered in the membership register. I am aware that these details can
          be used to send membership fee notices and other communications
          including information about meeting and events organized or supported
          by Geelong Malayalee Association(GMA). Geelong Malayalee
          Association(GMA) and it's office bearers respects your privacy
          seriously and are aware that it is an offence to make improper use of
          information about a person obtained from the Register of Members as
          per Section 58 of the Associations Incorporation Reform act 2012
        </span>
        <span className="name_sub">Select one</span>
      </div>
      <div className="agree_form_container">
        <label>
          <input
            type="checkbox"
            name="pAgree"
            onChange={handleChange}
          />
          I have read, understood and accepted the rules for membership
        </label>
        <label>
          <input
            type="checkbox"
            name="pConfirm"
            onChange={handleChange}
          />
          I confirm that all the above information are correct and true to best
          of my knowledge and belief
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

export default Form17;
