import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import app from '../../app.js';

describe('Genre Controller', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  describe('GET /api/genre', () => {
    it('should fetch all genres', async () => {
      const mockGenres = {
        genres: [
          { id: 28, name: 'Action' },
          { id: 12, name: 'Adventure' }
        ]
      };

      fetchStub.resolves({
        ok: true,
        json: async () => mockGenres
      });

      const response = await request(app).get('/api/genre');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('genres');
      expect(response.body.genres).to.have.lengthOf(2);
    });

    it('should handle TMDB API errors', async () => {
      fetchStub.resolves({
        ok: false,
        status: 500
      });

      const response = await request(app).get('/api/genre');

      expect(response.status).to.equal(500);
      expect(response.body).to.have.property('message');
    });
  });

});