import request from 'supertest';
import app from '../../../app';
import sequelize from '../../../config/database';
import User from '../../../models/User';
import { CustomError } from '../../../utils/customError';

// Set up the database connection before running tests
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database for each test
});

afterAll(async () => {
  await sequelize.close(); // Close the database connection after tests
});

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app).post('/api/users').send({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('JohnDoe');
    expect(response.body.email).toBe('john.doe@example.com');
  });

  it('should return 400 if missing required fields', async () => {
    const response = await request(app).post('/api/users').send({
      username: 'JohnDoe',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Missing required fields: username, email, or password',
    );
  });

  it('should return 401 if user already exists', async () => {
    // Create a user first
    await request(app).post('/api/users').send({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    // Try creating the same user again
    const response = await request(app).post('/api/users').send({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User already exist.');
  });

  it('should fetch all users', async () => {
    // Create a user first
    await request(app).post('/api/users').send({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const response = await request(app).get('/api/users').send();

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].username).toBe('JohnDoe');
  });

  it('should handle internal server errors gracefully', async () => {
    // Force an error in the route handler
    jest
      .spyOn(User, 'findAll')
      .mockRejectedValueOnce(new Error('Database Error'));

    const response = await request(app).get('/api/users').send();

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
