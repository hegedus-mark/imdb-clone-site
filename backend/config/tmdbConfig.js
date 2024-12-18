import { ACCESS_TOKEN } from "./sensitiveData.js";

export const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const TMDB_URLS = {
  BASE: "https://api.themoviedb.org/3",
  DISCOVER: "/discover/movie",
  GENRES: "/genre/movie/list",
  MOVIE: "/movie",
  SEARCH: "/search/movie",
};

export const buildTMDBUrl = (path, queryParams = {}) => {
  const url = new URL(`${TMDB_URLS.BASE}${path}`);
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};