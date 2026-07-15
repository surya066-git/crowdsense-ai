import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { AppError } from '../errors/AppError.js';
import { ERROR_CODES } from '../errors/errorCodes.js';

const createRateLimiter = (maxRequests) =>
  rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, _res, next) => {
      next(
        new AppError(
          'Too many requests. Please try again later.',
          429,
          ERROR_CODES.RATE_LIMIT_EXCEEDED,
          {
            requestId: req.id,
            windowMs: config.rateLimit.windowMs,
          },
        ),
      );
    },
  });

export const globalRateLimiter = createRateLimiter(config.rateLimit.maxRequests);

export const uploadRateLimiter = createRateLimiter(config.rateLimit.uploadMaxRequests);
