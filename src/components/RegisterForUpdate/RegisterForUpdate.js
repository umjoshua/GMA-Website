import React from "react";
import "./RegisterForUpdate.css";
import { useNavigate } from "react-router-dom"; 

function RegisterForUpdate() {
  let navigate = useNavigate();

  const handleMembership = () => {
    navigate("/")
  }

  return (
    <div className="register_for_updates">
      <div className="update_text">
        <div className="update_items">
          <span>Become a Member!</span>
          <button onClick={handleMembership} className="register_button">
            <span className="circle">
              <span className="arrow"></span>
            </span>
            <span className="text">Join US</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForUpdate;
