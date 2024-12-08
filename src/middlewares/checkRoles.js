import createHttpError from 'http-errors';
import { ROLES } from '../constants/constants.js';

export const checkRoles = (...roles) => {
  return async (req, res, next) => {
    const { user } = req;

    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    const { role } = user;

    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }

    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      next();
      return;
    }
    throw createHttpError(403);
  };
};
