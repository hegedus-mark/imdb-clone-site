import { TMDB_OPTIONS, TMDB_URLS, buildTMDBUrl } from "../config/tmdbConfig.js";
import { saveMoviesToDB } from "../utils/saveMovies.js";
import { asyncHandler } from '../middleware/asyncHandler.js';
import { AppError } from '../errors/AppError.js';

export const getMoviesByGenre = asyncHandler(async (req, res) => {
  const genreId = req.params.genre;
  const page = req.query.page || 1;

  const url = buildTMDBUrl(TMDB_URLS.DISCOVER, {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page,
    sort_by: 'popularity.desc',
    with_genres: genreId
  });

  const response = await fetch(url, TMDB_OPTIONS);
  if (!response.ok) {
    throw new AppError('Failed to fetch movies by genre', response.status);
  }

  const data = await response.json();
  await saveMoviesToDB(data.results);
  res.json(data);
});

export const getGenres = asyncHandler(async (req, res) => {
  const url = buildTMDBUrl(TMDB_URLS.GENRES);

  const response = await fetch(url, TMDB_OPTIONS);
  if (!response.ok) {
    throw new AppError('Failed to fetch genres', response.status);
  }

  const data = await response.json();
  res.json(data);
});