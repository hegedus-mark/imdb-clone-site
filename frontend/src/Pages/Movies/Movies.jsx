import { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  SideBar,
  MoviesContainer,
  Pagination,
  Loading,
} from "../../Components";
import { useFetchMovies } from "../../Hooks";

import "./style.scss";
import { fetchMovies } from "../../../../backend/utils/fetchMovies";

export const Movies = () => {
  const [categoryName, setCategoryName] = useState("All the");
  const { genre } = useParams();
  const [shownPage, setShownPage] = useState(1);
  const [url, setUrl] = useState(
    `/api/movies?category=popular&page=${shownPage}`
  );
  const { movies, loading, error, totalPages } = useFetchMovies(url);

  useEffect(() => {
    if (!genre) {
      setUrl(`/api/movies?category=popular&page=${shownPage}`);
    } else {
      setUrl(`/api/genres/${genre}?page=${shownPage}`);
    }
  }, [shownPage, genre]);

  useEffect(() => {
    fetchMovies(url);
  }, [url]);

  console.log("genre", genre);
  console.log("url", url);

  if (loading) return <Loading />;
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
            <Pagination
              totalPages={totalPages}
              currentPage={shownPage}
              onPageChange={setShownPage}
            />
          </div>
          <SideBar setCategoryName={setCategoryName} />
        </Fragment>
      )}
    </div>
  );
};
