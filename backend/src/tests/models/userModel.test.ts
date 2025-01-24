import { User } from '../models';
import sequelize from '../config/database';

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Creates the table
  });

  afterAll(async () => {
    await sequelize.close(); // Closes the connection
  });

  it('should create a new user', async () => {
    const user = await User.create({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
    });
    expect(user.username).toBe('JohnDoe');
    expect(user.email).toBe('john.doe@example.com');
  });

  it('should throw an error when email is missing', async () => {
    await expect(User.create({ username: 'JaneDoe' })).rejects.toThrowError();
  });
});
