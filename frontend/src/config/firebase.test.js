// Firebase config tests - use vi.doMock for dynamic mocking
describe('firebase config', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should not initialize firebase when api key is missing', async () => {
    vi.doMock('./env', () => ({
      env: { firebase: { apiKey: undefined } }
    }));
    vi.doMock('firebase/app', () => ({ initializeApp: vi.fn() }));
    vi.doMock('firebase/auth', () => ({ getAuth: vi.fn() }));
    vi.doMock('firebase/firestore', () => ({ getFirestore: vi.fn() }));

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { isFirebaseConfigured } = await import('./firebase?t=' + Date.now());
    
    expect(isFirebaseConfigured).toBe(false);
    consoleSpy.mockRestore();
  });

  it('firebase module exports are defined', async () => {
    vi.doMock('./env', () => ({
      env: { firebase: { apiKey: undefined } }
    }));
    vi.doMock('firebase/app', () => ({ initializeApp: vi.fn() }));
    vi.doMock('firebase/auth', () => ({ getAuth: vi.fn() }));
    vi.doMock('firebase/firestore', () => ({ getFirestore: vi.fn() }));

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const firebaseModule = await import('./firebase?t2=' + Date.now());
    
    expect(firebaseModule).toHaveProperty('isFirebaseConfigured');
    consoleSpy.mockRestore();
  });
});
