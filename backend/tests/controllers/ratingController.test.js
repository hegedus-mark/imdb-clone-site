import { expect } from 'chai';
import request from 'supertest';
import app from '../../app.js';
import Rating from '../../models/Rating.js';
import { createTestUser, generateTestToken } from '../helpers/testUtils.js';

describe('Rating Controller', () => {
  let testUser;
  let authToken;

  beforeEach(async () => {
    testUser = await createTestUser();
    authToken = generateTestToken(testUser);
  });

  describe('POST /api/rating', () => {
    it('should create a new rating', async () => {
      const ratingData = {
        userId: testUser._id.toString(),
        movieId: '123',
        rating: 8
      };

      const response = await request(app)
        .post('/api/rating')
        .send(ratingData);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Rating was saved');
    });

    it('should validate rating range', async () => {
      const ratingData = {
        userId: testUser._id.toString(),
        movieId: '123',
        rating: 11 // Invalid rating
      };

      const response = await request(app)
        .post('/api/rating')
        .send(ratingData);

      expect(response.status).to.equal(400);
    });
  });

  describe('GET /api/rating/:userId', () => {
    it('should get user ratings', async () => {
      // Create a test rating first
      await Rating.create({
        userId: testUser._id.toString(),
        movieId: '123',
        rating: 8
      });

      const response = await request(app)
        .get(`/api/rating/${testUser._id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(1);
    });
  });

  describe('PUT /api/rating', () => {
    it('should update existing rating', async () => {
      // Create initial rating
      const rating = await Rating.create({
        userId: testUser._id.toString(),
        movieId: '123',
        rating: 8
      });

      const updateData = {
        userId: testUser._id.toString(),
        movieId: '123',
        rating: 9
      };

      const response = await request(app)
        .put('/api/rating')
        .send(updateData);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Rating was updated');
      expect(response.body.updatedData.rating).to.equal(9);
    });
  });
});