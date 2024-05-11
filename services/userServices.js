import { User } from '../model/user.js';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.hashPasswords();
  await newUser.save();

  return newUser;
};

export const updateUserWithToken = async (id) => {
  const { SECRET_KEY } = process.env;

  const token = jsonwebtoken.sign({ id }, SECRET_KEY);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true }
  );

  return updatedUser;
};

export const validatePassword = async (password, hash) => {
  const valid = await bcrypt.compare(password, hash);
  return valid;
};
