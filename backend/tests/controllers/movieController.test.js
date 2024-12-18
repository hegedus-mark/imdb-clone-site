import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app.js';
import { mockTMDBResponses } from '../helpers/testUtils.js';

describe('Movie Controller', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  describe('GET /api/movies', () => {
    it('should fetch movies by category', async () => {
      fetchStub.resolves({
        ok: true,
        status: 200,
        json: async () => mockTMDBResponses.movieList
      });

      const response = await request(app)
        .get('/api/movies')
        .query({ category: 'popular' });

      expect(response.status).to.equal(200);
      expect(response.body.results).to.have.lengthOf(2);
    });

    it('should handle TMDB API errors', async () => {
      fetchStub.resolves({
        ok: false,
        status: 500,
        json: async () => ({ message: 'TMDB API Error' })
      });

      const response = await request(app)
        .get('/api/movies')
        .query({ category: 'popular' });

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('message');
    });
  });

  describe('GET /api/movies/:id', () => {
    it('should fetch a single movie', async () => {
      fetchStub.resolves({
        ok: true,
        json: async () => mockTMDBResponses.movieDetails
      });

      const response = await request(app)
        .get('/api/movies/123');

      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal('Test Movie');
    });
  });

  describe('GET /api/movies/search/:search', () => {
    it('should search movies successfully', async () => {
      fetchStub.resolves({
        ok: true,
        json: async () => ({ results: [mockTMDBResponses.movieDetails] })
      });

      const response = await request(app)
        .get('/api/movies/search/test');

      expect(response.status).to.equal(200);
      expect(response.body.results).to.be.an('array');
    });
  });

});
