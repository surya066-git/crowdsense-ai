import { apiClient } from './apiClient';
import { env } from '../config/env.js';
import { auth } from '../config/firebase.js';
import { createRequestId } from '../utils/requestId.js';

vi.mock('../config/env.js', () => ({
  env: {
    apiBaseUrl: 'http://test-api.com',
    apiTimeoutMs: 5000,
  }
}));

vi.mock('../config/firebase.js', () => ({
  auth: {
    currentUser: null
  }
}));

vi.mock('../utils/requestId.js', () => ({
  createRequestId: vi.fn(() => 'mock-request-id')
}));

describe('apiClient', () => {
  afterEach(() => {
    vi.clearAllMocks();
    auth.currentUser = null;
  });

  it('should be configured with default baseURL and timeout', () => {
    expect(apiClient.defaults.baseURL).toBe('http://test-api.com');
    expect(apiClient.defaults.timeout).toBe(5000);
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  describe('Request Interceptor', () => {
    it('should add X-Request-Id to headers', async () => {
      const interceptor = apiClient.interceptors.request.handlers[0].fulfilled;
      const config = { headers: {} };
      
      const result = await interceptor(config);
      
      expect(createRequestId).toHaveBeenCalled();
      expect(result.headers['X-Request-Id']).toBe('mock-request-id');
    });

    it('should add Authorization header if user is logged in', async () => {
      const mockGetIdToken = vi.fn().mockResolvedValue('mock-token');
      auth.currentUser = { getIdToken: mockGetIdToken };
      
      const interceptor = apiClient.interceptors.request.handlers[0].fulfilled;
      const config = { headers: {} };
      
      const result = await interceptor(config);
      
      expect(mockGetIdToken).toHaveBeenCalled();
      expect(result.headers.Authorization).toBe('Bearer mock-token');
    });

    it('should not throw if getIdToken fails but log warning', async () => {
      const mockGetIdToken = vi.fn().mockRejectedValue(new Error('Auth error'));
      auth.currentUser = { getIdToken: mockGetIdToken };
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const interceptor = apiClient.interceptors.request.handlers[0].fulfilled;
      const config = { headers: {} };
      
      const result = await interceptor(config);
      
      expect(mockGetIdToken).toHaveBeenCalled();
      expect(result.headers.Authorization).toBeUndefined();
      expect(consoleWarnSpy).toHaveBeenCalledWith('Failed to get Firebase Auth token:', expect.any(Error));
      
      consoleWarnSpy.mockRestore();
    });
  });

  describe('Response Interceptor', () => {
    it('should return response if successful', async () => {
      const interceptor = apiClient.interceptors.response.handlers[0].fulfilled;
      const response = { data: 'ok' };
      
      const result = await interceptor(response);
      
      expect(result).toBe(response);
    });

    it('should normalize error on rejection', async () => {
      const interceptor = apiClient.interceptors.response.handlers[0].rejected;
      const mockError = {
        response: {
          status: 404,
          data: {
            error: {
              code: 'NOT_FOUND',
              message: 'Resource not found'
            },
            requestId: 'req-123'
          }
        },
        message: 'Request failed'
      };
      
      await expect(interceptor(mockError)).rejects.toMatchObject({
        status: 404,
        code: 'NOT_FOUND',
        message: 'Resource not found',
        requestId: 'req-123',
        originalError: mockError
      });
    });

    it('should provide default error normalization values', async () => {
      const interceptor = apiClient.interceptors.response.handlers[0].rejected;
      const mockError = {
        message: 'Network Error',
        config: {
          headers: {
            'X-Request-Id': 'req-fallback'
          }
        }
      };
      
      await expect(interceptor(mockError)).rejects.toMatchObject({
        status: 0,
        code: 'NETWORK_OR_CLIENT_ERROR',
        message: 'Network Error',
        requestId: 'req-fallback',
        originalError: mockError
      });
    });
  });
});
