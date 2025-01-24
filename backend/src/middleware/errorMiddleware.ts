// error-middleware.ts
import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'utils/customError';

export const errorMiddleware = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const status = (err as CustomError).status || 500; // Type assertion
  res.status(status).json({
    message: err.message || 'Internal Server Error',
    stack: err.stack,
  });
};
