import { fetchMovies } from "../utils/fetchMovies.js";
import { saveMoviesToDB } from "../utils/saveMovies.js";
import { MOVIE_BASE_URL, TMDB_OPTIONS } from "../config/tmdbConfig.js";




export const getMovies = async (req, res) => {
  const { category } = req.query;
  const url = `${MOVIE_BASE_URL}/movie/${category}?language=en-US&page=1`;
  try {
    const movies = await fetchMovies(url, TMDB_OPTIONS);
    await saveMoviesToDB(movies);
    res.json({ results: movies });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

export const getMovieTrailer = async (req, res) => {
  const ID = req.params.id;
  const url = `${MOVIE_BASE_URL}/movie/${ID}/videos?language=en-US`;
  try {
    const response = await fetch(url, TMDB_OPTIONS);
    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(506).json({ message: "Failed to fetch trailer" });
  }
};

export const getMovie = async (req, res) => {
  const { saveMovie = false } = req.query;
  const ID = req.params.id;
  const url = `${MOVIE_BASE_URL}/movie/${ID}`;
  try {
    const response = await fetch(url, TMDB_OPTIONS);
    const movie = await response.json();
    if (saveMovie) await saveMoviesToDB(movie);
    res.json(movie);
  } catch (err) {
    res.status(506).json({ message: "Failed to fetch movie" });
  }
};



export const searchMovie = async (req, res) => {
  const search = encodeURIComponent(req.params.search);
  const url = `${MOVIE_BASE_URL}/search/movie?query=${search}&include_adult=true&language=en-US&page=1`;
  try {
    const movies = await fetchMovies(url, TMDB_OPTIONS);
    res.json({ results: movies });
  } catch (err) {
    res.status(506).json({ message: "Failed to search movie" });
  }
};