import { useWatchlist } from "../../Hooks";

export const MyList = () => {
  const { watchList, loading } = useWatchlist();

  console.log("watchlist!", watchList);
  console.log("loading!", loading)
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div>MyList</div>
      <div>{watchList.map((movie) => movie.title)}</div>
    </div>
  );
};
