import { useState, useEffect, Fragment } from "react";
import { Carousel, MovieCard, SideBar } from "../../Components";
import { useParams } from "react-router-dom";

import "./style.scss";

export const Movies = () => {
  const [categoryName, setCategoryName] = useState("Popular ");
  const genre = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchingMoviesByGenre = async () => {
      let url = "/api/movies?category=popular";
      if (genre.genre) {
        url = `/api/genres/${genre.genre}`;
      }
      const data = await fetch(`${url}`);
      const response = await data.json();
      setData(response.results);
      setLoading(false);
    };
    fetchingMoviesByGenre();
  }, [genre]);

  return (
    <div className="moviespage-container">
      {loading ? (
        <p>loaing</p>
      ) : (
        <Fragment>
          <div className="movies-container">
            <h1>{categoryName}</h1>
            {data.map((item, index) => {
              return (
                <div key={index} className="movie-container">
                  <MovieCard detailedMovieData={item} />
                </div>
              );
            })}
          </div>
          <SideBar setCategoryName={setCategoryName} />
        </Fragment>
      )}
    </div>
  );
};
