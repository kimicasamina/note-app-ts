import sequelize from './config/database';
import app from './app';
import User from './models/User';

const PORT = process.env.PORT || 9999;

// Database connection and syncing
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful');
    return sequelize.sync(); // Sync models (optional in dev)

    const user = User.create({
      username: 'kimi',
      email: 'kimi@gmail.com',
      password: '123456789',
    });
    console.log('USER', user);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
