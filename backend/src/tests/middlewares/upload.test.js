import { jest } from '@jest/globals';

describe('upload', () => {
  let uploadMiddleware;
  let multerMock;
  let memoryStorageMock;
  let AppErrorMock;

  beforeAll(async () => {
    memoryStorageMock = jest.fn().mockReturnValue('memory-storage');
    multerMock = jest.fn().mockImplementation((opts) => opts);
    multerMock.memoryStorage = memoryStorageMock;
    
    jest.unstable_mockModule('multer', () => ({ default: multerMock }));
    
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
      ERROR_CODES: { UPLOAD_ERROR: 'UPLOAD_ERROR' },
    }));
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { upload: { maxFileSizeBytes: 1024 } },
    }));
    jest.unstable_mockModule('../../constants/fileTypes.js', () => ({
      ALLOWED_FILE_EXTENSIONS: ['.jpg', '.png'],
      ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png'],
    }));

    const module = await import('../../middlewares/upload.js');
    uploadMiddleware = module.uploadMiddleware;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should initialize multer with memory storage and limits', () => {
    expect(uploadMiddleware.storage).toBe('memory-storage');
    expect(uploadMiddleware.limits.fileSize).toBe(1024);
  });

  it('fileFilter should allow valid file', () => {
    const file = { originalname: 'test.jpg', mimetype: 'image/jpeg' };
    const cb = jest.fn();
    
    uploadMiddleware.fileFilter({}, file, cb);
    
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('fileFilter should reject file with invalid extension', () => {
    const file = { originalname: 'test.txt', mimetype: 'image/jpeg' };
    const cb = jest.fn();
    
    uploadMiddleware.fileFilter({}, file, cb);
    
    expect(cb).toHaveBeenCalledWith(expect.any(AppErrorMock));
  });

  it('fileFilter should reject file with invalid mimetype', () => {
    const file = { originalname: 'test.jpg', mimetype: 'text/plain' };
    const cb = jest.fn();
    
    uploadMiddleware.fileFilter({}, file, cb);
    
    expect(cb).toHaveBeenCalledWith(expect.any(AppErrorMock));
  });
});
