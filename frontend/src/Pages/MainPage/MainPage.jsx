import "./style.scss";
import { Carousel } from "../../Components";
import { useFetchMovies } from "../../Hooks/";

const requests = [
  { category: "popular", url: "api/movies?category=popular" },
  { category: "nowPlaying", url: "api/movies?category=now_playing" },
];

export const MainPage = () => {
  const { data, loading, error } = useFetchMovies(requests);

  if (loading) return <h1>Please wait Loading</h1>;
  if (error) return <h1>{error.message}</h1>;

  console.log("movie_data, ", data);

  return (
    <div className="mainpage-container">
      <div className="popular-movies">
        <Carousel items={data.popular} category={"Popular"} />
      </div>
      <div className="nowPlaying-movies">
        <Carousel items={data.nowPlaying} category={"Now Playing"} />
      </div>
    </div>
  );
};


