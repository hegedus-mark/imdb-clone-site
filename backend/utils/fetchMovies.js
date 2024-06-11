

export const fetchMovies = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const movies = await response.json();
    return movies.results;
  } catch (err) {
    throw new Error('Failed to fetch movies');
  }
};