import { MovieCard } from "../MovieCard/MovieCard";

import "./style.scss";

export const MoviesContainer = ({ movies}) => {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} detailedMovieData={movie} />
      ))}
    </div>
  );
};
