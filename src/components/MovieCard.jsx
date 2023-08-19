import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
const backURL = import.meta.env.VITE_BACK_IMG;
import tmdbConfigs from "../config/tmdb.configs";
import ProgressCircle from "./ProgressCircle";

import "./style/MoviesGrid.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/${tmdbConfigs.mediaType.movie}/${movie.id}`}>
        <div
          id="banner"
          style={{ backgroundImage: `url(${imagesURL + movie.poster_path})` }}
        >
          <div className="card-info">
          <div>
            <ProgressCircle percent={movie.vote_average * 10} />
          </div>    
          <div>
          <h2 id="title">{movie.title || movie.name}</h2>
          </div>
         
        </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
