import User from '../../models/User';
import sequelize from '../../config/database';
import bcrypt from 'bcryptjs';

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new user and hash the password', async () => {
    const user = await User.create({
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('id');
    expect(user.password).not.toBe('password123'); // Password should be hashed
    const isValid = await bcrypt.compare('password123', user.password);
    expect(isValid).toBe(true);
  });

  it('should retrieve users', async () => {
    const users = await User.findAll();
    expect(users.length).toBeGreaterThan(0);
    expect(Array.isArray(users)).toBe(true);
  });
});
