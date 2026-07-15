import { ERROR_CODES } from './errorCodes.js';

export class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = ERROR_CODES.INTERNAL_ERROR, details = null) {
    super(message);

    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static validation(message, details = null) {
    return new AppError(message, 400, ERROR_CODES.VALIDATION_ERROR, details);
  }

  static unauthorized(message = 'Authentication is required.') {
    return new AppError(message, 401, ERROR_CODES.AUTHENTICATION_REQUIRED);
  }

  static forbidden(message = 'You do not have permission to perform this action.') {
    return new AppError(message, 403, ERROR_CODES.AUTHORIZATION_FAILED);
  }

  static notFound(message = 'Requested resource was not found.') {
    return new AppError(message, 404, ERROR_CODES.ROUTE_NOT_FOUND);
  }
}
