import React, { useState } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import * as Scroll from "react-scroll";
import { Link } from "react-router-dom";

const ScrollLink = Scroll.Link;

function Navbar() {
  const [icon, setIcon] = useState(false);
  const [color, setColor] = useState(false);


  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header_bg" : "header"}>
      <h1>Association</h1>
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
            >
              <Link to="/">Gallery</Link>
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
            >
              <Link to="/">Events</Link>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="committee"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              <Link to="/">Committee</Link>
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="registerUpdates"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              <Link to="/">Membership</Link>
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
            >
              <Link to="/">About</Link>
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
            >
              <Link to="/">Contact Us</Link>
            </ScrollLink>
          </li>
        </>
        )
      </ul>
      <div className="hamburger" onClick={() => setIcon(!icon)}>
        {icon ? <CloseIcon /> : <MenuIcon />}
      </div>
    </div>
  );
}

export default Navbar;
