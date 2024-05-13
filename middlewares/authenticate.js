import HttpError from '../helpers/HttpError.js';
import { isValidJWT } from './isValidJWT.js';
import { User } from '../model/user.js';

export const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401, 'Unauthorized3'));
  }

  try {
    const { id } = isValidJWT(token);
    console.log('auth.id', id);

    const user = await User.findById(id);
    console.log('auth.user', user);

    if (!user?.token || user.token !== token) {
      next(HttpError(401, 'Unauthorized1'));
    }
    req.user = user;
    next();

  } catch (e) {
    next(HttpError(401, 'Unauthorized2'));

  } 
};
