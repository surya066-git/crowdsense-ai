import express from 'express';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { config } from './config/env.js';
import { corsMiddleware } from './config/cors.js';
import { globalRateLimiter } from './middlewares/rateLimiter.js';
import { requestId } from './middlewares/requestId.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { requestTimeout } from './middlewares/requestTimeout.js';
import { compressionMiddleware, securityHeaders } from './middlewares/security.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';
import { successResponse } from './utils/response.js';

const app = express();

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(requestId);
app.use(requestTimeout);
app.use(requestLogger);
app.use(securityHeaders);
app.use(compressionMiddleware);
app.use(corsMiddleware);
app.use(globalRateLimiter);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/', (req, res) =>
  successResponse(req, res, {
    message: 'Welcome to the CrowdSense AI backend.',
    data: {
      service: config.app.name,
      apiBasePath: `/api/${config.app.apiVersion}`,
      healthPath: `/api/${config.app.apiVersion}/health`,
    },
  }),
);

app.use(routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
