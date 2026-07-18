import { jest } from '@jest/globals';

describe('rateLimiter', () => {
  let globalRateLimiter;
  let uploadRateLimiter;
  let rateLimitMock;
  let AppErrorMock;

  beforeAll(async () => {
    AppErrorMock = class AppError extends Error {
      constructor(message, statusCode, errorCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
      }
    };

    jest.unstable_mockModule('../../errors/AppError.js', () => ({
      AppError: AppErrorMock,
    }));

    jest.unstable_mockModule('../../errors/errorCodes.js', () => ({
      ERROR_CODES: {
        RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
      },
    }));

    jest.unstable_mockModule('../../config/env.js', () => ({
      config: {
        rateLimit: {
          windowMs: 60000,
          maxRequests: 100,
          uploadMaxRequests: 10,
        },
      },
    }));

    rateLimitMock = jest.fn().mockImplementation((options) => options);
    jest.unstable_mockModule('express-rate-limit', () => ({
      default: rateLimitMock,
    }));

    const module = await import('../../middlewares/rateLimiter.js');
    globalRateLimiter = module.globalRateLimiter;
    uploadRateLimiter = module.uploadRateLimiter;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should initialize globalRateLimiter with correct config', () => {
    expect(globalRateLimiter.windowMs).toBe(60000);
    expect(globalRateLimiter.max).toBe(100);
    expect(globalRateLimiter.standardHeaders).toBe(true);
    expect(globalRateLimiter.legacyHeaders).toBe(false);
  });

  it('should initialize uploadRateLimiter with correct config', () => {
    expect(uploadRateLimiter.windowMs).toBe(60000);
    expect(uploadRateLimiter.max).toBe(10);
  });

  it('should call next with AppError on rate limit exceeded handler', () => {
    const req = { id: 'req-id-123' };
    const res = {};
    const next = jest.fn();

    globalRateLimiter.handler(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppErrorMock));
    const err = next.mock.calls[0][0];
    expect(err.message).toBe('Too many requests. Please try again later.');
    expect(err.statusCode).toBe(429);
    expect(err.errorCode).toBe('RATE_LIMIT_EXCEEDED');
    expect(err.details).toEqual({ requestId: 'req-id-123', windowMs: 60000 });
  });
});
