import { expect } from 'chai';
import request from 'supertest';
import app from '../../app.js';
import { createTestUser, generateTestToken } from '../helpers/testUtils.js';
import Movie from '../../models/Movie.js';

describe('User Controller', () => {
  let testUser;
  let authToken;

  beforeEach(async () => {
    testUser = await createTestUser();
    authToken = generateTestToken(testUser);
  });

  describe('GET /api/user/:userId/profile', () => {
    it('should get user profile', async () => {
      const response = await request(app)
        .get(`/api/user/${testUser._id}/profile`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.user).to.have.property('username', testUser.username);
      expect(response.body.user).to.have.property('email', testUser.email);
    });

    it('should reject unauthorized access', async () => {
      const response = await request(app)
        .get(`/api/user/${testUser._id}/profile`);

      expect(response.status).to.equal(401);
    });
  });

  describe('PUT /api/user/:userId/change-password', () => {
    it('should change password successfully', async () => {
      const response = await request(app)
        .put(`/api/user/${testUser._id}/change-password`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123'
        });

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Password changed successfully');
    });

    it('should reject incorrect current password', async () => {
      const response = await request(app)
        .put(`/api/user/${testUser._id}/change-password`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123'
        });

      expect(response.status).to.equal(401);
    });
  });

  describe('Watchlist operations', () => {
    let testMovie;

    beforeEach(async () => {
      testMovie = await Movie.create({
        tmdb_id: 123,
        title: 'Test Movie',
        genre_ids: [28],
        release_date: new Date()
      });
    });

    it('should add movie to watchlist', async () => {
      const response = await request(app)
        .post(`/api/user/${testUser._id}/watchlist/${testMovie.tmdb_id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Movie added to watchlist');
    });

    it('should remove movie from watchlist', async () => {
      // First add the movie
      await request(app)
        .post(`/api/user/${testUser._id}/watchlist/${testMovie.tmdb_id}`)
        .set('Authorization', `Bearer ${authToken}`);

      // Then remove it
      const response = await request(app)
        .delete(`/api/user/${testUser._id}/watchlist/${testMovie.tmdb_id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Movie removed from watchlist');
    });
  });
});