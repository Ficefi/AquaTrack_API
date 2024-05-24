import HttpError from '../helpers/HttpError.js';
import gravatar from 'gravatar';
import {
  createUser,
  findUserByEmail,
  findUserByToken,
  validatePassword,
  registerTokens,
  updateUserWithToken,
  updateUserTokens,
  updateUserData,
  getAllUsers,
} from '../services/userServices.js';
import { nanoid } from 'nanoid';

export const SignUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, 'User already exist');
    }
    const id = nanoid();

    const avatarURL = gravatar.url(email, null, false);

    const { accessToken, refreshToken } = registerTokens(id);

    await createUser({ email, password, avatarURL, accessToken, refreshToken });

    res.status(201).json({
      user: {
        email,
      },
      token: accessToken,
      refreshToken,
      message: 'User created',
    });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw HttpError(401, 'Email is wrong');
    }
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      throw HttpError(401, 'Password is wrong');
    }

    const newUser = await updateUserWithToken(user.id);

    res.status(200).json({
      token: newUser.accessToken,
      refreshToken: newUser.refreshToken,
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const LogOut = async (req, res, next) => {
  const { id } = req.user;
  try {
    await updateUserWithToken(id);

    res.status(204).json({
      message: 'No content',
    });
  } catch (error) {
    next(error);
  }
};

export const userCurrent = async (req, res, next) => {
  const { token } = req.user;
  try {
    const user = await findUserByToken(token);
    const { name, email, gender, weight, time, waterRate, avatarURL } = user;

    if (!user) {
      throw HttpError(401, 'User doesn`t exist');
    }

    res.status(200).json({
      name,
      email,
      gender,
      weight,
      time,
      waterRate,
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const userUpdate = async (req, res, next) => {
  const { id } = req.user;
  const data = req.body;
  try {
    if (req.file) {
      const avatarURL = req.file.path;
      var user = await updateUserData(id, { data, avatarURL });
    } else {
      var user = await updateUserData(id, data);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const token = req.user.refreshToken;
  try {
    const { accessToken, refreshToken } = await updateUserTokens(token);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const countOfUsers = async (req, res, next) => {
  try {
    const response = await getAllUsers();
    res.status(200).json({
      userCount: response,
    });
  } catch (error) {
    next(error);
  }
};
