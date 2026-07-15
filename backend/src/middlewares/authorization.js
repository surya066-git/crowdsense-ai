import { AppError } from '../errors/AppError.js';

export const authorizeRoles =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user) {
      throw AppError.unauthorized();
    }

    if (allowedRoles.length === 0) {
      next();
      return;
    }

    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [];
    const hasRole = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      throw AppError.forbidden();
    }

    next();
  };
