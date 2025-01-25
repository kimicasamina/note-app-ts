import User from '../models/User';
import { CustomError } from '../utils/customError';

export const createUserInDB = async (
  username: string,
  email: string,
  password: string,
): Promise<any> => {
  try {
    const user = await User.create({ username, email, password });
    return user;
  } catch (error) {
    throw new CustomError('Failed to create user', 500);
  }
};

export const getAllUsersFromDB = async (): Promise<any[]> => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new CustomError('Failed to retrieve users', 500);
  }
};

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new CustomError('Failed to retrieve user', 500);
  }
};

export const getUserByIdFromDB = async (id: string): Promise<any> => {
  try {
    const user = await User.findByPk(id); // Using primary key (ID) for the findByPk method
    return user;
  } catch (error) {
    throw new CustomError('Failed to retrieve user', 500);
  }
};

export const updateUserInDB = async (
  id: string,
  username?: string,
  email?: string,
  password?: string,
): Promise<any> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null; // If user doesn't exist, return null
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    return user;
  } catch (error) {
    throw new CustomError('Failed to update user', 500);
  }
};

export const deleteUserFromDB = async (id: string): Promise<boolean> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return false; // User doesn't exist
    }

    await user.destroy();
    return true;
  } catch (error) {
    throw new CustomError('Failed to delete user', 500);
  }
};
