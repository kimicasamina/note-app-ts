import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure this is the exact URL of your frontend app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header if needed
    credentials: true, // Allow cookies to be sent with the request
  }),
);

app.use(express.json());

// API endpoints
app.use('/api/users', userRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
