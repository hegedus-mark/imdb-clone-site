import { createContext, useEffect, useState } from "react";
import { useAuth } from "../../../Hooks";

export const WatchlistContext = createContext({
  watchList: [],
  addToWatchList: () => null,
  removeFromWatchList: () => null,
  loading: true,
  fetchWatchList: () => null,
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
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchWatchList = async () => {
      const data = await fetchProtectedData(
        `/api/user/${user.userId}/watchlist`,
        "GET",
        token
      );
      setWatchList(data.results);
      setLoading(false);
      console.log("data received - watchlist", data);
    };
    try {
      fetchWatchList();
    } catch (error) {
      console.error(error);
    }
  }, [user, token]);


  const addToWatchList = async (movie) => {
    try {
      await fetchProtectedData(
        `/api/user/${user.id}/watchlist/${movie.id}`,
        "POST",
        token
      );
      setWatchList([...watchList, movie]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWatchList = async (movie) => {
    try {
      await fetchProtectedData(
        `/api/user/${user.id}/watchlist/${movie.id}`,
        "POST",
        token
      );
      setWatchList(watchList.filter((m) => m.id !== movie.id));
    } catch (error) {
      console.error(error);
    }
  };

  const value = { watchList, addToWatchList, removeFromWatchList, loading };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
