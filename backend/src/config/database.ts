import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Database connection and syncing
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful');
    return sequelize.sync(); // Sync models (optional in dev)
  })

  .catch((error) => {
    console.error('Database connection failed:', error);
  });
export default sequelize;
