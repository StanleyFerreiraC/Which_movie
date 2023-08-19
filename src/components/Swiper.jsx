import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

const NavigationSwiper = ({ children }) => {

    const [slidesPerView, setSlidePerView] = useState([]);
    const [spaceBetween, setSpaceBetween] = useState([]);

    useEffect(() => {
        function handleResizes() {
          if (window.innerWidth <= 1920) {
            setSlidePerView(6);
            setSpaceBetween(-100);
          }
          if (window.innerWidth < 1600) {
            setSlidePerView(4.2);
            setSpaceBetween(-300);
          }
          if (window.innerWidth < 1366) {
            setSlidePerView(3.2);
            setSpaceBetween(-300);
          }
          if (window.innerWidth < 900) {
            setSlidePerView(2);
            setSpaceBetween(10);
          }
          if (window.innerWidth < 500) {
            setSlidePerView(2);
            setSpaceBetween(-38);
          }
        }
    
        handleResizes();
    
        window.addEventListener("resize", handleResizes);
    
        return () => {
          window.removeEventListener("resize", handleResizes);
        };
      }, []);


  return (

      <Swiper
      className="app"
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


export default NavigationSwiper;

