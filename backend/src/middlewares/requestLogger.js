import morgan from 'morgan';
import { logger } from '../utils/logger.js';

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';

export const requestLogger = morgan(morganFormat, {
  stream: {
    write(message) {
      logger.info('HTTP request.', {
        http: message.trim(),
      });
    },
  },
});
