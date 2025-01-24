import request from 'supertest';
import app from '../../app';

describe('GET /', () => {
  it('should return Hello from the backend!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello from the backend!');
  });
});
