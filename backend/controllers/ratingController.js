import { asyncHandler } from '../middleware/asyncHandler.js';
import { AppError } from '../errors/AppError.js';
import Rating from "../models/Rating.js";

export const getRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find();
  res.json(ratings);
});

export const createRating = asyncHandler(async (req, res) => {
  const { userId, movieId, rating } = req.body;

  if (!userId || !movieId || rating === undefined) {
    throw new AppError('Missing required fields', 400);
  }

  if (rating < 0 || rating > 10) {
    throw new AppError('Rating must be between 0 and 10', 400);
  }

  // Check if rating already exists
  const existingRating = await Rating.findOne({ userId, movieId });
  if (existingRating) {
    throw new AppError('Rating already exists for this movie', 400);
  }

  const newRating = await Rating.create({ userId, movieId, rating });
  await newRating.save();

  res.json({ message: "Rating was saved" });
});

export const getByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const ratings = await Rating.find({ userId });

  if (ratings.length === 0) {
    // If this is used as middleware, we pass to next()
    if (req.skipNotFound) {
      return next();
    }
    return res.json([]);
  }

  res.json(ratings);
});

export const getByMovieId = asyncHandler(async (req, res) => {
  const movieId = req.params.movieId;

  const ratings = await Rating.find({ movieId });

  if (ratings.length === 0) {
    return res.json([]);
  }

  res.json(ratings);
});

export const changeRating = asyncHandler(async (req, res) => {
  const { userId, movieId, rating } = req.body;

  if (!userId || !movieId || rating === undefined) {
    throw new AppError('Missing required fields', 400);
  }

  if (rating < 0 || rating > 10) {
    throw new AppError('Rating must be between 0 and 10', 400);
  }

  const updatedRating = await Rating.findOneAndUpdate(
    { movieId, userId },
    { rating },
    { new: true } // Returns the updated document
  );

  if (!updatedRating) {
    throw new AppError('Rating not found', 404);
  }

  res.json({
    message: "Rating was updated",
    updatedData: updatedRating
  });
});

export const deleteRating = asyncHandler(async (req, res) => {
  const ratingId = req.params.ratingId;

  const deletedRating = await Rating.findByIdAndDelete(ratingId);

  if (!deletedRating) {
    throw new AppError('Rating not found', 404);
  }

  res.json({ message: "Rating was removed" });
});