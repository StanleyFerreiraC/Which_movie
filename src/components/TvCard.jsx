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

        <img id="banner" src={imagesURL + series.poster_path} alt={series.title} />
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
