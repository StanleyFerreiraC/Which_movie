import React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";
const SwiperPeople = ({children}) => {

    const [slidesPerView, setSlidePerView] = useState([]);
    const [spaceBetween, setSpaceBetween] = useState([]);

    useEffect(() => {
        function handleResizer() {
          if (window.innerWidth <= 1920) {
            setSlidePerView(6);
            setSpaceBetween(-60);
          }
          if (window.innerWidth <= 1600) {
            setSlidePerView(5);
            setSpaceBetween(-60);
          }
          if (window.innerWidth <= 1390) {
            setSlidePerView(4);
            setSpaceBetween(-60);
          }
          if (window.innerWidth <= 1000) {
            setSlidePerView(3);
            setSpaceBetween(-60);
          }
          if (window.innerWidth <= 500) {
            setSlidePerView(2);
            setSpaceBetween(-80);
          }
        }
    
        handleResizer();
    
        window.addEventListener("resize", handleResizer);
    
        return () => {
          window.removeEventListener("resize", handleResizer);
        };
      }, []);


  return (

      <Swiper
      className="people"
      modules={[Navigation, Pagination]}
      navigation={{ clickable: true }}
      slidesPerView={slidesPerView}
      slidesPerGroup={3}
      spaceBetween={spaceBetween}
      >
        {children}
      </Swiper>

  );
};

export default SwiperPeople