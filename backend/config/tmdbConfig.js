import { ACCESS_TOKEN } from "./sensitiveData.js";

export const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + ACCESS_TOKEN,
  },
};
export const BASE_URL = "https://api.themoviedb.org/3";
