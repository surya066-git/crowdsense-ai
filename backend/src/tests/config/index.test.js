import { jest } from '@jest/globals';

describe('config index', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should export all configurations', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({ config: 'mockEnvConfig' }));
    jest.unstable_mockModule('../../config/cors.js', () => ({ corsMiddleware: 'mockCors' }));
    jest.unstable_mockModule('../../config/firebase.js', () => ({ firebaseConfig: 'mockFirebaseConfig' }));
    
    const index = await import('../../config/index.js');
    expect(index.config).toBe('mockEnvConfig');
    expect(index.corsMiddleware).toBe('mockCors');
    expect(index.firebaseConfig).toBe('mockFirebaseConfig');
  });
});
