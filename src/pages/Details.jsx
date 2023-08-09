import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
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
  const [mediaGenres, setMediaGenres] =useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [error, setError] = useState(false);


  const getMedia = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMedia(data);
  };

  const getProvider = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.BR && data.results.BR.flatrate && data.results.BR.flatrate.length > 0) {
        setProviders(data.results.BR.flatrate);
      } else {
        setProviders([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Erro na chamada da API:', error);
      setError(true);
      setIsLoading(false);
    }
  };

  const getGenres = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMediaGenres(data.genres);
  };

  useEffect(() => {

    const delay = 800;

    const mediaUrl = `${geralURL}${mediaType}/${id}?${apiKey}&language=pt-BR`;
    getMedia(mediaUrl);

    const providerUrl = `${geralURL}${mediaType}/${id}/watch/providers?${apiKey}`;
    getProvider(providerUrl);
    getGenres(mediaUrl)

    setTimeout(() => {
      setLoadingGenres(false);

    }, delay);
    
  }, []);

  console.log(movie);

  return (
    <div className="media-page">
      {movie && (
        <>
          <div id="backdrop"
            style={{
              backgroundImage: ` linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)),url(${backURL + movie.backdrop_path || movie.poster_path})`,
            }}
          ></div>

          <div className="media-conteiner">
          <div>
            <img
              id="banner_details"
              src={imagesURL + movie.poster_path}
              alt={movie.title}
            />
          </div>

          <div className="media-conteiner-box">
            <h2 className="title-details">{movie.title || movie.name} </h2>
            <p className="tagline">{movie.tagline}</p>
            
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

            <div className="info description">
              <p>{movie.overview}</p>
            </div>
            <div className="box-provider">

            {isLoading ? (
  <p>...</p>
) : error ? (
  <p></p>
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
          </div>
        </>
      )}
    </div>
  );
};

//<ProgressCircle percent={movie.vote_average.toFixed(1) * 10}/>
//<p className="rele">{movie.release_date.split("-")[0]}</p>
//<ul>{movie.map(( index) => (<p key={index}>{movie.genres}</p> ))}</ul>

export default Details;
