import axios from 'axios';
import { env } from '../config/env.js';
import { createRequestId } from '../utils/requestId.js';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: env.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers['X-Request-Id'] = createRequestId();
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
