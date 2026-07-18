import { jest } from '@jest/globals';

jest.unstable_mockModule('../../config/env.js', () => ({
  config: {
    app: {
      name: 'TestService',
      env: 'test',
      apiVersion: 'v1',
      enableDemoMode: true,
    }
  }
}));

jest.unstable_mockModule('../../config/firebase.js', () => ({
  firebaseConfig: {
    isConfigured: true
  }
}));

const { getHealthStatus } = await import('../../services/healthService.js');

describe('Health Service', () => {
  it('should return health status', () => {
    const status = getHealthStatus();
    expect(status.service).toBe('TestService');
    expect(status.status).toBe('ok');
    expect(status.environment).toBe('test');
    expect(status.apiVersion).toBe('v1');
    expect(typeof status.uptimeSeconds).toBe('number');
    expect(status.checks.firebaseConfigured).toBe(true);
    expect(status.checks.demoModeEnabled).toBe(true);
  });
});
