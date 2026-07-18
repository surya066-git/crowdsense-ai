import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock import.meta.env for Jest
const globalEnv = {
  BASE_URL: '/',
  VITE_APP_NAME: 'CrowdSense AI',
  VITE_API_BASE_URL: 'http://localhost:8080/api/v1',
  VITE_API_TIMEOUT_MS: '30000',
  VITE_ENABLE_DEMO_MODE: 'true',
  VITE_FIREBASE_API_KEY: 'test-api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
  VITE_FIREBASE_PROJECT_ID: 'test-project-id',
  VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-messaging-sender-id',
  VITE_FIREBASE_APP_ID: 'test-app-id'
};

// We don't need global.import polyfill because we're using babel to transform import.meta.env to process.env
process.env = { ...process.env, ...globalEnv };
