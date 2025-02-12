import { sequelize } from './models';
import app from './app';
import User from './models/User';

const PORT = process.env.PORT || 9999;

// Test database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
