import "./style.scss";
import { Carousel, Loading } from "../../Components";
import { useFetchMain } from "../../Hooks/";

const requests = [
  { category: "popular", url: "api/movies?category=popular" },
  { category: "nowPlaying", url: "api/movies?category=now_playing" },
];

export const MainPage = () => {
  const { data, loading, error } = useFetchMain(requests);

  if (loading) return <Loading />;
  if (error) return <h1>{error.message}</h1>;

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
