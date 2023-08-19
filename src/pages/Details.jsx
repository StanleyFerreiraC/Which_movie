import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import YouTube from "react-youtube";

import tmdbConfigs from "../config/tmdb.configs";

import "../components/style/Details.css";
import "../components/style/ResponsiveDetails.css";
import "../components/style/Swiper.css";
import ProgressCircle from "../components/ProgressCircle";
import InfoExtras from "../components/details/InfoExtras";
import InfoExtrasTv from "../components/details/infoExtrasTv";
import { Box } from "@mui/material";

import SwiperPeople from "../components/SwiperPeople.jsx";

const geralURL = import.meta.env.VITE_API_GERAL;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imagesURL = import.meta.env.VITE_IMG;
const backURL = import.meta.env.VITE_BACK_IMG;

const Details = () => {
  const { mediaType, id } = useParams();
  const [movie, setMedia] = useState();
  const [providers, setProviders] = useState();
  const [trailer, setTrailer] = useState([]);
  const [mediaGenres, setMediaGenres] = useState();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [situation, setSituation] = useState([]);

  const getMedia = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMedia(data);
  };

  const getProvider = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if (
      data.results &&
      data.results.BR &&
      data.results.BR.flatrate &&
      data.results.BR.flatrate.length > 0
    ) {
      setProviders(data.results.BR.flatrate);
    } else {
      setProviders([]);
    }
    setIsLoading(false);
  };

  const getGenres = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMediaGenres(data.genres);
  };

  const getCast = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCast(data.cast);
  };

  const getTrailer = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    const ptResults = [];

    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].type === "Trailer") {
        ptResults.push(data.results[i].key);
      }
    }

    if (ptResults.length === 0) {
      setTrailer(data.results[0].key);
    } else {
      setTrailer(ptResults[0]);
    }
  };

  const getWallpapers = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setWallpapers(data.backdrops);
  };

  const [spaceBetween, setSpaceBetween] = useState([]);
  const [heightTrailer, setHeightTrailer] = useState([]);

  useEffect(() => {
      function handleResizez() {
        if (window.innerWidth <= 1920) {
          setSpaceBetween(-150);
          setHeightTrailer(500);
        }
        if (window.innerWidth <= 500) {
          setSpaceBetween(0);
          setHeightTrailer(300);
        }
      }
  
      handleResizez();
  
      window.addEventListener("resize", handleResizez);
  
      return () => {
        window.removeEventListener("resize", handleResizez);
      };
    }, []);

  const opts = {
    height: heightTrailer,
    width: "100%",
    playerVars: {},
  };

  const divRef = useRef();
  const wallPaperRef = useRef();

  function handleClick() {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }
  function handleClickPaper() {
    wallPaperRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const delay = 800;

    const mediaUrl = `${geralURL}${mediaType}/${id}?${apiKey}&language=pt-BR`;
    getMedia(mediaUrl);

    const providerUrl = `${geralURL}${mediaType}/${id}/watch/providers?${apiKey}`;
    getProvider(providerUrl);
    getGenres(mediaUrl);

    const castUrl = `${geralURL}${mediaType}/${id}/credits?${apiKey}&language=pt-BR`;
    getCast(castUrl);

    const trailerUrl = `${geralURL}${mediaType}/${id}/videos?${apiKey}&language=pt-BR&include_video_language=pt,en`;
    getTrailer(trailerUrl);

    const wallpaperUrl = `${geralURL}${mediaType}/${id}/images?${apiKey}`;
    getWallpapers(wallpaperUrl);

    setTimeout(() => {
      setLoadingGenres(false);
    }, delay);
  }, []);

  console.log(movie);

  return (
    <div className="media-page">
      {movie && (
        <>
          <div
            id="backdrop"
            style={{
              backgroundImage: ` linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0)),url(${
                backURL + movie.backdrop_path || movie.poster_path
              })`,
            }}
          ></div>

          <div className="media-conteiner">
            <div className="posterProvide">
              <img
                id="banner_details"
                src={imagesURL + movie.poster_path}
                alt={movie.title}
              />

              <div className="box-provider">
                {isLoading ? (
                  <p>...</p>
                ) : providers.length > 0 ? (
                  <ul className="providers">
                    {providers.map((provider, index) => (
                      <img
                        className="provider_logo"
                        key={index}
                        src={imagesURL + provider.logo_path}
                        alt={provider.provider_name}
                      />
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="media-conteiner-box">
              <h1 className="title-details">
                {movie.title || movie.name}
                <span className="date">
                  (
                  {mediaType === tmdbConfigs.mediaType.movie
                    ? movie.release_date.split("-")[0]
                    : movie.first_air_date.split("-")[0]}
                  )
                </span>
              </h1>

              <h3 className="tagline">{movie.tagline}</h3>

              <div className="info-details">
                <div className="porcent">
                  <ProgressCircle
                    className="progress"
                    percent={movie.vote_average * 10}
                  />
                </div>

                {loadingGenres ? (
                  <p></p>
                ) : (
                  <ul className="genres-full">
                    {mediaGenres.map((mediaGenre, index) => (
                      <div className="genres-border" key={index}>
                        <p className="genres">{mediaGenre.name}</p>
                      </div>
                    ))}
                  </ul>
                )}
              </div>

              <p>{movie.overview}</p>

              <div className="ver-trailer">
                <button onClick={handleClick}>
                  <ion-icon id="play" name="caret-forward"></ion-icon>Trailer
                </button>
                <button className="wallPaper" onClick={handleClickPaper}>
                  <ion-icon id="icon-wallpaper" name="image-outline"></ion-icon>
                  Plano de fundo
                </button>
              </div>

              <div className="cast-box">
                <div style={{ marginBottom: "10px" }}>
                  <h3>Elenco principal</h3>
                </div>

                <div>
                  <SwiperPeople 
                  className="people"
                  >
                    {isLoading ? (
                      <p>...</p>
                    ) : cast.length > 0 ? (
                      cast.slice(0, 20).map((cast, index) => (
                        <SwiperSlide key={index}>
                          <div
                            className="cast"
                            style={{
                              backgroundImage: `url(${
                                imagesURL + cast.profile_path
                              })`,
                            }}
                          >
                            <div className="cast-barra">
                              <p>{cast.name}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    ) : null}
                  </SwiperPeople>
                </div>
              </div>
            </div>
          </div>

          <div ref={divRef} className="trailer-extra-box">
            <div>
              <h2>Trailer</h2>
            </div>
            <div className="trailer-box">
              <div className="info-extras-box">
                <div className="trailers">
                  {loadingGenres ? (
                    <p></p>
                  ) : (
                    <div>
                      <YouTube videoId={trailer} opts={opts} />
                    </div>
                  )}
                </div>
                <div className="info-extras">
                  {mediaType == "movie" ? (
                    <div>
                      <InfoExtras movie={movie} />
                    </div>
                  ) : (
                    <InfoExtrasTv movie={movie} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="wallpapers">
            <div>
              <h2>Wallpapers</h2>
            </div>
            <Box
          sx={{
            width: "100%",
            "& .swiper-slide": {
              opacity: "0.5",
            },
            "& .swiper-slide-active": { opacity: 1 },
          }}
        >
            <Swiper
              className="paper-box"
              slidesPerView={1}
              modules={[Navigation, Pagination]}
              navigation={{ clickable: true }}
              pagination={{ clickable: true }}
              spaceBetween={spaceBetween}
              rewind={true}
            >
              {wallpapers.slice(0, 15).map((wallPaper, index) => (
                <SwiperSlide key={index}>
                  <div ref={wallPaperRef} className="paper">
                    <img src={backURL + wallPaper.file_path} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
//<YouTube videoId={trailer} opts={opts}/>
