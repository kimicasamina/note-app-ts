import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { errorMiddleware } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
dotenv.config();

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use(express.json());

// API endpoints
app.use('/api/users', userRoutes);
app.use('/api/auths', authRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
