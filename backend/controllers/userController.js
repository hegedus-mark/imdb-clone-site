import { asyncHandler } from '../middleware/asyncHandler.js';
import { AppError } from '../errors/AppError.js';
import Movie from "../models/Movie.js";

export const getProfile = asyncHandler(async (req, res) => {
  const userData = req.userData;
  const { _id, username, email, displayName } = userData;

  res.json({
    user: {
      userId: _id,
      username,
      email,
      displayName
    }
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const userData = req.userData;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError('Missing required fields', 400, {
      message: "Both current and new password are required"
    });
  }

  const correctPassword = await userData.comparePassword(currentPassword);
  if (!correctPassword) {
    throw new AppError('Invalid Credentials', 401, {
      message: "The given password is incorrect"
    });
  }

  userData.password = newPassword;
  await userData.save();

  res.json({ message: "Password changed successfully" });
});

export const getWatchList = asyncHandler(async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 20;
  const skipAmount = (page - 1) * pageSize;

  const userData = req.userData;
  const populatedUser = await userData.populate("watchlist");

  // Get total list for IDs
  const watchListIds = populatedUser.watchlist.map(movie => movie.tmdb_id);

  // Get paginated results
  const paginatedWatchlist = populatedUser.watchlist
    .slice(skipAmount, skipAmount + pageSize);

  res.json({
    results: paginatedWatchlist,
    ids: watchListIds,
    total_pages: Math.ceil(populatedUser.watchlist.length / pageSize),
    page: parseInt(page)
  });
});

export const addMovieToWatchList = asyncHandler(async (req, res) => {
  const userData = req.userData;
  const tmdbId = parseInt(req.params.tmdbId);

  const movie = await Movie.findOne({ tmdb_id: tmdbId });
  if (!movie) {
    throw new AppError('Movie not found', 404);
  }

  if (userData.watchlist.includes(movie._id)) {
    throw new AppError('Movie already in watchlist', 400);
  }

  userData.watchlist.push(movie._id);
  await userData.save();

  res.json({ message: "Movie added to watchlist" });
});

export const removeMovieFromWatchList = asyncHandler(async (req, res) => {
  const userData = req.userData;
  const tmdbId = parseInt(req.params.tmdbId);

  const movie = await Movie.findOne({ tmdb_id: tmdbId });
  if (!movie) {
    throw new AppError('Movie not found', 404);
  }

  if (!userData.watchlist.includes(movie._id)) {
    throw new AppError('Movie not in watchlist', 400);
  }

  userData.watchlist.pull(movie._id);
  await userData.save();

  res.json({ message: "Movie removed from watchlist" });
});