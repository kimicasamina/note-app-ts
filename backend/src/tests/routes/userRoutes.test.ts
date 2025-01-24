import request from 'supertest';
import app from '../../server';

describe('User Routes', () => {
  it('POST /users should create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('JohnDoe');
  });

  it('GET /users should return all users', async () => {
    await request(app).post('/api/users').send({
      username: 'JaneDoe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Expecting two users in the list
  });
});
