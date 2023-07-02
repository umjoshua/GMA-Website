import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Form2.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form2({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Address</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="address_form_container">
        <div className="addr_street">
          <div className="addr_street1">
            <input
              type="text"
              name="streetAddr1"
              value={data.streetAddr1}
              onChange={handleChange}
            />
            <label>Street Address</label>
          </div>
          <div className="addr_street1">
            <input
              type="text"
              name="streetAddr2"
              value={data.streetAddr2}
              onChange={handleChange}
            />
            <label>Street Address Line 2</label>
          </div>
        </div>
        <div className="addr_sub">
          <div className="addr_sub1">
            <input
              type="text"
              name="suburb"
              value={data.suburb}
              onChange={handleChange}
            />
            <label>Suburb</label>
          </div>
          <div className="addr_sub2">
            <input
              type="text"
              name="state"
              value={data.state}
              onChange={handleChange}
            />
            <label>State</label>
          </div>
        </div>
        <div className="addr_sub">
          <div className="addr_sub1">
            <input
              type="text"
              name="postcode"
              value={data.postcode}
              onChange={handleChange}
            />
            <label>Post Code</label>
          </div>
          <div className="addr_sub2">
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={handleChange}
            />
            <label>Country</label>
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

export default Form2;
