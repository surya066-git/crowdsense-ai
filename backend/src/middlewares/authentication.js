/**
 * @module authentication
 * @description Express middleware for Firebase ID token authentication.
 * Verifies Bearer tokens from the Authorization header and attaches the
 * decoded user to the request object.
 */

import { getAuth } from '../firebase/admin.js';
import { AppError } from '../errors/AppError.js';
import { asyncHandler } from './asyncHandler.js';

/**
 * Extracts the Bearer token from an Authorization header string.
 * @param {string} [authorizationHeader=''] - The value of the Authorization header.
 * @returns {string|null} The extracted token, or null if no valid Bearer token is found.
 */
const getBearerToken = (authorizationHeader = '') => {
  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
};

/**
 * Express middleware that authenticates requests using Firebase ID tokens.
 * Extracts the Bearer token from the Authorization header, verifies it with
 * Firebase Admin SDK, and attaches the decoded user to `req.user`.
 *
 * @function authenticate
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} _res - Express response object (unused).
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @throws {AppError} Throws a 401 Unauthorized error if no valid token is provided.
 * @returns {Promise<void>}
 */
export const authenticate = asyncHandler(async (req, _res, next) => {

  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    throw AppError.unauthorized('A valid Firebase ID token is required.');
  }

  const decodedToken = await getAuth().verifyIdToken(token);

  req.user = {
    uid: decodedToken.uid,
    email: decodedToken.email || null,
    roles: decodedToken.roles || [],
    token: decodedToken,
  };

  next();
});
