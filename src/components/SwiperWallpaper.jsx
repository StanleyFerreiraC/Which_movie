import React from "react";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

const SwiperWallpaper = ({children}) => {

    const [spaceBetween, setSpaceBetween] = useState([]);


    useEffect(() => {
      function handleResizexx() {
        if (window.innerWidth <= 1920) {
          setSpaceBetween(-150);
        }
        if (window.innerWidth <= 1600) {
          setSpaceBetween(-100);
        }
        if (window.innerWidth <= 1366) {
          setSpaceBetween(0);
        }
        if (window.innerWidth <= 900) {
          setSpaceBetween(-10);
        }
        if (window.innerWidth <= 500) {
          setSpaceBetween(0);
        }
      }
  
      handleResizexx();
  
      window.addEventListener("resize", handleResizexx);
  
      return () => {
        window.removeEventListener("resize", handleResizexx);
      };
    }, []);
  
    return (
      <Swiper
        className="paper-box"
        modules={[Navigation, Pagination]}
        spaceBetween={spaceBetween}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        rewind
      >
        {children}
      </Swiper>
    );
  };

export default SwiperWallpaper