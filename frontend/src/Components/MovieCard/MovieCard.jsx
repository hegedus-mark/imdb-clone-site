/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import "./style.scss";
import { useMovieCard } from "./useMovieCard";

export const MovieCard = ({ detailedMovieData }) => {
  const {
    baseImageUrl,
    posterClickHandler,
    handleRibbonClick,
    inWatchList,
    rateAverage,
  } = useMovieCard(detailedMovieData);

  return (
    <div className="movie-card">
      <div className="movie-card-inner">
        <div className="poster" onClick={posterClickHandler}>
          <button
            className="ribbon-btn"
            onClick={() => handleRibbonClick(detailedMovieData)}
          >
            {inWatchList ? "-" : "+"}
          </button>
          <img
            className="poster-img"
            src={`${baseImageUrl}/w500/${detailedMovieData.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="poster-footer" onClick={posterClickHandler}>
          <div className="score">
            <p>{rateAverage}</p>
          </div>
          <div className="title">
            <h3>{detailedMovieData.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
