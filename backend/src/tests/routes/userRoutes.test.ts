import request from 'supertest';
import app from '../../app'; // Assuming `app` is the express instance

describe('User Routes', () => {
  it('GET /users should return all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
  });

  it('POST /users should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ username: 'JohnDoe', email: 'john.doe@example.com' });
    expect(response.status).toBe(201);
    expect(response.body.username).toBe('JohnDoe');
  });
});
