import { TMDB_OPTIONS, TMDB_URLS, buildTMDBUrl } from "../config/tmdbConfig.js";
import { saveMoviesToDB } from "../utils/saveMovies.js";
import { asyncHandler } from '../middleware/asyncHandler.js';
import { AppError } from '../errors/AppError.js';

export const getMovies = asyncHandler(async (req, res) => {
  const { category, page = 1 } = req.query;

  if (!category) {
    throw new AppError('Category is required', 400);
  }

  const url = buildTMDBUrl(`${TMDB_URLS.MOVIE}/${category}`, {
    language: 'en-US',
    page
  });

  const response = await fetch(url, TMDB_OPTIONS);
  if (!response.ok) {
    throw new AppError('Failed to fetch movies', response.status);
  }

  const data = await response.json();
  await saveMoviesToDB(data.results);
  res.json(data);
});

export const getMovieTrailer = asyncHandler(async (req, res) => {
  const movieId = req.params.id;
  const url = buildTMDBUrl(`${TMDB_URLS.MOVIE}/${movieId}/videos`, {
    language: 'en-US'
  });

  const response = await fetch(url, TMDB_OPTIONS);
  if (!response.ok) {
    throw new AppError('Failed to fetch trailer', response.status);
  }

  const data = await response.json();
  res.json(data);
});

export const getMovie = asyncHandler(async (req, res) => {
  const movieId = req.params.id;
  const { saveMovie = false } = req.query;

  const url = buildTMDBUrl(`${TMDB_URLS.MOVIE}/${movieId}`);

  const response = await fetch(url, TMDB_OPTIONS);
  if (!response.ok) {
    throw new AppError('Failed to fetch movie', response.status);
  }

  const movie = await response.json();

  if (saveMovie === 'true') {
    await saveMoviesToDB(movie);
  }

  res.json(movie);
});

export const searchMovie = asyncHandler(async (req, res) => {
  const searchQuery = encodeURIComponent(req.params.search);

  const url = buildTMDBUrl(TMDB_URLS.SEARCH, {
    query: searchQuery,
    include_adult: true,
    language: 'en-US',
    page: 1
  });

  const response = await fetch(url, TMDB_OPTIONS);
  if (!response.ok) {
    throw new AppError('Failed to search movies', response.status);
  }

  const data = await response.json();
  res.json({ results: data.results });
});