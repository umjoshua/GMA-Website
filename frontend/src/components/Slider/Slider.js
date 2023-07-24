import React, { useEffect, useState } from "react";
import "./Slider.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import * as api from '../../api';

// import SwiperData from "../../data/SwiperData/SwiperData";

function Slider() {
  const [swiperData, setSwiperData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.fetchSwiperData()
      if (response?.data) {
        setSwiperData(response.data)
      }
    }
    fetchData()
  }, []);

  return (
    <div className="slider_main">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {swiperData.map((image, key) => {
          return (
            <SwiperSlide>
              <img src={image.imageURL} key={key} alt="slide_image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
