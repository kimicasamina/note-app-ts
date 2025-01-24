import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Category from './Category';

interface NoteAttributes {
  id: string; // UUID
  title: string;
  content: string;
  userId: string;
  categoryId: string;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id'> {}

class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public userId!: string;
  public categoryId!: string;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // Reference to 'users' table
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories', // Reference to 'categories' table
        key: 'id',
      },
    },
  },
  {
    tableName: 'notes',
    sequelize,
  },
);

// Associations
Note.belongsTo(User, { foreignKey: 'userId' });
Note.belongsTo(Category, { foreignKey: 'categoryId' });

export default Note;
