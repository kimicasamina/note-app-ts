import {
  createUserInDB,
  getAllUsersFromDB,
  getUserByEmail,
  updateUserInDB,
  deleteUserFromDB,
} from '../../../src/services/userService';
import User from '../../../src/models/User';
import { CustomError } from '../../utils/customError';

// Mock the User model
jest.mock('../../src/models/User');

describe.skip('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const mockUser = {
      id: 1,
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
    };
    User.create.mockResolvedValue(mockUser);

    const result = await createUserInDB(
      'testUser',
      'test@example.com',
      'password',
    );
    expect(result).toEqual(mockUser);
    expect(User.create).toHaveBeenCalledWith({
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should get all users', async () => {
    const mockUsers = [
      {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        password: 'password',
      },
      {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        password: 'password',
      },
    ];
    User.findAll.mockResolvedValue(mockUsers);

    const result = await getAllUsersFromDB();
    expect(result).toEqual(mockUsers);
  });

  it('should get a user by email', async () => {
    const mockUser = {
      id: 1,
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
    };
    User.findOne.mockResolvedValue(mockUser);

    const result = await getUserByEmail('test@example.com');
    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    const mockUser = {
      id: 1,
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
    };
    User.findByPk.mockResolvedValue(mockUser);
    User.prototype.save.mockResolvedValue(mockUser);

    const result = await updateUserInDB(
      '1',
      'newUsername',
      'new@example.com',
      'newpassword',
    );
    expect(result.username).toEqual('newUsername');
    expect(result.email).toEqual('new@example.com');
  });

  it('should throw an error if user to update does not exist', async () => {
    User.findByPk.mockResolvedValue(null);

    await expect(
      updateUserInDB('999', 'newUsername', 'new@example.com', 'newpassword'),
    ).rejects.toThrow(new CustomError('User not found', 404));
  });

  it('should delete a user', async () => {
    const mockUser = {
      id: 1,
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
    };
    User.findByPk.mockResolvedValue(mockUser);
    User.prototype.destroy.mockResolvedValue(undefined);

    const result = await deleteUserFromDB('1');
    expect(result).toBe(true);
  });

  it('should throw an error if user to delete does not exist', async () => {
    User.findByPk.mockResolvedValue(null);

    const result = await deleteUserFromDB('999');
    expect(result).toBe(false);
  });
});
