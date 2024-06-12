import { useWatchlist } from "../../Hooks";
import { Loading } from "../../Components";

export const MyList = () => {
  const { watchList, loading } = useWatchlist();

  console.log("watchlist!", watchList);
  if (loading) return <Loading />;

  return (
    <div>
      <div>MyList</div>
      <div>{watchList.map((movie) => movie.title)}</div>
    </div>
  );
};
