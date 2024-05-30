import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Fragment } from "react";
const API = "eaf21c511d98e9df826254024c44dcce";

//Get the fetch later from the backend!
export const SideBar = ({ setCategoryName }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchingGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API}`
      );
      const data = await response.json();
      setGenres(data.genres);
    };
    fetchingGenres();
  }, []);

  return (
    <Fragment>
      <ul className="sideBar">
        {genres.map((genre) => (
          <Fragment key={genre.id}>
            <Link to={`/movies/${genre.id}`}>
              <button
                className="sideBarButton"
                onClick={() => setCategoryName(genre.name)}
              >
                {genre.name}
              </button>
            </Link>
          </Fragment>
        ))}
      </ul>
    </Fragment>
  );
};
