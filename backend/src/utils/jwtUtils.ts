import jwt from 'jsonwebtoken';
import { CustomError } from './customError';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (
  id: string,
  email: string,
  username: string,
): string => {
  // return jwt.sign({ id, email, username }, JWT_SECRET, {
  //   expiresIn: JWT_EXPIRATION,
  // });

  const secret = process.env.JWT_SECRET as string;
  const options = { expiresIn: '1h' };

  // Adding typings to the payload for better clarity
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
