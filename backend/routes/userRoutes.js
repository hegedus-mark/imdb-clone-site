import express from "express";
import { getProfile, getWatchList, changePassword, addMovieToWatchList, removeMovieFromWatchList } from "../controllers/userController.js";
import { validateUser } from "../middleware/userMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/:userId/profile', verifyToken, validateUser, getProfile);
router.put('/:userId/change-password', verifyToken, validateUser, changePassword);

router.get('/:userId/watchlist', verifyToken, validateUser, getWatchList);
router.post("/:userId/watchlist/:tmdbId", verifyToken, validateUser, addMovieToWatchList);
router.delete("/:userId/watchlist/:tmdbId", verifyToken, validateUser, removeMovieFromWatchList);

export default router