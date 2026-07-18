import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(8080),
  API_VERSION: Joi.string()
    .pattern(/^v\d+$/)
    .default('v1'),
  APP_NAME: Joi.string().default('CrowdSense AI Backend'),
  FRONTEND_ORIGIN: Joi.string().default('http://localhost:5173'),
  FIREBASE_PROJECT_ID: Joi.string().allow('').optional(),
  FIREBASE_STORAGE_BUCKET: Joi.string().allow('').optional(),
  GOOGLE_APPLICATION_CREDENTIALS: Joi.string().allow('').optional(),
  GEMINI_API_KEY: Joi.string().allow('').optional(),
  RATE_LIMIT_WINDOW_MS: Joi.number().integer().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: Joi.number().integer().positive().default(100),
  UPLOAD_RATE_LIMIT_MAX_REQUESTS: Joi.number().integer().positive().default(20),
  REQUEST_TIMEOUT_MS: Joi.number().integer().positive().default(30000),
  MAX_UPLOAD_SIZE_MB: Joi.number().integer().positive().default(10),
  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
    .default('info'),
  ENABLE_DEMO_MODE: Joi.boolean().truthy('true').falsy('false').default(true),
  ADMIN_EMAILS: Joi.string().allow('').default(''),
}).unknown(true);

const { value: env, error } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true,
});

if (error) {
  const message = error.details.map((detail) => detail.message).join(', ');
  throw new Error(`Environment validation failed: ${message}`);
}

const parseCsv = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export const config = Object.freeze({
  app: {
    env: env.NODE_ENV,
    port: env.PORT,
    apiVersion: env.API_VERSION,
    name: env.APP_NAME,
    requestTimeoutMs: env.REQUEST_TIMEOUT_MS,
    enableDemoMode: env.ENABLE_DEMO_MODE,
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
  },
  cors: {
    origins: parseCsv(env.FRONTEND_ORIGIN),
  },
  firebase: {
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    credentialsPath: env.GOOGLE_APPLICATION_CREDENTIALS,
  },
  gemini: {
    apiKey: env.GEMINI_API_KEY,
  },
  logger: {
    level: env.LOG_LEVEL,
  },
  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
    uploadMaxRequests: env.UPLOAD_RATE_LIMIT_MAX_REQUESTS,
  },
  upload: {
    maxFileSizeMb: env.MAX_UPLOAD_SIZE_MB,
    maxFileSizeBytes: env.MAX_UPLOAD_SIZE_MB * 1024 * 1024,
  },
  security: {
    adminEmails: parseCsv(env.ADMIN_EMAILS),
  },
});
