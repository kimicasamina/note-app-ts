import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { errorMiddleware } from './middleware/errorMiddleware';
import { CustomError } from './utils/customError';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use('/api/auth', userRoutes);
// Error handling middleware
app.use(errorMiddleware);

export default app;
