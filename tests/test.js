const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('Authentication', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});

// Add more test cases for other endpoints
