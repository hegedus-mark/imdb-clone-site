import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import genresRoutes from "./routes/genresRoutes.js";
import {timingMiddleware} from "./middleware/timingMiddleware.js";

const app = express();

// Connect to MongoDB
connectDB();

// Express Middlewares
app.use(express.json());
app.use(timingMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/genres", genresRoutes);

export default app;
