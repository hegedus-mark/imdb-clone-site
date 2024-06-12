import { useWatchlist } from "../../Hooks";
import { Loading, MoviesContainer, Pagination } from "../../Components";

import "./style.scss";

export const MyList = () => {
  const { populatedWatchList, loading, error, totalPages, page, setPage } =
    useWatchlist();

  if (loading) return <Loading />;

  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="watchlist-container">
      <div>
        <h1 className="category-name">My List</h1>
        <MoviesContainer movies={populatedWatchList} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};
