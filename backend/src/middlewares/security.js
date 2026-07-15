import compression from 'compression';
import helmet from 'helmet';

export const securityHeaders = helmet({
  crossOriginResourcePolicy: {
    policy: 'cross-origin',
  },
});

export const compressionMiddleware = compression();
