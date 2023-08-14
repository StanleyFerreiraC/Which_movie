import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from 'swiper/modules';
import YouTube from 'react-youtube';
import { FaStar } from "react-icons/fa";

import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";
import tmdbConfigs from "../config/tmdb.configs";
import uiConfigs from "../config/image.Configs";
import Home from "./Home";

import "../components/style/Details.css";
import ProgressCircle from "../components/ProgressCircle";



const geralURL = import.meta.env.VITE_API_GERAL;
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imagesURL = import.meta.env.VITE_IMG;
const backURL = import.meta.env.VITE_BACK_IMG;

const Details = () => {
  const { mediaType, id } = useParams();
  const [movie, setMedia] = useState();
  const [providers, setProviders] = useState();
  const [trailer, setTrailer] = useState([])
  const [mediaGenres, setMediaGenres] = useState();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [showVideo, setShowVideo] = useState(false);


  const getMedia = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMedia(data);
  };

  const getProvider = async (url) => {
        const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.BR && data.results.BR.flatrate && data.results.BR.flatrate.length > 0) {
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

      if (data.results[i].type === 'Trailer') {

          ptResults.push(data.results[i].key);
      }
  }

  

  if (ptResults.length === 0) {

    setTrailer(data.results[0].key);
} else {

  setTrailer(ptResults[0]);
}


  };

  const opts = {
    height: '300',
    width: '500',
    playerVars: {

      autoplay: 1,

    },
  };


  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {

    const delay = 800;

    const mediaUrl = `${geralURL}${mediaType}/${id}?${apiKey}&language=pt-BR`;
    getMedia(mediaUrl);

    const providerUrl = `${geralURL}${mediaType}/${id}/watch/providers?${apiKey}`;
    getProvider(providerUrl);
    getGenres(mediaUrl)

    const castUrl = `${geralURL}${mediaType}/${id}/credits?${apiKey}&language=pt-BR`;
    getCast(castUrl)

    const trailerUrl = `${geralURL}${mediaType}/${id}/videos?${apiKey}&language=pt-BR&include_video_language=pt,en`;
    getTrailer(trailerUrl)

    setTimeout(() => {
      setLoadingGenres(false);
    }, delay);
    
  }, []);

 // console.log(cast);

  return (
    <div className="media-page">
      {movie && (
        <>
          <div id="backdrop"
            style={{
              backgroundImage: ` linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0)),url(${backURL + movie.backdrop_path || movie.poster_path})`,
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
    <ul className="providers" >
    {providers.map((provider, index) => (
      <img className="provider_logo"
       key={index}
       src={imagesURL + provider.logo_path } 
       alt={provider.provider_name}/>
    ))}
  </ul>
      ) : null}

    </div>
          </div>

          <div className="media-conteiner-box">

            <h1 className="title-details">{movie.title || movie.name} 
            <span className="date">({mediaType === tmdbConfigs.mediaType.movie ? (movie.release_date.split("-")[0]) : movie.first_air_date.split("-")[0]})</span>
            </h1>
            
            <h3>{movie.tagline}</h3>
            
            <div className="info-details">
              
              <div className="porcent">
            <ProgressCircle className="progress" percent={movie.vote_average * 10}/>
            </div>
            
            {loadingGenres ? (
        <p></p>
      ) : (
            <ul className="genres-full">
              {mediaGenres.map((mediaGenre, index) => (
                <div className="genres-border" key={index}>
              <p className="genres">
              {mediaGenre.name}
              </p>
              </div>
              ))}
              </ul>
            )}
      
            </div>

              <p>{movie.overview}</p>

            <div className="cast-box">

            <div style={{marginBottom: "10px",}}>
            <h3>Elenco principal</h3>
            </div>

<Swiper
slidesPerView={6.5} 
>
            {isLoading ? (
  <p>...</p>
) : 
      cast.length > 0 ? (
    (cast.slice(0,20)).map((cast, index) => (
      <SwiperSlide key={index}>
       <div className="cast" style={{
              backgroundImage: `url(${imagesURL + cast.profile_path})`,
            }}>
              <div className="cast-barra">
                <p>{cast.name}</p>
              </div>
            </div>
       </SwiperSlide>
    ))
      ) : null}
</Swiper>

    </div>
          </div>
          </div>
        </>
      )}


    </div>
    
  );
};

//<YouTube videoId={trailer} opts={opts}/>
//<ProgressCircle percent={movie.vote_average.toFixed(1) * 10}/>
//<p className="rele">{movie.release_date.split("-")[0]}</p>
//<ul>{movie.map(( index) => (<p key={index}>{movie.genres}</p> ))}</ul>

export default Details;
