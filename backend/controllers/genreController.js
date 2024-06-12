import { TMDB_OPTIONS } from "../config/tmdbConfig.js";



export const getGenre = async (req, res) => {
  const ID = req.params.genre;
  try {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${ID}`,
      TMDB_OPTIONS
    )
      .then((res) => res.json())
      .then((json) => {
        res.json(json);
      })
      .catch((err) => console.error(err));
  } catch (error) {
    res.status(506).json({ message: "something wrong" });
  }
};

export const getGenres = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list`;
    fetch(url, TMDB_OPTIONS)
      .then((res) => res.json())
      .then((json) => {
        res.json(json);
      });
  } catch (error) {
    res.status(500).json({ message: "something wrong" });
  }
};
