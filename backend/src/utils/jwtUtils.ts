import jwt from 'jsonwebtoken';
import { CustomError } from './customError';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (
  id: string,
  email: string,
  username: string,
): string => {
  const secretOrPrivateKey = process.env.JWT_SECRET;

  // Ensure secretOrPrivateKey is a valid string
  if (typeof secretOrPrivateKey !== 'string') {
    throw new CustomError(
      'JWT_SECRET is not defined or is not a valid string',
      500,
    );
  }

  const options: jwt.SignOptions = { expiresIn: '1h' };
  const payload = { id, email, username };

  return jwt.sign(payload, secretOrPrivateKey, options);
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (typeof secret !== 'string') {
    throw new CustomError(
      'JWT_SECRET is not defined or is not a valid string',
      500,
    );
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new CustomError('Invalid or expired token', 401);
  }
};
