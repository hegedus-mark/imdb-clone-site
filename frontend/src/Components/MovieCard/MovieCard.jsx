import "./style.scss";

export const MovieCard = ({ detailedMovieData }) => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  return (
    <div className="movie-card">
      <h2>{detailedMovieData.original_title}</h2>
      <div className="movie-details">
        <div className="movie-image-container">
          <img
            src={`${baseImageUrl}/w500/${detailedMovieData.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="description">
          <p>{detailedMovieData.overview}</p>
        </div>
      </div>
    </div>
  );
};
