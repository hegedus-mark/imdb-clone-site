import { useContext } from "react";
import { WatchlistContext } from "../Components/contexts/WatchlistContext/WatchlistContext";


export const useWatchlist = () => {
  return useContext(WatchlistContext);
}