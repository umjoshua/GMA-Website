import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Form10({ data, handleChange, handlePrevious }) {
  return (
    <div className="name_form">
      <div className="name_title">
        <span className="name_heading">Name of Spouse</span>
        <span className="name_sub">Type in the following</span>
      </div>
      <div className="name_form_container">
        <div>
          <input type="text" name="sFname" value={data.sFname} onChange={handleChange}/>
          <label>First Name</label>
        </div>
        <div>
          <input type="text" name="sMname" value={data.sMname} onChange={handleChange} />
          <label>Middle Name</label>
        </div>
        <div>
          <input type="text" name="sLname" value={data.sLname} onChange={handleChange}/>
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

export default Form10;
