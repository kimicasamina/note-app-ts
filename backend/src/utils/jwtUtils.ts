import jwt from 'jsonwebtoken';
import { CustomError } from './customError';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (
  id: string,
  email: string,
  username: string,
): string => {
  const secret = process.env.JWT_SECRET as string;

  // Set expiresIn explicitly as a string (e.g. '1h')
  const options: jwt.SignOptions = { expiresIn: '1h' };

  const payload = { id, email, username };
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET as string;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new CustomError('Invalid or expired token', 401);
  }
};
