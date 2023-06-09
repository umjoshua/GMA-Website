import React from "react";
import "./RegisterForUpdate.css";

function RegisterForUpdate() {
  return (
    <div className="register_for_updates">
      <div className="update_text">
        <span>Register for Updates!</span>
      </div>
      <div className="update_container">
        <form className="update_form">
          <input type="email" placeholder="johndoe@gmail.com" />
        </form>
        <button className="register_button">
          <span className="circle">
            <span className="arrow"></span>
          </span>
          <span className="text">Submit</span>
        </button>
      </div>
    </div>
  );
}

export default RegisterForUpdate;
