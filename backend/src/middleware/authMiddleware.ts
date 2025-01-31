import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { CustomError } from '../utils/customError';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.auth_token;

  if (!token) {
    throw new CustomError('No token provided.', 403);
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user data to the request object
    next(); // Pass control to the next handler
  } catch (error) {
    next(error);
  }
};
