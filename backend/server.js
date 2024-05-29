import express from "express";
import mongoose from "mongoose";
import { PASSWORD, USERNAME, CLUSTER, ACCESS_TOKEN } from "./sensitiveData.js";
mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/freestyleMERN`
);
const baseUrl = "https://api.themoviedb.org/3/movie";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};
const app = express();
const PORT = 6969;
app.use(express.json());

app.get("/api/movies/popular", (req, res) => {
  const url = `${baseUrl}/popular?language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.get("/api/movie/:id", (req, res) => {
  const ID = req.params.id;
  const url = `${baseUrl}/${ID}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.get("/api/movies/nowplaying", (req, res) => {
  const url = `${baseUrl}/now_playing?language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
