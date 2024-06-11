import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const changePassword = async (req, res) => {
  try {
    const userData = req.userData;

    const { currentPassword, newPassword } = req.body;
    const correctPassword = await userData.comparePassword(currentPassword);

    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid Credentials", errors: { message: "The given password is incorrect" } });
    }

    userData.password = newPassword;
    await userData.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}


export const getProfile = async (req, res) => {
  try {
    const userData = req.userData;
    const { _id, username, email, displayName } = userData;
    res.json({ user: { userId: _id, username, email, displayName } })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}


export const getWatchList = async (req, res) => {
  try {
    const userData = req.userData;
    const populatedUser = await userData.populate("watchlist")
    console.log("watchlist", populatedUser.watchlist)
    res.json({ results: populatedUser.watchlist })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export const addMovieToWatchList = async (req, res) => {
  try {
    const userData = req.userData;
    const tmdbId = parseInt(req.params.tmdbId);
    const movie = await Movie.findOne({ tmdb_id: tmdbId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (userData.watchlist.includes(movie._id)) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }
    userData.watchlist.push(movie._id);
    await userData.save();
    console.log("Movie added to watchlist", movie.title);
    res.json({ message: "Movie added to watchlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add movie to watchlist", error: error.message });
  }
}


export const removeMovieFromWatchList = async (req, res) => {
  try {
    const userData = req.userData;
    const tmdbId = parseInt(req.params.tmdbId);
    const movie = await Movie.findOne({ tmdb_id: tmdbId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!userData.watchlist.includes(movie._id)) {
      return res.status(400).json({ message: "Movie not in watchlist" });
    }
    userData.watchlist.pull(movie._id);
    await userData.save();
    console.log("Movie removed from watchlist", movie.title);
    res.json({ message: "Movie removed from watchlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove movie from watchlist", error: error.message });
  }
}