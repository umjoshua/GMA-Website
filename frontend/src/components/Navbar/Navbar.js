import React, { useState } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import * as Scroll from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import Logo from '../../assets/images/logo.png';

const ScrollLink = Scroll.Link;

function Navbar() {
  const location = useLocation();
  const [icon, setIcon] = useState(false);

  return (
    <div className={"header"} style={{ visibility: location.pathname.includes("/admin") ? "hidden" : "visible" }}>
      <div className="logo-div">
        <img src={Logo} alt="logo" className="logo" />
        <p>Geelong Malayalee Association Inc</p>
      </div>
      <ul className={icon ? "nav_menu active" : "nav_menu"}>
        <>
          {(
            <li>
              <ScrollLink
                to="home"
                spy
                smooth={true}
                offset={-100}
                duration={500}
                style={{ cursor: "pointer" }}
                onClick={() => setIcon(false)}
              >
                <Link to="/">Home</Link>
              </ScrollLink>
            </li>

          )}
          <li>
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
              onClick={() => setIcon(false)}
            >
              <Link to="/gallery">Gallery</Link>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="events"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
              onClick={() => { if (icon) { setIcon(false) } }}
            >
              <Link to="/events">Events</Link>
            </ScrollLink>
          </li>
          <li onClick={() => { if (icon) { setIcon(false) } }}>
            <Link to='/committee'>Committee</Link>
          </li>
          <li>
            <ScrollLink
              to="registerUpdates"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
              onClick={() => { if (icon) { setIcon(false) } }}
            >
              <Link to="/#registerUpdates">Membership</Link>
            </ScrollLink>
          </li>

          <li>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
              onClick={() => { if (icon) { setIcon(false) } }}
            >
              <Link to="/#about">About</Link>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
              onClick={() => { if (icon) { setIcon(false) } }}
            >
              <Link to="/#contact">Contact Us</Link>
            </ScrollLink>
          </li>
        </>
      </ul>
      <div className="hamburger" onClick={() => setIcon(!icon)}>
        {icon ? <CloseIcon style={{ color: 'white' }} /> : <MenuIcon />}
      </div>
    </div>
  );
}

export default Navbar;
