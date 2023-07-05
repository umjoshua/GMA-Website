import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import "./Home.css";
import Contact from "../../components/Contact/Contact";
import Events from "../Events/Events";
import CommitteePage from "../CommitteePage/CommitteePage";
import AboutPage from "../AboutPage/AboutPage";
import RegisterForUpdate from "../../components/RegisterForUpdate/RegisterForUpdate";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <section id="home">
        <div className="slider_div">
          <Slider />
        </div>
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <section id="events">
        <Events />
      </section>
      <section id="registerUpdates">
        <RegisterForUpdate />
      </section>
      <section id="committee">
        <CommitteePage />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="about">

      </section>
    </div>
  );
}

export default Home;
