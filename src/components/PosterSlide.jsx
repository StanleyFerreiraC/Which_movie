
import { Link } from "react-router-dom";

import ProgressCircle from "./ProgressCircle";

const imagesURL = import.meta.env.VITE_IMG;
const apiKey = import.meta.env.VITE_API_KEY;
const backURL = import.meta.env.VITE_BACK_IMG;
import "./style/MoviesGrid.css";
import "./style/Backdrop.css";




const PosterSlide = ({movie}) => {

  const maxLength = 100;
  let viewLimit = movie.overview.slice(0, maxLength);
  
    if (movie.overview.length > maxLength) {
      const lastSpaceIndex = movie.overview.lastIndexOf(' ', maxLength);
      viewLimit = movie.overview.slice(0, lastSpaceIndex) + '...';
    }



  return (
    <div className="poster-box">
    <div className="poster-card" style={{
        backgroundImage: `
        linear-gradient(to right, rgba(0,0,0,1) -100%, rgba(0,0,0,0)),
        url(${backURL + movie.backdrop_path || movie.poster_path})`,
      }}>

      <Link className="info-poster" to={`/${movie.media_type}/${movie.id}`} >
        <div className="info-details-poster">
        <h2 id="poster-title">{movie.title || movie.name}</h2>


        <div className="infoPoster">
        <div className="voteGenres">
        < ProgressCircle className="progress" percent={movie.vote_average * 10}/>
        <div className="trailer">
        <ion-icon id="iconTrailer" name="caret-forward-outline"></ion-icon>
        </div>
        </div>
        <p>{viewLimit}</p>
        </div>
        </div>
        <p>
        </p>
      </Link>
    </div>
    </div>
  );
};

export default PosterSlide;