import { useNavigate } from "react-router-dom";
import { Eye } from "../../assets/eye";
import { useWatchlist, useAuth, useToast } from "../../Hooks";
import "./style.scss";

export const MovieCard = ({ detailedMovieData }) => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const navigate = useNavigate();
  const { addToWatchList, removeFromWatchList, watchList } = useWatchlist();
  const { isItLoggedIn } = useAuth();
  const { showWarningToast, showInfoToast } = useToast();

  const inWatchList =
    watchList.includes(detailedMovieData.id) ||
    watchList.includes(detailedMovieData.tmdb_id);

  const posterClickHandler = () => {
    const id = detailedMovieData.id
      ? detailedMovieData.id
      : detailedMovieData.tmdb_id;
    navigate(`/movie/${id}`);
  };

  const handleRibbonClick = async (movie) => {
    if (!isItLoggedIn) {
      showWarningToast("You need to be logged in first!");
      navigate("/auth");
    }
    if (!inWatchList) {
      await addToWatchList(movie);
      showInfoToast(`${movie.title} added to watchlist`);
    } else {
      await removeFromWatchList(movie);
      showInfoToast(`${movie.title} removed from watchlist`);
    }
  };

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
        <div className="poster-footer">
          <div className="score">
            <p>100% SO BAD IT'S GOOD</p>
          </div>
          <div className="title">
            <h3>{detailedMovieData.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
