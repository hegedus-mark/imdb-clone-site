/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import "./style.scss";
import { useRating } from "./useRating";

export const Rating = ({ movieId }) => {
  const { clickHandler, userRate, ratingId, loading } = useRating(movieId);

  return (
    <div className="rating-container">
      {console.log(userRate, ratingId, loading)}
      <button
        onClick={() => clickHandler(0)}
        className={userRate === 0 && "active-rate-btn"}
      >
        Actually bad
      </button>
      <button
        onClick={() => clickHandler(1)}
        className={userRate === 1 && "active-rate-btn"}
      >
        So bad it's good
      </button>
      <button
        onClick={() => clickHandler(2)}
        className={userRate === 2 && "active-rate-btn"}
      >
        Meh, not worth it
      </button>
      <button
        onClick={() => clickHandler(3)}
        className={userRate === 3 && "active-rate-btn"}
      >
        Worth a watch
      </button>
      <button
        onClick={() => clickHandler(4)}
        className={userRate === 4 && "active-rate-btn"}
      >
        It's actually great
      </button>
    </div>
  );
};
