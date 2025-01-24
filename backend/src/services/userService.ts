import User from '../models/User';

export const createUserInDB = async (
  username: string,
  email: string,
  password: string,
): Promise<any> => {
  const user = await User.create({ username, email, password });
  return user;
};

export const getAllUsersFromDB = async (): Promise<any[]> => {
  const users = await User.findAll();
  return users;
};

export const getUserByEmail = async (email: string): Promise<any> => {
  const users = await User.findOne({
    where: {
      email,
    },
  });
  return users;
};
