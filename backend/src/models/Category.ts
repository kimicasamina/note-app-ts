import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Note from './Note';

interface CategoryAttributes {
  id: string; // UUID
  name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: string;
  public name!: string;
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
  },
  {
    tableName: 'categories',
    sequelize,
  },
);

// Associations
Category.hasMany(Note, { foreignKey: 'categoryId' });

export default Category;
