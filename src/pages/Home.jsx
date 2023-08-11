import { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";
import PosterSlide from "../components/posterSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import "../components/style/MoviesGrid.css";
import "../components/style/Swiper.css";
import "../components/style/Resposive.css";

const apiKey = import.meta.env.VITE_API_KEY;
const geralURL = import.meta.env.VITE_API_GERAL;
import tmdbConfigs from "../config/tmdb.configs";

const Home = () => {

  //resgata o genero para o poster
  const [trending, setTrending] = useState([]);

  const getTrending = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTrending(data.results);
  };


  // Lançamentos recentes
  const [nowMovies, setNowMovies] = useState([]);

  const getNowMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setNowMovies(data.results);
  };

  // Filmes populares
  const [popularMovies, setPopularMovies] = useState([]);

  const getPopularMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setPopularMovies(data.results);
  };

  // Melhores filmes
  const [topMovies, setTopMovies] = useState([]);

  const getTopMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  // Series populares
  const [tvTopRated, setTvTopRated] = useState([]);

  const getTvTopRated = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTvTopRated(data.results);
  };

  useEffect(() => {
    // Solicita os filmes recentes

    const trendingUrl = `${geralURL}trending/all/day?${apiKey}&language=pt-BR`;
    getTrending(trendingUrl);

    const nowUrl = `${geralURL}${tmdbConfigs.mediaType.movie}/now_playing?${apiKey}&language=pt-BR`;
    getNowMovies(nowUrl);

    // Solicita os filmes populares
    const popularUrl = `${geralURL}${tmdbConfigs.mediaType.movie}/popular?${apiKey}&language=pt-BR`;
    getPopularMovies(popularUrl);

    // Solicita os melhores filmes
    const topUrl = `${geralURL}${tmdbConfigs.mediaType.movie}/top_rated?${apiKey}&language=pt-BR`;

    getTopMovies(topUrl);

    // Solicita as Series melhores avalisadas
    const tvUrl = `${geralURL}${tmdbConfigs.mediaType.tv}/top_rated?${apiKey}&language=pt-BR`;
    getTvTopRated(tvUrl)

  }, []);

//console.log(getTrending);

const [slidesPerView, setSlidePerView] = useState([]);

  useEffect(() => {

    function handleResize(){
      if(window.innerWidth <1920) {
        setSlidePerView(5.2);
      }else{
        setSlidePerView(5.2)
      }
      if(window.innerWidth <1600) {
        setSlidePerView(4.2);
      }
      if(window.innerWidth <1230) {
        setSlidePerView(3.2);
      }
      if(window.innerWidth <900) {
        setSlidePerView(2.1);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize)

    return () =>{window.removeEventListener("resize", handleResize)}

  }, []);

  return (
    <div>

<div className="poster-home">

      <Swiper className="poster" 
      slidesPerView={1} 
       modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
       autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
       navigation={{clickable: true}}
       pagination={{ clickable: true}}
       onSwiper={() => console.log()}
       onSlideChange={() => console.log()}
      >
        {trending.length > 0 &&
          trending.map((movie, index) => (
            <SwiperSlide key={index}>
              <PosterSlide key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>

      
      </div>

<div className="container">
  <div className="title-box">
     <h3 className="title">Recentes</h3>
  </div>
     

      <Swiper className="app" 
       slidesPerView={slidesPerView}
       modules={[Navigation, Pagination, Scrollbar, A11y]}
       onSwiper={() => console.log()}
       onSlideChange={() => console.log()}


      >
        {nowMovies.length > 0 &&
          nowMovies.map((movie, index) => (
            <SwiperSlide key={index} >
              <MovieCard key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="title-box">
        <h3 className="title">Popular</h3>
        </div>

      

      <Swiper className="app" slidesPerView={slidesPerView}>
        {popularMovies.length > 0 &&
          popularMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="title-box">
        <h3 className="title">Filmes melhor avaliados</h3>
      </div>
      

      <Swiper className="app" slidesPerView={slidesPerView}>
        {topMovies.length > 0 &&
          topMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="title-box">
        <h3 className="title">Séries melhor avaliadas</h3>
        </div>
      


      <Swiper className="app" slidesPerView={slidesPerView}>
        {tvTopRated.length > 0 &&
          tvTopRated.map((series, index) => (
            <SwiperSlide key={index}>
              <TvCard key={series.id} series={series} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
    </div>
  );
};

export default Home;

//Não estou conseguindo adicionar a segunda coluna com top_rated, verificar faz duas solicitações pra api
