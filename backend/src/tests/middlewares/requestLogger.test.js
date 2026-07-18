import { jest } from '@jest/globals';

describe('requestLogger', () => {
  let requestLogger;
  let morganMock;
  let loggerMock;

  beforeAll(async () => {
    loggerMock = {
      info: jest.fn(),
    };
    jest.unstable_mockModule('../../utils/logger.js', () => ({
      logger: loggerMock,
    }));

    morganMock = jest.fn().mockImplementation((format, options) => {
      return { format, options };
    });
    jest.unstable_mockModule('morgan', () => ({
      default: morganMock,
    }));

    const module = await import('../../middlewares/requestLogger.js');
    requestLogger = module.requestLogger;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should initialize morgan with correct format and stream', () => {
    expect(requestLogger.format).toBe(':method :url :status :res[content-length] - :response-time ms');
    expect(requestLogger.options.stream.write).toBeDefined();
  });

  it('stream.write should call logger.info', () => {
    requestLogger.options.stream.write('  Test HTTP log message  \n');
    expect(loggerMock.info).toHaveBeenCalledWith('HTTP request.', {
      http: 'Test HTTP log message',
    });
  });
});
