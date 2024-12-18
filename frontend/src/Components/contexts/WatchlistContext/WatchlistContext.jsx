import { createContext, useEffect, useState } from "react";
import { useAuth } from "../../../Hooks";

export const WatchlistContext = createContext({
  watchList: [],
  addToWatchList: async () => null,
  removeFromWatchList: async () => null,
  loading: true,
  fetchWatchList: async () => null,
});

const fetchProtectedData = async (url, method, token) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();

  return data;
};

export const WatchlistProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [populatedWatchList, setPopulatedWatchList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();
  const fetchWatchList = async (page = 1) => {
    setLoading(true);
    const data = await fetchProtectedData(
      `/api/user/${user.userId}/watchlist?page=${page}`,
      "GET",
      token
    );
    setWatchList(data.ids);
    setPopulatedWatchList(data.results);
    setTotalPages(data.total_pages);

    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    try {
      fetchWatchList(page);
    } catch (error) {
      console.error(error);
    }
  }, [user, token, page]);

  const addToWatchList = async (movie) => {
    setLoading(true);
    try {
      const id = movie.id ? movie.id : movie.tmdb_id;
      await fetchProtectedData(
        `/api/user/${user.userId}/watchlist/${id}`,
        "POST",
        token
      );
      await fetchWatchList(page);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWatchList = async (movie) => {
    setLoading(true);
    try {
      const id = movie.id ? movie.id : movie.tmdb_id;
      await fetchProtectedData(
        `/api/user/${user.userId}/watchlist/${id}`,
        "DELETE",
        token
      );
      await fetchWatchList(page);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    watchList,
    populatedWatchList,
    addToWatchList,
    removeFromWatchList,
    fetchWatchList,
    totalPages,
    page,
    loading,
    setPage,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
