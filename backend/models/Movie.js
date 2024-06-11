import mongoose from "mongoose";

//here we could have the movie link inside that we get from TMDB
const MovieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  genre_ids: { type: Array, required: true },
  release_date: { type: Date, required: true },
  overview: { type: String },
  poster_path: { type: String },
  original_language: { type: String },
  original_title: { type: String },
  backdrop_path: { type: String },
  popularity: { type: Number },
  vote_average: { type: Number },
  vote_count: { type: Number },
  adult: { type: Boolean },
});


export default mongoose.model('Movie', MovieSchema);