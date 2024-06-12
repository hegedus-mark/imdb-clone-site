import express from "express";
import {
  changeRating,
  createRating,
  deleteRating,
  getByMovieId,
  getByUserId,
  getRatings,
} from "../controllers/ratingController.js";

const router = express.Router();

router.get("/", getRatings);
router.get("/:userId", getByUserId);
router.get("/:movieId", getByMovieId);
router.post("/", createRating);
router.put("/", changeRating);
router.delete("/:ratingId", deleteRating);

export default router;
