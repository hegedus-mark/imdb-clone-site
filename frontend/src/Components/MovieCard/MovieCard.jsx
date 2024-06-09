import { useNavigate } from "react-router-dom";

import "./style.scss";

export const MovieCard = ({
  detailedMovieData,
  inWatchlist,
  watchlistHandler,
}) => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const navigate = useNavigate();

  const posterClickHandler = () => {
    navigate(`/movie/${detailedMovieData.id}`);
  };

  const handleRibbonClick = (movie) => {
    watchlistHandler(movie);
  };

  return (
    <div className="movie-card">
      <div className="poster">
        <button
          className="ribbon-btn"
          onClick={() => handleRibbonClick(detailedMovieData)}
        >
          {inWatchlist ? "-" : "+"}
        </button>
        <img
          onClick={posterClickHandler}
          className="poster-img"
          src={`${baseImageUrl}/w500/${detailedMovieData.poster_path}`}
          alt="poster"
        />
      </div>
      <div className="score">
        <p>100% SO BAD IT'S GOOD</p>
      </div>
      <div className="title">
        <h3>{detailedMovieData.title}</h3>
      </div>
    </div>
  );
};
