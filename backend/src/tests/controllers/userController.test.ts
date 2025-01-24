import request from 'supertest';
import app from '../../app';
import User from '../../models/User';

describe('User Controller', () => {
  beforeAll(async () => {
    await User.sync({ force: true }); // Sync the database for tests
  });

  it('should create a new user and hash the password', async () => {
    const response = await request(app).post('/api/users').send({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('JohnDoe');
    expect(response.body.password).not.toBe('password123'); // password should be hashed
  });

  it('should return all users', async () => {
    await User.create({
      username: 'JaneDoe',
      email: 'jane.doe@example.com',
      password: 'password123',
    });

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // Should return the two users
  });
});
