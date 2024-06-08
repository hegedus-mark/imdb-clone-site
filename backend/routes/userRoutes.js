import express from "express";
import { getProfile, getWatchList, changePassword } from "../controllers/userController.js";
import { validateUser } from "../middleware/userMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get('/:userId/profile', verifyToken, validateUser, getProfile);
router.get('/:userId/watchlist', verifyToken, validateUser, getWatchList);
router.put('/:userId/change-password', verifyToken, validateUser, changePassword);

export default router