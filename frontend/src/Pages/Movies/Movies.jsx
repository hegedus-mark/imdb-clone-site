const API = "eaf21c511d98e9df826254024c44dcce";
import { Carousel, SideBar } from "../../Components";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
export const Movies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchingPopMovies = async () => {
      const data = await fetch(
        ` https://api.themoviedb.org/3/movie/popular?api_key=${API}`
      );
      const response = await data.json();
      setData(response.results);
    };
    fetchingPopMovies();
  }, []);
  return (
    <div>
      <Carousel items={data} categoryName={"Popular Movies"} />
      <SideBar />
    </div>
  );
};
