import "./style.scss";
import { Carousel } from "../../Components";
import { useFetchData } from "../../Hooks/";

export const MainPage = () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const { data, error, loading } = useFetchData(
    true,
    "/api/movies/popular",
    options
  );
  const {
    data: playData,
    error: playError,
    loading: playLoading,
  } = useFetchData(true, "/api/movies/nowplaying", options);

  return loading && playLoading ? (
    <h1>Please wait Loading</h1>
  ) : error && playError ? (
    <h1>{playError ? playError : error}</h1>
  ) : (
    data &&
    playData && (
      <>
        {console.log("yaaaaaaay", data, playData)}
        <div className="popular-movies">
          <Carousel items={data.results} category={"Popular"} />
        </div>
        <div className="nowPlaying-movies">
          <Carousel items={playData.results} category={"Now Playing"} />
        </div>
      </>
    )
  );
};
