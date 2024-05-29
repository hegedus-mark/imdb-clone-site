import { useParams } from "react-router-dom";
import { useFetchData } from "../../Hooks";
import "./style.scss";

export const MoviePage = () => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    true,
    `/api/movie/${id}`,
    "GET"
  );

  return loading ? (
    <h1>Please wait, loading</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    data && (
      <div className="moviepage-main-container">
        <img
          className="backdrop-image"
          src={`${baseImageUrl}/original/${data.backdrop_path}`}
          alt="backdrop"
        />
        <div className="movie-detail-container">
          <div className="title-container">
            <h1 className="movie-title">{data.title}</h1>
            <p>{data.release_date.split("-")[0]}</p>
          </div>
          <div className="main-details">
            <img
              className="movie-poster"
              src={`${baseImageUrl}/w500/${data.poster_path}`}
              alt="Poster"
            />
            <div className="description">
              <p>{data.overview}</p>
            </div>
          </div>
          {data.genres.map((genre) => {
            return <button key={genre.id}>{genre.name}</button>;
          })}
        </div>
      </div>
    )
  );
};
