import "./style.scss";
const baseImageUrl = "https://image.tmdb.org/t/p";

export const MovieCard = ({ detailedMovieData }) => {
  return (
    <div className="movie-modal">
      <h2>{detailedMovieData.original_title}</h2>
      <div className="movie-details">
        <div className="movie-image-container">
          <img
            src={`${baseImageUrl}/w500/${detailedMovieData.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="description">
          <p>{detailedMovieData.tagline}</p>
        </div>
      </div>
      <div className="score">
        <button>Actually Bad</button>
        <button>So Bad It Is Good</button>
        <button>Not Worth It</button>
        <button>Actually Great!</button>
      </div>
      <div className="tags"></div>
    </div>
  );
};
