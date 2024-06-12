import express from "express";
import { getMoviesByGenre, getGenres } from "../controllers/genreController.js";

const router = express.Router();
router.get("/:genre", getMoviesByGenre);
router.get("/", getGenres);
export default router;
