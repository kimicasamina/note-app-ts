import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface CategoryAttributes {
  id: string;
  name: string;
  user_id: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public name!: string;
  public user_id!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // Foreign Key referencing `users` table
        key: 'id',
      },
    },
  },
  {
    tableName: 'categories',
    sequelize, // Ensure sequelize instance is passed here
  },
);

export default Category;
