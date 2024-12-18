import Movie from "../models/Movie.js";

/**
 * Saves movies to the database.
 *
 * @param {Array<Object>|Object} movies - An array of movie objects or a single movie object to be saved.
 * @return {Promise<void>} - A promise that resolves when all movies have been saved.
 */
export const saveMoviesToDB = async (movies) => {
  let moviesToSave = movies;
  if (!Array.isArray(movies)) {
    moviesToSave = [movies];
  }
  for (const movie of moviesToSave) {
    const existingMovie = await Movie.findOne({ tmdb_id: movie.id });
    if (!existingMovie) {
      const newMovie = new Movie({ tmdb_id: movie.id, ...movie });
      await newMovie.save();
    }
  }
};