<<<<<<< HEAD
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
import tmdbConfigs from "../config/tmdb.configs";
import ProgressCircle from "./ProgressCircle";

import "./style/MoviesGrid.css";



const TvCard = ({series}) => {


  return (
    <div className="movie-card">

      <Link to={`/${tmdbConfigs.mediaType.tv}/${series.id}`}>

      <div id="banner" style={{ backgroundImage: `url(${imagesURL + series.poster_path})`,  }}></div>
        <div className="Nota">
        <ProgressCircle percent={series.vote_average * 10} />
      </div>
        <h2 id="title">{series.name}</h2>
        <p>
        </p>
      </Link>
    </div>
  );

};


export default TvCard;
=======
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
import tmdbConfigs from "../config/tmdb.configs";
import ProgressCircle from "./ProgressCircle";

import "./style/MoviesGrid.css";



const TvCard = ({series}) => {


  return (
    <div className="movie-card">

      <Link to={`/${tmdbConfigs.mediaType.tv}/${series.id}`}>

      <div id="banner" style={{ backgroundImage: `url(${imagesURL + series.poster_path})`,  }}></div>
        <div className="Nota">
        <ProgressCircle percent={series.vote_average * 10} />
      </div>
        <h2 id="title">{series.name}</h2>
        <p>
        </p>
      </Link>
    </div>
  );

};


export default TvCard;
>>>>>>> 437ce868e3fac8517dcd36f7361c6dd2f3200194
