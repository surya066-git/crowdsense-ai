import { jest } from '@jest/globals';

describe('env config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should load default values', async () => {
    delete process.env.NODE_ENV;
    delete process.env.PORT;
    const { config } = await import('../../config/env.js');
    expect(config.app.env).toBe('development');
    expect(config.app.port).toBe(8080);
    expect(config.app.isProduction).toBe(false);
  });

  it('should load specified values', async () => {
    process.env.NODE_ENV = 'production';
    process.env.PORT = '3000';
    process.env.FRONTEND_ORIGIN = 'http://test.com,http://test2.com';
    const { config } = await import('../../config/env.js');
    expect(config.app.env).toBe('production');
    expect(config.app.port).toBe(3000);
    expect(config.app.isProduction).toBe(true);
    expect(config.cors.origins).toEqual(['http://test.com', 'http://test2.com']);
  });

  it('should throw error on invalid env', async () => {
    process.env.PORT = 'invalid';
    await expect(import('../../config/env.js')).rejects.toThrow('Environment validation failed');
  });
});
