import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tmdbConfigs from "../config/tmdb.configs";

import ProgressCircle from "./ProgressCircle";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
const backURL = import.meta.env.VITE_BACK_IMG;
import "./style/MoviesGrid.css";
import "./style/Backdrop.css";




const PosterSlide = ({movie}) => {


  const maxLength = 150;
  let viewLimit = movie.overview.slice(0, maxLength);
  
    if (movie.overview.length > maxLength) {
      const lastSpaceIndex = movie.overview.lastIndexOf(' ', maxLength);
      viewLimit = movie.overview.slice(0, lastSpaceIndex) + '...';
    }

    //console.log(movie.id);


  return (
    <div className="poster-box">
    <div className="poster-card" style={{
        backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,1) -100%, rgba(0,0,0,0)),
        url(${backURL + movie.backdrop_path || movie.poster_path})`,
      }}>

      <Link className="info-poster" to={`/${tmdbConfigs.mediaType.movie}/${movie.id}`} >
        <div className="info-details-poster">
        <h2 id="poster-title">{movie.title || movie.name}</h2>
        <div className="voteGenres">
        < ProgressCircle className="progress" percent={movie.vote_average * 10}/>
        </div>
        <p>{viewLimit}</p>
        </div>
        <p>
        </p>
      </Link>
    </div>
    </div>
  );
};

export default PosterSlide;