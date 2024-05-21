import { User } from '../model/user.js';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const findUserByToken = async (token) => {
  const user = await User.findOne({ token });
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

export const updateUserTokenByToken = async (token) => {
  const { SECRET_KEY } = process.env;

  const newToken = jsonwebtoken.sign({ token }, SECRET_KEY);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { token },
    { new: true }
  );
  return updatedUser;
};

export const updateUserData = async (id, userData) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { ...userData },
    { new: true }
  );
  return updatedUser;
};

export const validatePassword = async (password, hash) => {
  const valid = await bcrypt.compare(password, hash);
  return valid;
};

export const getAllUsers = async () => {
  const users = await User.find({});
  const usersCount = users.length;
  return usersCount;
};
