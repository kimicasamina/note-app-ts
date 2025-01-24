import {
  createUserInDB,
  getAllUsersFromDB,
  getUserByEmail,
} from '../../services/userService';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

describe('User Service', () => {
  beforeAll(async () => {
    await User.sync({ force: true });
  });

  it('should create a user in the database', async () => {
    const user = await createUserInDB(
      'JohnDoe',
      'john.doe@example.com',
      'password123',
    );

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('JohnDoe');
    const isValid = await bcrypt.compare('password123', user.password);
    expect(isValid).toBe(true);
  });

  it('should get all users from the database', async () => {
    await createUserInDB('JaneDoe', 'jane.doe@example.com', 'password123');
    const users = await getAllUsersFromDB();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should get a user by email', async () => {
    await createUserInDB('JohnDoe', 'john.doe@example.com', 'password123');
    const user = await getUserByEmail('john.doe@example.com');
    expect(user).not.toBeNull();
    expect(user.username).toBe('JohnDoe');
  });
});
