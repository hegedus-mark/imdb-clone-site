import { expect } from 'chai';
import request from 'supertest';
import app from '../../app.js';
import { createTestUser } from '../helpers/testUtils.js';

describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'new@test.com',
          password: 'password123',
          displayName: 'New User'
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('token');
      expect(response.body.user).to.have.property('userId');
      expect(response.body.user.username).to.equal('newuser');
    });

    it('should return error for existing email', async () => {
      await createTestUser();

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'different',
          email: 'test@test.com',
          password: 'password123',
          displayName: 'Test User'
        });

      expect(response.status).to.equal(400);
      expect(response.body.formError.fields).to.include('email');
    });
  });
});