import { useState, useEffect } from "react";

export const useFetchMovies = (url) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setMovies(data.results);
      data.total_pages && setTotalPages(data.total_pages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(url);
  }, [url]);

  return { movies, loading, error, totalPages, fetchMovies };
};
