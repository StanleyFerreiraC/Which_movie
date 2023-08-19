import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
import tmdbConfigs from "../config/tmdb.configs";
import ProgressCircle from "./ProgressCircle";

import "./style/MoviesGrid.css";

const TvCard = ({ series }) => {
  return (
    <div className="movie-card" style={{marginBottom: "50px"}}>
      <Link to={`/${tmdbConfigs.mediaType.tv}/${series.id}`}>
        <div
          id="banner"
          style={{ backgroundImage: `url(${imagesURL + series.poster_path})` }}
        >
          <div className="card-info">
          <div>
            <ProgressCircle percent={series.vote_average * 10} />
          </div>    
          <div>
          <h2 id="title">{series.title || series.name}</h2>
          </div>
         
        </div>
        </div>
      </Link>
    </div>
  );
};

export default TvCard;
