import "./style.scss";
const baseImageUrl = "https://image.tmdb.org/t/p";

export const MovieCard = ({ detailedMovieData }) => {
  const watchListBtnHandler = () => {
    console.log("segg");
  };

  return (
    <div className="movie-card">
      <div className="poster">
        <button className="ribbon-btn" onClick={watchListBtnHandler}>
          +
        </button>
        <img
          className="poster-img"
          src={`${baseImageUrl}/w500/${detailedMovieData.poster_path}`}
          alt="poster"
        />
      </div>
      <div className="score">
        <p>100% SO BAD IT'S GOOD</p>
      </div>
      <div className="title">
        <h2>{detailedMovieData.title}</h2>
      </div>
    </div>
  );
};
