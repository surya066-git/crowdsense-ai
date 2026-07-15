import pino from 'pino';
import { config } from '../config/env.js';

const baseLogger = pino({
  level: config.logger.level,
  base: {
    service: config.app.name,
    environment: config.app.env,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

const normalizeMeta = (meta = {}) => {
  if (meta instanceof Error) {
    return { err: meta };
  }

  if (meta.error instanceof Error) {
    const { error, ...rest } = meta;
    return { ...rest, err: error };
  }

  return meta;
};

export const logger = Object.freeze({
  info(message, meta = {}) {
    baseLogger.info(normalizeMeta(meta), message);
  },
  warn(message, meta = {}) {
    baseLogger.warn(normalizeMeta(meta), message);
  },
  error(message, meta = {}) {
    baseLogger.error(normalizeMeta(meta), message);
  },
  debug(message, meta = {}) {
    baseLogger.debug(normalizeMeta(meta), message);
  },
});
