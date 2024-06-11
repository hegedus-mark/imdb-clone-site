import React from "react";
import { MovieCard } from "../MovieCard/MovieCard";

export const MoviesContainer = ({ movies }) => {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} detailedMovieData={movie} />
      ))}
    </div>
  );
};