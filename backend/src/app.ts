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
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies)
  }),
);
app.use(helmet());

app.use(express.json());

// API endpoints
app.use('/api/users', userRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
