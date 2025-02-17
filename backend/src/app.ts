import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import corsOptions from './utils/corsOption';
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
app.use(corsOptions);

app.use(express.json());

// API endpoints
app.use('/api/', (req, res) => {
  res.send('SERVER IS READY');
});
app.use('/api/users', userRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;
