import { getAuth } from '../firebase/admin.js';
import { AppError } from '../errors/AppError.js';
import { asyncHandler } from './asyncHandler.js';

const getBearerToken = (authorizationHeader = '') => {
  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
};

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
