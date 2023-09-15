import { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";
import PosterSlide from "../components/PosterSlide";
import { Box } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import Swipers from "../components/Swiper";
import SwiperPoster from "../components/SwiperPoster";

import "../components/style/MoviesGrid.css";
import "../components/style/Swiper.css";
import "../components/style/ResposiveHome.css";

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
  const [tvPopular, setTvPopularUrl] = useState([]);

  const getTvPopular = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTvPopularUrl(data.results);
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

    const tvPopularUrl = `${geralURL}${tmdbConfigs.mediaType.tv}/popular?${apiKey}&language=pt-BR`;
    getTvPopular(tvPopularUrl);

    // Solicita os filmes populares
    const popularUrl = `${geralURL}${tmdbConfigs.mediaType.movie}/popular?${apiKey}&language=pt-BR`;
    getPopularMovies(popularUrl);

    // Solicita os melhores filmes
    const topUrl = `${geralURL}${tmdbConfigs.mediaType.movie}/top_rated?${apiKey}&language=pt-BR`;

    getTopMovies(topUrl);

    // Solicita as Series melhores avalisadas
    const tvUrl = `${geralURL}${tmdbConfigs.mediaType.tv}/top_rated?${apiKey}&language=pt-BR`;
    getTvTopRated(tvUrl);
  }, []);

  //console.log(trending);

  return (
    <div>
      <div className="poster-home">
        <Box
          sx={{
            width: "100%",
            "& .swiper-slide": {
              opacity: "0.5",
            },
            "& .swiper-slide-active": { opacity: 1 },
          }}
        >
         <SwiperPoster>
            {trending.length > 0 &&
              trending.map((movie, index) => (
                <SwiperSlide key={index}>
                  <PosterSlide key={movie.id} movie={movie} />
                </SwiperSlide>
              ))}
          </SwiperPoster>
        </Box>
      </div>

      <div className="container">
        

        <div className="title-box">
          <h3 className="title">Filmes populares</h3>
        </div>

        <Swipers>
          {popularMovies.length > 0 &&
            popularMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCard key={movie.id} movie={movie} />
              </SwiperSlide>
            ))}
        </Swipers>

        <div className="title-box">
          <h3 className="title">Series populares</h3>
        </div>

        <Swipers>
          {tvPopular.length > 0 &&
            tvPopular.map((series, index) => (
              <SwiperSlide key={index}>
              <TvCard key={series.id} series={series} />
            </SwiperSlide>
            ))}
        </Swipers>

        <div className="title-box">
          <h3 className="title">Filmes melhor avaliados</h3>
        </div>

        <Swipers>
          {topMovies.length > 0 &&
            topMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCard key={movie.id} movie={movie} />
              </SwiperSlide>
            ))}
        </Swipers>
        <div className="title-box">
          <h3 className="title">Séries melhor avaliadas</h3>
        </div>

        <Swipers>
          {tvTopRated.length > 0 &&
            tvTopRated.map((series, index) => (
              <SwiperSlide key={index}>
                <TvCard key={series.id} series={series} />
              </SwiperSlide>
            ))}
        </Swipers>
      </div>
    </div>
  );
};

export default Home;
