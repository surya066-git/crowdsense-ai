import { jest } from '@jest/globals';
import { cacheMiddleware } from '../../middlewares/cache.js';

describe('Cache Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.useFakeTimers();
    req = {
      method: 'GET',
      originalUrl: '/test-route',
    };
    res = {
      statusCode: 200,
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should skip caching for non-GET requests', () => {
    req.method = 'POST';
    const middleware = cacheMiddleware(60);
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should cache and return data for subsequent requests', () => {
    req.originalUrl = '/test-route-success';
    const middleware = cacheMiddleware(60);
    
    // First request
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
    
    const responseData = { success: true };
    res.json(responseData);
    
    // Reset mocks for second request
    next.mockClear();

    // Second request (should hit cache)
    const middleware2 = cacheMiddleware(60);
    res.json = jest.fn();
    middleware2(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ success: true });
    expect(next).not.toHaveBeenCalled();
  });

  it('should ignore cache after expiration', () => {
    req.originalUrl = '/test-route-expire';
    const middleware = cacheMiddleware(60);
    
    // First request
    middleware(req, res, next);
    const responseData = { success: true };
    res.json(responseData);
    
    // Advance time by 61 seconds
    jest.advanceTimersByTime(61 * 1000);

    // Reset mocks
    next.mockClear();

    // Request after expiration (should miss cache)
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should only cache GET requests', () => {
    req.originalUrl = '/test-route-post';
    const middleware = cacheMiddleware(60);
    req.method = 'POST';
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should not cache if status code is not 200', () => {
    req.originalUrl = '/test-route-500';
    const middleware = cacheMiddleware(60);
    
    // First request
    middleware(req, res, next);
    res.statusCode = 500;
    const responseData = { error: true };
    res.json(responseData);
    
    next.mockClear();
    res.json = jest.fn();

    // Second request (should miss cache)
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
