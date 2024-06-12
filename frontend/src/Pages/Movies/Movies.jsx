import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { SideBar, MoviesContainer, Pagination } from "../../Components";
import { useFetchMovies } from "../../Hooks";

import "./style.scss";

export const Movies = () => {
  const [categoryName, setCategoryName] = useState("Popular");
  const genre = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const url = genre.genre
    ? `/api/genres/${genre.genre}`
    : "/api/movies?category=popular";
  const { movies, loading, error, totalPages } = useFetchMovies(url);

  if (loading) return <h1>Please wait Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="moviespage-container">
      {loading ? (
        <p>loaing</p>
      ) : (
        <Fragment>
          <div>
            <h1 className="category-name">
              {(categoryName + " " + "Movies").toUpperCase()}{" "}
            </h1>
            <MoviesContainer movies={movies} />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
          <SideBar setCategoryName={setCategoryName} />
        </Fragment>
      )}
    </div>
  );
};
