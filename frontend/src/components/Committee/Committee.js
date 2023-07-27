import React from "react";
import "./Committee.css";
import Avatar from '../../assets/images/avatar.png'

function Committee({ item }) {
  return (
    <div className="commitee_container">
      <div className="committee_image">
        <img src={item.file!=="" ? item.imageUrl : Avatar} alt="Profile" style={{maxWidth: "200px"}}/>
      </div>
      <div className="committee_content">
        <span className="p_name">{item.name}</span>
        <span className="po_name">{item.position}</span>
      </div>
    </div>
  );
}

export default Committee;