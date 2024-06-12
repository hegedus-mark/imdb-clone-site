/* eslint-disable react/prop-types */
import { Eye } from "../../assets/eye";
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
        <div className="poster">
          <button
            className={"ribbon-btn" + (inWatchList ? " in-watchlist" : "")}
            onClick={() => handleRibbonClick(detailedMovieData)}
          >
            {inWatchList ? <Eye /> : "+"}
          </button>
          <img
            onClick={posterClickHandler}
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
