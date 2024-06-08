import mongoose from "mongoose";

const { Schema, model } = mongoose;

const RatingSchema = Schema({
  userId: { type: String, required: true },
  movieId: { type: Number, required: true },
  rating: { type: Number, required: true },
});

export default model("Rating", RatingSchema);
