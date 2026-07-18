import { jest } from '@jest/globals';

describe('firebase config', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should parse firebase config correctly when present', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: { projectId: 'test-project', storageBucket: 'test-bucket', credentialsPath: 'path' } }
    }));
    const { firebaseConfig } = await import('../../config/firebase.js');
    expect(firebaseConfig.projectId).toBe('test-project');
    expect(firebaseConfig.isConfigured).toBe(true);
  });

  it('should parse firebase config correctly when missing', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: { projectId: '', storageBucket: '' } }
    }));
    const { firebaseConfig } = await import('../../config/firebase.js');
    expect(firebaseConfig.isConfigured).toBe(false);
  });
});
