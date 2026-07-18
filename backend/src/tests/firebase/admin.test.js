import { jest } from '@jest/globals';

describe('firebase admin', () => {
  let mockInitializeApp;
  let mockCert;

  beforeEach(() => {
    jest.resetModules();
    mockInitializeApp = jest.fn().mockReturnValue('mockApp');
    mockCert = jest.fn().mockReturnValue('mockCert');
    
    jest.unstable_mockModule('firebase-admin', () => ({
      default: {
        initializeApp: mockInitializeApp,
        credential: { cert: mockCert }
      }
    }));
    
    jest.unstable_mockModule('firebase-admin/auth', () => ({
      getAuth: jest.fn().mockReturnValue('mockAuth')
    }));
    
    jest.unstable_mockModule('firebase-admin/firestore', () => ({
      getFirestore: jest.fn().mockReturnValue('mockFirestore')
    }));
    
    jest.unstable_mockModule('firebase-admin/storage', () => ({
      getStorage: jest.fn().mockReturnValue('mockStorage')
    }));
    
    jest.unstable_mockModule('../../utils/logger.js', () => ({
      logger: { info: jest.fn(), error: jest.fn() }
    }));
  });

  afterEach(() => {
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS;
    delete process.env.K_SERVICE;
    delete process.env.GAE_SERVICE;
  });

  it('should return hasFirebaseAdminCredentials true if present in config', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: { credentialsPath: 'something' } }
    }));
    const { hasFirebaseAdminCredentials } = await import('../../firebase/admin.js');
    expect(hasFirebaseAdminCredentials()).toBe(true);
  });
  
  it('should return hasFirebaseAdminCredentials true if env var present', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: {} }
    }));
    process.env.GOOGLE_APPLICATION_CREDENTIALS = 'yes';
    const { hasFirebaseAdminCredentials } = await import('../../firebase/admin.js');
    expect(hasFirebaseAdminCredentials()).toBe(true);
  });
  
  it('should parse inline json credential', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: { credentialsPath: '{"type":"service_account"}', projectId: 'pid', storageBucket: 'bucket' } }
    }));
    const { initializeFirebaseAdmin } = await import('../../firebase/admin.js');
    const app = initializeFirebaseAdmin();
    expect(mockCert).toHaveBeenCalledWith({ type: 'service_account' });
    expect(mockInitializeApp).toHaveBeenCalledWith({
      credential: 'mockCert',
      projectId: 'pid',
      storageBucket: 'bucket'
    });
    expect(app).toBe('mockApp');
    
    // Test idempotency
    const app2 = initializeFirebaseAdmin();
    expect(mockInitializeApp).toHaveBeenCalledTimes(1);
  });
  
  it('should throw if inline json credential is invalid', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: { credentialsPath: '{invalidjson' } }
    }));
    const { initializeFirebaseAdmin } = await import('../../firebase/admin.js');
    expect(() => initializeFirebaseAdmin()).toThrow();
  });
  
  it('should expose getFirestore, getStorage, getAuth', async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { firebase: { credentialsPath: '{"type":"service_account"}' } }
    }));
    const { getFirestore, getStorage, getAuth } = await import('../../firebase/admin.js');
    expect(getFirestore()).toBe('mockFirestore');
    expect(getStorage()).toBe('mockStorage');
    expect(getAuth()).toBe('mockAuth');
  });
});
