import cors from 'cors';
import { CustomError } from './customError';

// Load and split the allowed origins from the environment variable
const allowedOrigins = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(',')
  : [];

// Origin validation function
const origin = (
  origin: string | undefined,
  callback: (err: Error | null, allow: boolean) => void,
) => {
  if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
    // Allow requests with no origin (e.g., Postman or mobile apps)
    callback(null, true);
  } else {
    callback(new CustomError('Not allowed by CORS', 400), false);
  }
};

// CORS configuration using the origin function
const corsOptions = cors({
  origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies to be sent with the request
});

export default corsOptions;
