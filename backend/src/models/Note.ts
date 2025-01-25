import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface NoteAttributes {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category_id: string;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id'> {}

class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes
{
  public id!: string;
  public title!: string;
  public content!: string;
  public user_id!: string;
  public category_id!: string;
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // Reference to 'users' table
        key: 'id',
      },
    },
    category_id: {
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
    sequelize, // Ensure sequelize instance is passed here
  },
);

export default Note;
