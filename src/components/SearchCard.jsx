import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
const backURL = import.meta.env.VITE_BACK_IMG;
import "./style/MoviesGrid.css";
import tmdbConfigs from "../config/tmdb.configs";
import ProgressCircle from "./ProgressCircle";

const SearchCard = ({ movie }) => {
  return (
    <div className="movie-card" >

      <Link to={`/${tmdbConfigs.mediaType.movie}/${movie.id}`}>
        <img
          id="banner"
          src={imagesURL + movie.poster_path}
          alt={movie.title}
        />
        <h2 id="title">{movie.title || movie.name}</h2>
        <p>
        </p>
      </Link>
    </div>
  );
};

export default SearchCard;
