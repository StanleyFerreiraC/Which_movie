import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import { Swiper } from "swiper/react";

const NavigationSwiper = ({ children }) => {
  const [slidesPerView, setSlidePerView] = useState([]);
  const [spaceBetween, setSpaceBetween] = useState([]);
  const [slidesPerGroup, setSlidesPerGroup] = useState([]);
  const [freeMode, setFreeMode] = useState([]);

  useEffect(() => {
    function handleResizes() {
      if (window.innerWidth <= 1920) {
        setSpaceBetween(-1450);
        setSlidesPerGroup(3);
        setFreeMode("enabled: true")
      }
      if (window.innerWidth <= 1600) {
        setSlidePerView(4.2);
        setSpaceBetween(-1225);
        setFreeMode("enabled: false")
      }
      if (window.innerWidth <= 1366) {
        setSpaceBetween(-1100);
        setFreeMode("enabled: false")
      }
      if (window.innerWidth <= 900) {
        setSlidePerView(2);
        setSpaceBetween(10);
        setFreeMode("enabled: false")
      }
      if (window.innerWidth <= 500) {
        setSlidePerView(3);
        setSpaceBetween(-290);
        setFreeMode("enabled: true")
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
      modules={[Navigation, Pagination, FreeMode]}
      navigation={{ clickable: true }}
      spaceBetween={spaceBetween}
      slidesPerGroup={slidesPerGroup}
      freeMode={freeMode}
      rewind={true}
    >
      {children}
    </Swiper>
  );
};

export default NavigationSwiper;
