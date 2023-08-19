import React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";

const SwiperPoster = ({children}) => {
  const [spaceBetween, setSpaceBetween] = useState([]);

  useEffect(() => {
    function handleResizex() {
      if (window.innerWidth <= 1920) {
        setSpaceBetween(-300);
      }
      if (window.innerWidth <= 1600) {
        setSpaceBetween(-220);
      }
      if (window.innerWidth <= 1366) {
        setSpaceBetween(-220);
      }
      if (window.innerWidth <= 900) {
        setSpaceBetween(100);
      }
      if (window.innerWidth <= 500) {
        setSpaceBetween(0);
      }
    }

    handleResizex();

    window.addEventListener("resize", handleResizex);

    return () => {
      window.removeEventListener("resize", handleResizex);
    };
  }, []);

  return (
    <Swiper
      className="poster"
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 5000 }}
      initialSlide={1}
      spaceBetween={spaceBetween}
      navigation={{ clickable: true }}
      pagination={{ clickable: true }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperPoster;
