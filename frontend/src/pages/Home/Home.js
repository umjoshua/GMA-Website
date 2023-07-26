import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import "./Home.css";
import Contact from "../../components/Contact/Contact";
import Events from "../Events/Events";
import AboutPage from "../AboutPage/AboutPage";
import MembershipRegister from "../../components/MembershipRegister/MembershipRegister";
import Banner from "../../components/Banner/Banner";
import { useLocation } from "react-router-dom";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let location = useLocation()
  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        const topMargin = 100;
        const elemTop = elem.getBoundingClientRect().top;
        const targetPosition = elemTop + window.scrollY - topMargin;
        window.scroll({
          top: targetPosition,
          left: 0,
          behavior: 'smooth',
        });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location,])

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
        <MembershipRegister />
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
