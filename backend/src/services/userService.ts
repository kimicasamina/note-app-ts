import { User, Category, Note } from '../models';
import { CustomError } from '../utils/customError';

export const createUserService = async (
  username: string,
  email: string,
  password: string,
): Promise<any> => {
  try {
    const user = await User.create({ username, email, password });
    return user;
  } catch (error) {
    throw new CustomError('Failed to create user', 500);
  }
};

export const getAllUsersService = async (): Promise<any[]> => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new CustomError('Failed to retrieve users', 500);
  }
};

export const getUserByEmailService = async (email: string): Promise<any> => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw new CustomError('Failed to retrieve user', 500);
  }
};

export const getUserByIdService = async (id: string): Promise<any> => {
  try {
    // Attempt to find the user by ID with associated notes and categories
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'], // Exclude these fields from the user model
      },
      include: [
        {
          model: Note,
          as: 'notes',
          include: [
            {
              model: Category,
              as: 'category', // Include category for each note
            },
          ],
        },
        {
          model: Category,
          as: 'categories', // Include user's associated categories
          // include: [
          //   {
          //     model: Note,
          //     as: 'notes', // Include category for each note
          //   },
          // ],
        },
      ],
    });

    // If no user is found, throw a custom error
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    console.log('User found:', user); // Log the retrieved user

    return user;
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Rethrow as custom error
    throw new CustomError('Failed to retrieve user', 500);
  }
};

export const updateUserService = async (
  id: string,
  username?: string,
  email?: string,
  password?: string,
): Promise<any> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null; // If user doesn't exist, return null
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();
    return user;
  } catch (error) {
    throw new CustomError('Failed to update user', 500);
  }
};

export const deleteUserService = async (id: string): Promise<boolean> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return false; // User doesn't exist
    }

    await user.destroy();
    return true;
  } catch (error) {
    throw new CustomError('Failed to delete user', 500);
  }
};
