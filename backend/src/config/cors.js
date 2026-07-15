import cors from 'cors';
import { config } from './env.js';

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (config.cors.origins.includes('*')) {
    return true;
  }

  return config.cors.origins.includes(origin);
};

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
  exposedHeaders: ['X-Request-Id'],
});
