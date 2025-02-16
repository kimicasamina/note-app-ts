import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { CustomError } from '../utils/customError';
dotenv.config();

// Get the DATABASE_URL from environment variables
const databaseUrl = process.env.DB_URL;
if (!databaseUrl) {
  throw new CustomError(
    'DATABASE_URL is not defined in the environment variables.',
    500,
  );
}

// Create a new Sequelize instance using the DATABASE_URL
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
});

export default sequelize;

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export default sequelize;
