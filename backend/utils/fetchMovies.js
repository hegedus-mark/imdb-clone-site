

export const fetchMovies = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const movies = await response.json();
    return { results: movies.results, page: movies.page, total_pages: movies.total_pages };
  } catch (err) {
    throw new Error('Failed to fetch movies');
  }
};