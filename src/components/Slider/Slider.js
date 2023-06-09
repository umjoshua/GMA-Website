import React from "react";
import "./Slider.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination,Autoplay } from "swiper";

import Image1 from '../../assets/images/img_1.jpg'
import Image2 from '../../assets/images/img_2.jpg' 
import Image3 from '../../assets/images/img_3.jpg'
import Image4 from '../../assets/images/img_4.jpg'
import Image5 from '../../assets/images/img_5.jpg'
import Image6 from '../../assets/images/img_6.jpg'
import Image7 from '../../assets/images/img_7.jpg'


function Slider() {
  return (
    <div className="slider_main">
      <Swiper effect={"coverflow"}
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
            clickable: true
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="mySwiper">
        <SwiperSlide><img src={Image1} alt="slide_image"/></SwiperSlide>
        <SwiperSlide><img src={Image2} alt="slide_image"/></SwiperSlide>
        <SwiperSlide><img src={Image3} alt="slide_image"/></SwiperSlide>
        <SwiperSlide><img src={Image4} alt="slide_image"/></SwiperSlide>
        <SwiperSlide><img src={Image5} alt="slide_image"/></SwiperSlide>
        <SwiperSlide><img src={Image6} alt="slide_image"/></SwiperSlide>
        <SwiperSlide><img src={Image7} alt="slide_image"/></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
