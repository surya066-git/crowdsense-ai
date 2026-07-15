import { AppError } from '../errors/AppError.js';
import { ERROR_CODES } from '../errors/errorCodes.js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const normalizeError = (error) => {
  if (error instanceof AppError) {
    return error;
  }

  if (error?.code?.startsWith?.('auth/')) {
    return new AppError(
      'Firebase authentication failed.',
      401,
      ERROR_CODES.AUTHENTICATION_REQUIRED,
    );
  }

  if (error?.code?.startsWith?.('storage/')) {
    return new AppError('Firebase Storage operation failed.', 502, ERROR_CODES.STORAGE_ERROR);
  }

  if (error?.code?.startsWith?.('firestore/')) {
    return new AppError('Firestore operation failed.', 502, ERROR_CODES.FIREBASE_ERROR);
  }

  return new AppError('An unexpected internal error occurred.', 500, ERROR_CODES.INTERNAL_ERROR);
};

export const globalErrorHandler = (error, req, res, _next) => {
  const normalizedError = normalizeError(error);
  const statusCode = normalizedError.statusCode || 500;

  logger.error('Request failed.', {
    requestId: req.id,
    method: req.method,
    path: req.originalUrl,
    statusCode,
    error,
  });

  const response = {
    success: false,
    error: {
      code: normalizedError.errorCode,
      message: normalizedError.message,
    },
    requestId: req.id,
    timestamp: new Date().toISOString(),
  };

  if (normalizedError.details) {
    response.error.details = normalizedError.details;
  }

  if (!config.app.isProduction && error?.stack) {
    response.error.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};
