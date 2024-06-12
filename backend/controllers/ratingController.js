import { errorMiddleware } from "../middleware/errorMiddleware.js";
import Rating from "../models/Rating.js";
import User from "../models/User.js";

export const getRatings = (req, res) => {
  Rating.find()
    .then((ratings) => res.json(ratings))
    .catch((err) => errorMiddleware(err, res));
};

export const createRating = (req, res) => {
  const rating = req.body;
  console.log(rating);
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
  const newRating = req.body;
  console.log(newRating);

  Rating.findOneAndUpdate(
    { movieId: newRating.movieId, userId: newRating.userId },
    { rating: newRating.rating }
  )
    .then((updatedData) => {
      if (!updatedData) {
        return res.status(404).send({ message: "Rating not found" });
      }
      res.json({ message: "Rating was updated", updatedData });
    })
    .catch((err) => errorMiddleware(err, res));
};

export const deleteRating = (req, res) => {
  const ID = req.params.ratingId;
  console.log(ID);
  Rating.findByIdAndDelete(ID)
    .then((response) => res.json({ message: "Rating was removed" }))
    .catch((err) => errorMiddleware(err, res));
};
