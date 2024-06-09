import { useWatchlist } from "../../Hooks";

export const MyList = () => {
  const { watchList, loading } = useWatchlist();

  console.log("watchlist!", watchList);
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>MyList</div>
      <div>{watchList.map((movie) => movie.title)}</div>
    </div>
  );
};
