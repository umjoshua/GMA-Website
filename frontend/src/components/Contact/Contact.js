import React, { useRef } from "react";
import "./Contact.css";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Contact() {
  const textAreaRef = useRef(null);
  const handleTextAreaChange = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = "70px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <div className="contact_main">
      <div className="contact_us">
        <h1>Contact Us</h1>
      </div>

      <div className="contact_inside">
        
        <div className="contact_icons">
          <div className="first_icons">
            <span className="contact_symbols">
              <PhoneIcon className="contact_phone" />
            </span>
            <span className="contact_symbols">
              <EmailIcon />
            </span>
          </div>
          <div className="second_icons">
            <span className="contact_symbols">
              <InstagramIcon />
            </span>
            <span className="contact_symbols">
              <LinkedInIcon />
            </span>
          </div>
        </div>

        <div className="contact_form_div">
          <form className="contact_form">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
            <label>Phone No</label>
            <input type="tel" placeholder="Phone number" />
            <label>Email</label>
            <input type="email" placeholder="johndoe@gmail.com" />
            <label>Description</label>
            <textarea ref={textAreaRef} onChange={handleTextAreaChange} placeholder="Type here.."/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
