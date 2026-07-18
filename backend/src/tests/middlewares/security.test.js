import { jest } from '@jest/globals';

describe('security', () => {
  let compressionMiddleware;
  let securityHeaders;
  let helmetMock;
  let compressionMock;

  beforeAll(async () => {
    helmetMock = jest.fn().mockReturnValue('helmet-middleware');
    compressionMock = jest.fn().mockReturnValue('compression-middleware');

    jest.unstable_mockModule('helmet', () => ({ default: helmetMock }));
    jest.unstable_mockModule('compression', () => ({ default: compressionMock }));

    const module = await import('../../middlewares/security.js');
    compressionMiddleware = module.compressionMiddleware;
    securityHeaders = module.securityHeaders;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should initialize compression middleware', () => {
    expect(compressionMock).toHaveBeenCalled();
    expect(compressionMiddleware).toBe('compression-middleware');
  });

  it('should initialize helmet middleware with correct options', () => {
    expect(helmetMock).toHaveBeenCalledWith({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    });
    expect(securityHeaders).toBe('helmet-middleware');
  });
});
