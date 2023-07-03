import React from "react";
import About from "../../components/About/About";
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="aboutpage_container">
      <div className="about_title">
        <h1>About Us</h1>
      </div>
      <div>
        <About/>
      </div>
    </div>
  );
}

export default AboutPage;
