import React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";
const SwiperPeople = ({children}) => {

    const [slidesPerView, setSlidePerView] = useState([]);
    const [spaceBetween, setSpaceBetween] = useState([]);

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth < 1920) {
            setSlidePerView(6);
            setSpaceBetween(-60);
          }
          if (window.innerWidth < 500) {
            setSlidePerView(3);
            setSpaceBetween(-80);
          }
        }
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
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
      rewind={true}
      >
        {children}
      </Swiper>

  );
};

export default SwiperPeople