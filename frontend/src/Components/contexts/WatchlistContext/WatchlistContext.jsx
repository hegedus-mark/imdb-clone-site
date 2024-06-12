import { createContext, useEffect, useState } from "react";
import { useAuth } from "../../../Hooks";

export const WatchlistContext = createContext({
  watchList: [],
  addToWatchList: async () => null,
  removeFromWatchList: async () => null,
  loading: true,
  fetchWatchList: async () => null,
});

//I was too lazy to create a reusable refresh token function, so this will just reditect us to the profilePage if the status is 401
//Which will handle the refresh token logic
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

  if (response.status === 401) {
    return "401";
  }
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
      if (data === "401") {
        //here is where I redirect the user to profile, to avoid writing complex functions to handle refresh tokens
        //I was lazy
        return (window.location.href = "/auth");
      }
      setWatchList(data.results.map((m) => m.tmdb_id));

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
    setLoading(true);
    try {
      await fetchProtectedData(
        `/api/user/${user.userId}/watchlist/${movie.id}`,
        "POST",
        token
      );
      setWatchList([...watchList, movie.id]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWatchList = async (movie) => {
    setLoading(true);
    try {
      await fetchProtectedData(
        `/api/user/${user.userId}/watchlist/${movie.id}`,
        "DELETE",
        token
      );
      setWatchList(watchList.filter((m) => m !== movie.id));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    watchList,
    addToWatchList,
    removeFromWatchList,
    loading,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
