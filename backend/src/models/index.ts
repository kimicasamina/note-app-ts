import sequelize from '../config/database';
import User from './User';
import Category from './Category';
import Note from './Note';

// Define associations
const defineAssociations = () => {
  User.hasMany(Note, { foreignKey: 'user_id', as: 'notes' });
  Note.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  Category.hasMany(Note, { foreignKey: 'category_id', as: 'notes' });
  Note.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

  User.hasMany(Category, { foreignKey: 'user_id', as: 'categories' });
  Category.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
};

// Initialize associations
defineAssociations();

export { sequelize, User, Category, Note };
