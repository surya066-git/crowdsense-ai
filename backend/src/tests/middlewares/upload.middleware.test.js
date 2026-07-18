import { jest } from '@jest/globals';

describe('upload.middleware', () => {
  let uploadMiddleware;
  let multerMock;
  let memoryStorageMock;
  let AppErrorMock;

  beforeAll(async () => {
    memoryStorageMock = jest.fn().mockReturnValue('memory-storage-2');
    multerMock = jest.fn().mockImplementation((opts) => opts);
    multerMock.memoryStorage = memoryStorageMock;
    
    jest.unstable_mockModule('multer', () => ({ default: multerMock }));
    
    AppErrorMock = class AppError extends Error {
      constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
      }
    };
    jest.unstable_mockModule('../../errors/AppError.js', () => ({
      AppError: AppErrorMock,
    }));

    const module = await import('../../middlewares/upload.middleware.js');
    uploadMiddleware = module.uploadMiddleware;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should initialize multer correctly', () => {
    expect(uploadMiddleware.storage).toBe('memory-storage-2');
    expect(uploadMiddleware.limits.fileSize).toBe(10 * 1024 * 1024);
  });

  it('fileFilter should allow .csv file', () => {
    const file = { originalname: 'data.csv' };
    const cb = jest.fn();
    
    uploadMiddleware.fileFilter({}, file, cb);
    
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('fileFilter should allow .json file', () => {
    const file = { originalname: 'data.json' };
    const cb = jest.fn();
    
    uploadMiddleware.fileFilter({}, file, cb);
    
    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('fileFilter should reject invalid file', () => {
    const file = { originalname: 'data.txt' };
    const cb = jest.fn();
    
    uploadMiddleware.fileFilter({}, file, cb);
    
    expect(cb).toHaveBeenCalledWith(expect.any(AppErrorMock), false);
    const err = cb.mock.calls[0][0];
    expect(err.message).toBe('Invalid file type. Only .csv and .json are allowed');
    expect(err.statusCode).toBe(400);
  });
});
