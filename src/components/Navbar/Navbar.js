import React, { useState } from "react";
import "./Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Navbar() {
  const [icon, setIcon] = useState(false);

  return (
    <div className="header">
      <h1>Association</h1>
      <ul className={icon ? "nav_menu active" : "nav_menu"}>
        <li>Home</li>
        <li>Gallery</li>
        <li>Events</li>
        <li>Registration</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="hamburger" onClick={() => setIcon(!icon)}>
        {icon ? <CloseIcon/> : <MenuIcon/>}
      </div>
    </div>
  );
}

export default Navbar;
