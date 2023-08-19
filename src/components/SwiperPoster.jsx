import React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";

const SwiperPoster = ({children}) => {
  const [spaceBetween, setSpaceBetween] = useState([]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1920) {
        setSpaceBetween(-300);
      }
      if (window.innerWidth < 900) {
        setSpaceBetween(100);
      }
      if (window.innerWidth < 500) {
        setSpaceBetween(0);
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
      className="poster"
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 5000 }}
      initialSlide={1}
      spaceBetween={spaceBetween}
      navigation={{ clickable: true }}
      pagination={{ clickable: true }}
      rewind={true}
    >
      {children}
    </Swiper>
  );
};

export default SwiperPoster;
