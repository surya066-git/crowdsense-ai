import { jest } from '@jest/globals';

describe('errorHandler', () => {
  let globalErrorHandler;
  let AppErrorMock;
  let loggerMock;

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
        AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
        STORAGE_ERROR: 'STORAGE_ERROR',
        FIREBASE_ERROR: 'FIREBASE_ERROR',
        INTERNAL_ERROR: 'INTERNAL_ERROR',
      },
    }));

    jest.unstable_mockModule('../../config/env.js', () => ({
      config: {
        app: {
          isProduction: false,
        },
      },
    }));

    loggerMock = {
      error: jest.fn(),
    };
    jest.unstable_mockModule('../../utils/logger.js', () => ({
      logger: loggerMock,
    }));

    const module = await import('../../middlewares/errorHandler.js');
    globalErrorHandler = module.globalErrorHandler;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should handle AppError correctly', () => {
    const error = new AppErrorMock('Test App Error', 400, 'TEST_CODE', { detail: 'test' });
    const req = { id: 'req-1', method: 'GET', originalUrl: '/test' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    globalErrorHandler(error, req, res, next);

    expect(loggerMock.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      error: expect.objectContaining({
        code: 'TEST_CODE',
        message: 'Test App Error',
        details: { detail: 'test' },
        stack: expect.any(String),
      }),
      requestId: 'req-1',
    }));
  });

  it('should normalize firebase auth error', () => {
    const error = new Error('Auth failed');
    error.code = 'auth/user-not-found';
    const req = { id: 'req-2', method: 'POST', originalUrl: '/auth' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.objectContaining({
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Firebase authentication failed.',
      })
    }));
  });

  it('should normalize firebase storage error', () => {
    const error = new Error('Storage failed');
    error.code = 'storage/object-not-found';
    const req = { id: 'req-3', method: 'GET', originalUrl: '/storage' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.objectContaining({
        code: 'STORAGE_ERROR',
        message: 'Firebase Storage operation failed.',
      })
    }));
  });

  it('should normalize firestore error', () => {
    const error = new Error('Firestore failed');
    error.code = 'firestore/permission-denied';
    const req = { id: 'req-4', method: 'GET', originalUrl: '/db' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.objectContaining({
        code: 'FIREBASE_ERROR',
        message: 'Firestore operation failed.',
      })
    }));
  });

  it('should normalize unknown error', () => {
    const error = new Error('Unknown error');
    const req = { id: 'req-5', method: 'GET', originalUrl: '/unknown' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    globalErrorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.objectContaining({
        code: 'INTERNAL_ERROR',
        message: 'An unexpected internal error occurred.',
      })
    }));
  });
});
