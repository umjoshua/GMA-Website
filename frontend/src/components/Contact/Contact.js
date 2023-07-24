import React, { useState } from "react";
import "./Contact.css";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from '@mui/icons-material/Facebook';
import * as api from '../../api';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Contact() {

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [input, setInput] = useState({ name: '', phone: '', email: '', message: '' })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setStatus("")
    setLoading(true);
    event.preventDefault();
    await api.ContactUs(input).then((res) => {
      setStatus("Thank you for your message. We have received it and will be in contact with you shortly.");
      setInput({ name: '', phone: '', email: '', message: '' })
    }).catch((err) => {
      setStatus("Couldn't send the message");
      setInput({ name: '', phone: '', email: '', message: '' })
    })
    setLoading(false);
  }

  return (
    <div className="contact_main">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="contact_us">
        <h1>Contact Us</h1>
      </div>

      <div className="contact_inside">
        <div className="contact_icons">
          <div className="first_icons">
            <a href='tel://+61476187075'>
              <span className="contact_symbols">
                <PhoneIcon className="contact_phone" fontSize="large" />
              </span>
            </a>
            <a href='mailto://geelongmalayaleeassociation@gmail.com' target='_blank' rel='noopener noreferrer'>
              <span className="contact_symbols" style={{ backgroundColor: "#eeeeee" }}>
                <EmailIcon style={{ color: 'red' }} fontSize="large" />
              </span>
            </a>
          </div>
          <div className="second_icons">
            <a href='https://www.instagram.com/geelong_malayalee_association' target='_blank' rel='noopener noreferrer'>
              <span className="contact_symbols" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
                <InstagramIcon fontSize="large" />
              </span>
            </a>
            <a href='https://www.facebook.com/GeelongMalayaleeAssociation' target='_blank' rel='noopener noreferrer'>
              <span className="contact_symbols" style={{
                background: "radial-gradient(circle, #0077B5, #006699)"
              }}>
                <FacebookIcon fontSize="large" />
              </span>
            </a>
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
            <div className="status" style={{ color: 'green', textAlign: 'center' }}>{status}</div>
          </form>
        </div>
      </div>
    </div >
  );
}

export default Contact;
