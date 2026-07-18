import { jest } from '@jest/globals';

describe('cors config', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should allow * origin', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { cors: { origins: ['*'] } }
    }));
    jest.unstable_mockModule('cors', () => {
      return {
        default: jest.fn().mockImplementation((opts) => opts)
      };
    });

    const { corsMiddleware } = await import('../../config/cors.js');
    expect(corsMiddleware.origin).toBeDefined();
    
    const callback = jest.fn();
    corsMiddleware.origin('http://random.com', callback);
    expect(callback).toHaveBeenCalledWith(null, true);
  });

  it('should block disallowed origin', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { cors: { origins: ['http://allowed.com'] } }
    }));
    jest.unstable_mockModule('cors', () => {
      return {
        default: jest.fn().mockImplementation((opts) => opts)
      };
    });

    const { corsMiddleware } = await import('../../config/cors.js');
    const callback = jest.fn();
    corsMiddleware.origin('http://disallowed.com', callback);
    expect(callback).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should allow allowed origin', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { cors: { origins: ['http://allowed.com'] } }
    }));
    jest.unstable_mockModule('cors', () => {
      return {
        default: jest.fn().mockImplementation((opts) => opts)
      };
    });

    const { corsMiddleware } = await import('../../config/cors.js');
    const callback = jest.fn();
    corsMiddleware.origin('http://allowed.com', callback);
    expect(callback).toHaveBeenCalledWith(null, true);
  });
  
  it('should allow missing origin', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { cors: { origins: ['http://allowed.com'] } }
    }));
    jest.unstable_mockModule('cors', () => {
      return {
        default: jest.fn().mockImplementation((opts) => opts)
      };
    });

    const { corsMiddleware } = await import('../../config/cors.js');
    const callback = jest.fn();
    corsMiddleware.origin(undefined, callback);
    expect(callback).toHaveBeenCalledWith(null, true);
  });
});
