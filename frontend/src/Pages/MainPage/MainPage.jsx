import "./style.scss";
import { Carousel } from "../../Components";
import { useFetchData } from "../../Hooks/";

export const MainPage = () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const { data, error, loading, fetchData } = useFetchData(
    true,
    "/api/movies/popular",
    options
  );

  return loading ? (
    <h1>Please wait Loading</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div className="popular-movies">
      <Carousel items={data.results} category={"Popular"} />
    </div>
  );
};
