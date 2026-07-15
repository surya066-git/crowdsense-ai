import { config } from '../config/env.js';

export const requestTimeout = (req, res, next) => {
  req.setTimeout(config.app.requestTimeoutMs);
  res.setTimeout(config.app.requestTimeoutMs);
  next();
};
