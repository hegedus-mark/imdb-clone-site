import { useEffect, useState } from "react";
import { useFetchData } from "../../Hooks";
import { Result } from "../Result/Result";
import "./style.scss";

export const Searchbar = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data, fetchData } = useFetchData();
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        fetchData(`/api/searchmovie/${search}`, "GET");
      }
    }, 300);
    return () => {
      console.log("removed counter");
      clearTimeout(delayDebounce);
    };
  }, [search]);

  const blurHandler = () => {
    console.log("Let's handle blur!");
    setTimeout(() => {
      setFocus(false);
    }, 200);
  };

  return (
    <div className="search-container">
      <div className="searchbar-main">
        <input
          onBlur={blurHandler}
          onFocus={() => setFocus(true)}
          placeholder="Search"
          onChange={(e) => setSearch(encodeURIComponent(e.target.value))}
          type="text"
          value={decodeURIComponent(search)}
        />
      </div>
      {search && !loading && !error && data && focus && (
        <div className="results-container">
          <div className="results">
            {data.results.map((movie) => {
              return (
                <Result key={movie.id} movie={movie} setSearch={setSearch} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
