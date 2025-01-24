import dotenv from 'dotenv';
import { sequelize } from '../config/database';
import { User } from '../models/User';

dotenv.config({ path: '.env.test' });

// Setup before all tests
beforeAll(async () => {
  // Sync the database before tests (optional: use a test database)
  await sequelize.sync({ force: true });

  // Optionally, you can mock other services if needed
  // jest.mock('../services/userService');
});

// Cleanup after each test
afterAll(async () => {
  await sequelize.close(); // Close the database connection after all tests
});

// Reset any global mocks
beforeEach(() => {
  jest.clearAllMocks();
});
