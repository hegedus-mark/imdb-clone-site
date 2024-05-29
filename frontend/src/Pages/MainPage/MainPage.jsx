import "./style.scss";
import { MovieCard } from "../../Components";
import { useFetchData } from "../../Hooks/";

export const MainPage = () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const { data, error, loading, fetchData } = useFetchData(
    true,
    "/api/movie/222",
    options
  );

  return loading ? (
    <h1>Please wait Loading</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <MovieCard detailedMovieData={data} />
  );
};
