import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import "./Home.css";
import Footer from "../../components/Footer/Footer";
import Contact from "../../components/Contact/Contact";
import Events from "../Events/Events";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="slider_div">
        <Slider />
      </div>
      <Events />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
