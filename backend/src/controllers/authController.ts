import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../utils/jwtUtils';
import {
  getUserByEmailService,
  createUserService,
  getUserByIdService,
} from '../services/userService';
import { CustomError } from '../utils/customError';
import bcrypt from 'bcryptjs';

export const register = async (
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

    const existingUser = await getUserByEmailService(email);

    if (existingUser) {
      throw new CustomError('User already exists.', 401);
    }

    const user = await createUserService(username, email, password);

    // res.status(201).json(user);
    res.status(200).json({ message: 'User created successfully.' });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError('Email and password are required.', 400);
    }

    const user = await getUserByEmailService(email);

    if (!user) {
      throw new CustomError('Invalid email or password.', 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new CustomError('Invalid email or password.', 401);
    }

    // Generate JWT token and set it in a cookie
    const token = generateToken(user.id, user.email, user.username);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
    });

    res.status(200).json({ message: 'Logged in successfully.' });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.clearCookie('token'); // Clear the JWT token from cookies
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      throw new CustomError('User not authenticated', 401);
    }

    const userId = req.user.id; // Safely access user data
    const user = await getUserByIdService(userId);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
