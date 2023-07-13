import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import "./Home.css";
import Contact from "../../components/Contact/Contact";
import Events from "../Events/Events";
import AboutPage from "../AboutPage/AboutPage";
import RegisterForUpdate from "../../components/RegisterForUpdate/RegisterForUpdate";
import Banner from "../../components/Banner/Banner";

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
      <section id="events">
        <Events />
      </section>
      <section id="about">
        <AboutPage />
      </section>
      <section id="registerUpdates">
        <RegisterForUpdate />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="cultura">
        <Banner />
      </section>
    </div>
  );
}

export default Home;
