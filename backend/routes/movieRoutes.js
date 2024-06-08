import express from 'express';
import { getMovies, getMovieTrailer, getMovie, getMovieAsSearchResult, searchMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get('/', getMovies);
router.get('/trailer/:id', getMovieTrailer);
router.get('/:id', getMovie);
router.get('/searchresult/:id', getMovieAsSearchResult);
router.get('/search/:search', searchMovie);

export default router;