import app from './app.js';
import { config } from './config/env.js';
import { initializeFirebaseAdmin } from './firebase/admin.js';
import { logger } from './utils/logger.js';

const maybeInitializeFirebase = () => {
  if (config.firebase.projectId || config.app.isProduction) {
    initializeFirebaseAdmin();
    return;
  }

  logger.warn('Firebase Admin was not initialized because Firebase project config is missing.');
};

maybeInitializeFirebase();

const server = app.listen(config.app.port, () => {
  logger.info('CrowdSense AI backend started.', {
    port: config.app.port,
    environment: config.app.env,
    apiVersion: config.app.apiVersion,
  });
});

const shutdown = (signal) => {
  logger.info('Shutdown signal received.', { signal });

  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection.', { reason });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception.', { error });
  shutdown('uncaughtException');
});
