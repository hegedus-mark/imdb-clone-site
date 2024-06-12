/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAuth, useWatchlist, useToast, useFetchData } from "../../Hooks";
import { useEffect, useState } from "react";

export const useMovieCard = (detailedMovieData) => {
  const baseImageUrl = "https://image.tmdb.org/t/p";
  const navigate = useNavigate();
  const [rateAverage, setRateAverage] = useState("Not Rated Yet");
  const { addToWatchList, removeFromWatchList, watchList } = useWatchlist();
  const { isItLoggedIn } = useAuth();
  const { showWarningToast } = useToast();
  const {
    data: movieRating,
    loading,
    error,
    fetchData,
  } = useFetchData(true, `/api/rating/${detailedMovieData.id}`, "GET");

  const inWatchList = watchList.includes(detailedMovieData.id);
  const posterClickHandler = () => {
    navigate(`/movie/${detailedMovieData.id}`);
  };

  const handleRibbonClick = async (movie) => {
    if (!isItLoggedIn) {
      showWarningToast("You need to be logged in first!");
      navigate("/auth");
    }
    if (!inWatchList) {
      await addToWatchList(movie);
    } else {
      await removeFromWatchList(movie);
    }
  };

  const collectRatesForMovie = (movieRating, ratings) => {
    if (movieRating && movieRating.length > 0) {
      movieRating.forEach((rate) => {
        switch (rate.rating) {
          case 0:
            ratings.bad++;
            break;
          case 1:
            ratings.badgood++;
            break;
          case 2:
            ratings.meh++;
            break;
          case 3:
            ratings.worth++;
            break;
          case 4:
            ratings.great++;
            break;
        }
      });
    } else if (movieRating && movieRating.length === 1) {
      switch (movieRating.rating) {
        case 0:
          ratings.bad++;
          break;
        case 1:
          ratings.badgood++;
          break;
        case 2:
          ratings.meh++;
          break;
        case 3:
          ratings.worth++;
          break;
        case 4:
          ratings.great++;
          break;
      }
    }
  };

  const highestRatingOfAllRatings = (ratings) => {
    let maxValue = -Infinity;

    for (let [key, value] of Object.entries(ratings)) {
      if (value > maxValue) {
        maxValue = value;
        switch (key) {
          case "bad":
            setRateAverage("Actually bad");
            break;
          case "badgood":
            setRateAverage("So bad it's good");
            break;
          case "meh":
            setRateAverage("Meh, not worth it");
            break;
          case "worth":
            setRateAverage("Worth a watch");
            break;
          case "great":
            setRateAverage("It's actually great");
            break;
        }
      }
      if (maxValue < 1) {
        setRateAverage("No Rating Yet");
      }
    }
  };

  useEffect(() => {
    let ratings = {
      bad: 0,
      badgood: 0,
      meh: 0,
      worth: 0,
      great: 0,
    };

    collectRatesForMovie(movieRating, ratings);
    highestRatingOfAllRatings(ratings);
  }, [movieRating]);

  return {
    baseImageUrl,
    posterClickHandler,
    handleRibbonClick,
    inWatchList,
    rateAverage,
  };
};
