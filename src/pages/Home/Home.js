import React from "react";
import Slider from "../../components/Slider/Slider";
import "./Home.css";
import Contact from "../../components/Contact/Contact";
import Events from "../Events/Events";
import RegisterForUpdate from "../../components/RegisterForUpdate/RegisterForUpdate";

function Home() {
  return (
    <div>
      <div className="slider_div">
        <Slider />
      </div>
      <Events />
      <RegisterForUpdate />
      <Contact />
    </div>
  );
}

export default Home;
