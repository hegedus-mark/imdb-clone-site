import { useEffect, useState } from "react";
import { useWatchlist } from "./useWatchlist";

const getWatchListStatus = (movie, watchList) => {
  return watchList.some((item) => item.tmdb_id === movie.id);
};

/**
 * Fetches data from multiple requests and updates the state with the results.
 *
 * @param {Array} requests - An array of objects containing the URL and category for each request.
 *
 * Each object should have a 'url' and 'category' property.
 *
 * For example:
 *   - { url: 'https://api.example.com/movies', category: 'movies' }
 * @return {Object} An object with the following properties:
 *   - data: An object containing the fetched data for each request.
 *   - loading: A boolean indicating whether the data is currently being fetched.
 *   - error: An error object if an error occurred during the fetch.
 */
export const useFetchMovies = (requests) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { watchList } = useWatchlist();

  const fetchData = async (request) => {
    setLoading(true);
    try {
      const response = await fetch(request.url);
      const jsonData = await response.json();
      const movies = jsonData.results.map((movie) => ({
        ...movie,
        isInWatchList: getWatchListStatus(movie, watchList),
      }));
      console.log("movies", movies);
      setData((prevData) => ({ ...prevData, [request.category]: movies }));
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    Promise.all(requests.map((request) => fetchData(request)))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [requests]);

  return { data, loading, error };
};
