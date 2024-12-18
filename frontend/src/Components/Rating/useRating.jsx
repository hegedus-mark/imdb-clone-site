import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useFetchData } from "../../Hooks";

export const useRating = (movieId) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userRate, setUserRate] = useState(null);
  const [ratingId, setRatingId] = useState(null);
  const { loading, data, error, fetchData } = useFetchData(
    true,
    "/api/rating",
    "GET"
  );

  useEffect(() => {
    if (user) {
      if (data && data.length > 1) {
        data.forEach((rating) => {
          if (
            rating.userId === user.userId &&
            rating.movieId.toString() === movieId.toString()
          ) {
            setUserRate(rating.rating);
            setRatingId(rating._id);
          }
        });
      } else if (
        data &&
        data.length === 1 &&
        data[0].movieId.toString() === movieId.toString()
      ) {
        if (data[0].userId === user.userId) {
          setUserRate(data[0].rating);
          setRatingId(data[0]._id);
        }
      }
    }
  }, [data, error]);

  useEffect(() => {
    if (!ratingId) {
      fetchData("/api/rating", "GET");
    }
  }, [ratingId]);

  const clickHandler = async (score) => {
    if (user === null) {
      navigate("/auth");
      return;
    }
    if (userRate === null) {
      setUserRate(score);
      fetchData(
        "/api/rating",
        "POST",
        JSON.stringify({
          userId: user.userId,
          movieId: movieId,
          rating: score,
        })
      );
    } else if (score === userRate) {
      setUserRate(null);
      fetchData(`/api/rating/${ratingId}`, "DELETE");
    } else {
      setUserRate(score);
      fetchData(
        `/api/rating/`,
        "PUT",
        JSON.stringify({
          userId: user.userId,
          movieId: movieId,
          rating: score,
        })
      );
    }
  };

  return { clickHandler, userRate, ratingId, loading };
};
