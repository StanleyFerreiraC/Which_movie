import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
const backURL = import.meta.env.VITE_BACK_IMG;
import "./style/MoviesGrid.css";
import tmdbConfigs from "../config/tmdb.configs";
import ProgressCircle from "./ProgressCircle";

const SearchTvCard = ({ series }) => {
  return (
    <div className="movie-card" >

      <Link to={`/${tmdbConfigs.mediaType.tv}/${series.id}`}>
        <img
          id="banner"
          src={imagesURL + series.poster_path}
          alt={series.title}
        />
        <h2 id="title">{series.name}</h2>
        <p>
        </p>
      </Link>
    </div>
  );
};

export default SearchTvCard;
