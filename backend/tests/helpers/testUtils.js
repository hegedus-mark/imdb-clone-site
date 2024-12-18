import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import User from '../../models/User.js';

export const createTestUser = async (userData = {}) => {
  const defaultUser = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'password123',
    displayName: 'Test User'
  };

  const user = new User({
    ...defaultUser,
    ...userData
  });

  await user.save();
  return user;
};

export const generateTestToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username },
    config.jwt.secretKey,
    { expiresIn: '1h' }
  );
};

// Mock TMDB responses
export const mockTMDBResponses = {
  movieDetails: {
    id: 123,
    title: "Test Movie",
    overview: "Test Overview",
    release_date: "2024-01-01",
    genre_ids: []
  },
  movieList: {
    results: [
      {
        id: 123,
        title: "Movie 1",
        release_date: "2024-01-01",
        genre_ids: []
      },
      {
        id: 124,
        title: "Movie 2",
        release_date: "2024-01-01",
        genre_ids: []
      }
    ],
    page: 1,
    total_pages: 1
  }
};