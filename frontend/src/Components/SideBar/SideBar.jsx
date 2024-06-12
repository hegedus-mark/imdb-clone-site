import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Fragment } from "react";

export const SideBar = ({ setCategoryName }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchingGenres = async () => {
      const response = await fetch("/api/genres");
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
                className="scalingButton"
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
