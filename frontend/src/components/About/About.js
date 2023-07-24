import React from "react";
import "./About.css";
import Logo from '../../assets/images/logo.png';

function About() {
  return (
    <div className="about_container">
      <div className="about_description">
        <p>
        GMA was established in 2018 with a distinct prospect to offer a cultural and tradition-sharing a platform for the growing Malayalee community in Geelong. The non-profitable lucrative venture of GMA showcases the dedication and admiration towards the land we live on. GMA’s assiduous effort instituted a Malayalam school locally to persuade the young “Mallu Kids” growing up in a multicultural society. Nevertheless, GMA pursuit to broaden its venture to be the best Geelong regional inclusive association with an infinite vision of serving locally, nationally and internationally.
        </p>
      </div>
      <div className="about_logo">
        <img src={Logo} style={{width:"200px"}} alt="Logo" />
      </div>
    </div>
  );
}

export default About;
