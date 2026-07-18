import axios from 'axios';
import { env } from '../config/env.js';
import { auth } from '../config/firebase.js';
import { createRequestId } from '../utils/requestId.js';

/**
 * Axios instance configured for API requests.
 * Automatically attaches authentication tokens and request IDs.
 * Normalizes error responses for consistent handling.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  config.headers['X-Request-Id'] = createRequestId();

  if (auth?.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to get Firebase Auth token:', error);
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      status: error.response?.status || 0,
      code: error.response?.data?.error?.code || 'NETWORK_OR_CLIENT_ERROR',
      message:
        error.response?.data?.error?.message ||
        error.message ||
        'The request could not be completed.',
      requestId: error.response?.data?.requestId || error.config?.headers?.['X-Request-Id'],
      originalError: error,
    };

    return Promise.reject(normalizedError);
  },
);
