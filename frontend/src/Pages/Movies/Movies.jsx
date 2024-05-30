import { useState, useEffect, Fragment } from "react";
import { Carousel, SideBar } from "../../Components";
import { useParams } from "react-router-dom";

export const Movies = () => {
  const [categoryName, setCategoryName] = useState("Popular ");
  const genre = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchingMoviesByGenre = async () => {
      let url = "/api/movies/popular";
      if (genre.genre) {
        url = `/api/movies/${genre.genre}`;
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
          <div>
            <h1>{categoryName}</h1>
            {data.map((item, index) => {
              console.log(item);
              return <p key={index}>{item.title}</p>;
            })}
          </div>
          <SideBar setCategoryName={setCategoryName} />
        </Fragment>
      )}
    </div>
  );
};
