import { response } from "express";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import Rating from "../models/Rating.js";

export const getRatings = (req, res) => {
  Rating.find()
    .then((ratings) => res.json(ratings))
    .catch((err) => errorMiddleware(err, res));
};

export const createRating = (req, res) => {
  const rating = req.body;
  Rating.create(rating)
    .then((rating) => {
      rating.save();
      res.json({ message: "Rating was saved" });
    })
    .catch((err) => errorMiddleware(err, res));
};

export const getByUserId = (req, res, next) => {
  const ID = req.params.userId;
  Rating.find({ userId: ID })
    .then((rating) => {
      rating.length === 0 ? next() : res.json(rating);
    })
    .catch((err) => errorMiddleware(err, res));
};

export const getByMovieId = (req, res) => {
  const ID = req.params.movieId;
  Rating.find({ movieId: ID })
    .then((rating) => res.json(rating))
    .catch((err) => errorMiddleware(err, res));
};

export const changeRating = (req, res) => {
  const ID = req.params.ratingId;
  console.log("rateId");
  const newRating = req.body;
  Rating.findById(ID)
    .then((data) => {
      data.rating = newRating.rating;
      data.save();
      res.json({ message: "Rating was changed" });
    })
    .catch((err) => errorMiddleware(err, res));
};
