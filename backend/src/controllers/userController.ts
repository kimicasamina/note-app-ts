import { Request, Response, NextFunction } from 'express';
import {
  createUserInDB,
  getAllUsersFromDB,
  getUserByEmail,
} from '../services/userService';
import { CustomError } from '../utils/customError';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error('Missing required fields: username, email, or password');
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new CustomError('User already exist.', 401);
    }
    const user = await createUserInDB(username, email, password);

    res.status(201).json(user);
  } catch (error) {
    // res.status(500).json({ message: 'Failed to create user', error });
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await getAllUsersFromDB();
    res.status(200).json(users);
  } catch (error) {
    // res.status(500).json({ message: 'Failed to fetch users', error });
    next(error);
  }
};
