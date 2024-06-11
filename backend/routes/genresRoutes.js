import express from "express";
import { getGenre, getGenres } from "../controllers/genreController.js";

const router = express.Router();
router.get("/:genre", getGenre);
router.get("/", getGenres);
export default router;
