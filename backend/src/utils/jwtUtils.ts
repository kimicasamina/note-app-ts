import jwt from 'jsonwebtoken';
import { CustomError } from './customError';
import dotenv from 'dotenv';
dotenv.config();

const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (
  id: string,
  email: string,
  username: string,
): string => {
  return jwt.sign({ id, email, username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new CustomError('Invalid or expired token', 401);
  }
};
