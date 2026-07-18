import { jest } from '@jest/globals';

describe('logger util', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should log correctly', async () => {
    const mockInfo = jest.fn();
    const mockWarn = jest.fn();
    const mockError = jest.fn();
    const mockDebug = jest.fn();
    
    jest.unstable_mockModule('pino', () => {
      const pinoFn = jest.fn().mockReturnValue({
        info: mockInfo,
        warn: mockWarn,
        error: mockError,
        debug: mockDebug
      });
      pinoFn.stdTimeFunctions = { isoTime: 'isoTime' };
      return { default: pinoFn };
    });
    
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { logger: { level: 'info' }, app: { name: 'Test', env: 'test' } }
    }));

    const { logger } = await import('../../utils/logger.js');
    logger.info('info msg', { foo: 'bar' });
    expect(mockInfo).toHaveBeenCalledWith({ foo: 'bar' }, 'info msg');
    
    const err = new Error('Test Error');
    logger.error('error msg', err);
    expect(mockError).toHaveBeenCalledWith({ err }, 'error msg');

    logger.warn('warn msg', { error: err, extra: 1 });
    expect(mockWarn).toHaveBeenCalledWith({ err, extra: 1 }, 'warn msg');
    
    logger.debug('debug msg', { error: new Error('nested') });
    expect(mockDebug).toHaveBeenCalledWith({ err: expect.any(Error) }, 'debug msg');
  });
});
