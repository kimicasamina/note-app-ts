import { CustomError } from './customError';
import { Request, Response, NextFunction } from 'express';

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

type HandleResponseProps = {
  res: Response;
  statusCode: number;
  message: string;
  data: {};
};

export const handleResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data = {},
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const handleError = (error: Error, next: NextFunction) => {
  console.log('ERROR FROM HANDLE ERROR: ', error);
  if (error instanceof Error) {
    console.log('TYPE', error.name);
    return next(error);
  }
  //   return next(new Error(error.message, error.statusCode));
  return next(new CustomError(error.message, error.statusCode));
};
