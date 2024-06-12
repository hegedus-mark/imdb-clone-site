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
  console.log(`Starting request to ${url} with method ${method}`);
  const startTime = performance.now();

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const connectTime = performance.now();
  console.log(`Connected to ${url} in ${connectTime - startTime}ms`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const endTime = performance.now();
  console.log(`Received response from ${url} in ${endTime - startTime}ms`);

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
    console.log("data received - watchlist", data);
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
