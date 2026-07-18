/**
 * @module rateLimiter
 * @description Express rate limiting middleware using express-rate-limit.
 * Provides global and upload-specific limiters with configurable windows and limits.
 */

import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';
import { AppError } from '../errors/AppError.js';
import { ERROR_CODES } from '../errors/errorCodes.js';

/**
 * Factory function that creates a configured rate limiter middleware.
 * Uses a sliding window and returns a structured AppError on rate limit breach.
 * @param {number} maxRequests - The maximum number of requests allowed per window.
 * @returns {import('express-rate-limit').RateLimitRequestHandler} Configured rate limit middleware.
 */
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

/**
 * Global rate limiter applied to all API routes.
 * Uses the `rateLimit.maxRequests` value from environment config.
 * @type {import('express-rate-limit').RateLimitRequestHandler}
 */
export const globalRateLimiter = createRateLimiter(config.rateLimit.maxRequests);

/**
 * Upload-specific rate limiter with stricter request limits.
 * Applied only to file upload routes to prevent abuse.
 * @type {import('express-rate-limit').RateLimitRequestHandler}
 */
export const uploadRateLimiter = createRateLimiter(config.rateLimit.uploadMaxRequests);
