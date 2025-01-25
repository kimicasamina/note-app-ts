import { Request, Response, NextFunction } from 'express';
import {
  createUserInDB,
  getAllUsersFromDB,
  getUserByEmail,
  getUserByIdFromDB,
  updateUserInDB,
  deleteUserFromDB,
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
      throw new CustomError(
        'Missing required fields: username, email, or password',
        400,
      );
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new CustomError('User already exists.', 401);
    }

    const user = await createUserInDB(username, email, password);

    // res.status(201).json(user);
    res.status(200).json({ user, message: 'User created successfully.' });
  } catch (error) {
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
    // res.status(200).json(users);
    res.status(200).json({ users, message: 'Users retrieved succcessfully' });
  } catch (error) {
    next(new CustomError('Internal Server Error', 500));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await getUserByIdFromDB(userId);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    if (!username && !email && !password) {
      throw new CustomError('No data to update', 400);
    }

    const updatedUser = await updateUserInDB(userId, username, email, password);

    if (!updatedUser) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.params.id;
    const result = await deleteUserFromDB(userId);

    if (!result) {
      throw new CustomError('User not found', 404);
    }

    res.status(204).send({ message: 'User successfully deleted.' });
  } catch (error) {
    next(error);
  }
};
