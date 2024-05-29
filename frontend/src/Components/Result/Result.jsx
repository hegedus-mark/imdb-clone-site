import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../Hooks";
import "./style.scss";

export const Result = ({ movie, setSearch }) => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const navigate = useNavigate();
  const { data } = useFetchData(true, `/api/movie/${movie.id}`, "GET");

  const resultMovieClickHandler = (id) => {
    console.log("clicked", movie.id);
    navigate(`/movie/${id}`);
    setSearch("");
  };

  return (
    <div
      className="search-result"
      onClick={() => resultMovieClickHandler(movie.id)}
    >
      <img
        className="result-poster"
        src={`${baseImageUrl}/w500/${movie.poster_path}`}
        alt="poster"
      />
      <div className="result-descrip">
        <h4>
          {movie.title} ({movie.release_date.split("-")[0]})
        </h4>
        {data && <p>{data.tagline}</p>}
      </div>
    </div>
  );
};
