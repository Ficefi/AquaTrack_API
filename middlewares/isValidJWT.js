import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export const createJWT = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
};

export const isValidJWT = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
