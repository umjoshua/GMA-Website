import React, { useState } from "react";
import "./Contact.css";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Contact() {

  const [input, setInput] = useState({ name: '', phone: '', email: '', message: '' })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(input)
  }

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
            <span className="contact_symbols" style={
              {
                background: "radial-gradient(circle, #dd4336 10%, #eeeeee 10%, #eeeeee 90%, #d53224 90%)"
              }
            }>
              <EmailIcon />
            </span>
          </div>
          <div className="second_icons">
            <span className="contact_symbols" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
              <InstagramIcon />
            </span>
            <span className="contact_symbols" style={{
              background: "radial-gradient(circle, #0077B5, #006699)"
            }}>
              <LinkedInIcon />
            </span>
          </div>
        </div>

        <div className="contact_form_div">
          <form className="contact_form" onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input type="text" placeholder="Name" value={input.name}
              name="name"
              onChange={handleChange} />
            <label>Phone No</label>
            <input type="tel" placeholder="Phone number" value={input.phone}
              name="phone"
              onChange={handleChange} />
            <label>Email</label>
            <input type="email" placeholder="johndoe@gmail.com" value={input.email}
              name="email"
              onChange={handleChange} />
            <label>Your message (optional)</label>
            <textarea placeholder="Type here.." value={input.message}
              name="message"
              onChange={handleChange} />
            <button className="contact_button">Send</button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default Contact;
