import React from "react";
import './AboutPage.css';
import Logo from '../../assets/images/logo.png';

function AboutPage() {
  return (
    <div className="aboutpage_container">
      <div className="about_container">
        <div className="about_logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="about_content">
          <div className="about_title">
            <h1>About Us</h1>
          </div>
          <div className="about_description">
          An archive of cultural gatherings and celebration of malayalees in Geelong lead to an introduction of framework, Geelong Malayalee Association Inc (GMA). GMA was established in 2018 with a distinct prospect to offer a cultural and tradition-sharing platform for the growing Malayalee community in Geelong. The non-profitable lucrative venture of GMA showcases the dedication and admiration towards the land we live on. GMA’s assiduous effort instituted a Malayalam school locally to persuade the young “Mallu Kids” growing up in a multicultural society. Nevertheless, GMA pursuit to broaden its venture to be the best Geelong regional inclusive association with an infinite vision of serving locally, nationally and internationally.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;