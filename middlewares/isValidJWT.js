import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

const createJWT = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
};

const isValidJWT = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

export default {
  isValidJWT,
  createJWT,
};
