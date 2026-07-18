import { env } from './env';

describe('env config', () => {
  it('should be frozen', () => {
    expect(Object.isFrozen(env)).toBe(true);
  });

  it('should contain expected application configuration properties', () => {
    expect(env).toHaveProperty('appName');
    expect(env).toHaveProperty('apiBaseUrl');
    expect(env).toHaveProperty('apiTimeoutMs');
    expect(env).toHaveProperty('enableDemoMode');
    
    // Check types
    expect(typeof env.appName).toBe('string');
    expect(typeof env.apiBaseUrl).toBe('string');
    expect(typeof env.apiTimeoutMs).toBe('number');
    expect(typeof env.enableDemoMode).toBe('boolean');
  });

  it('should contain firebase configuration object', () => {
    expect(env).toHaveProperty('firebase');
    expect(typeof env.firebase).toBe('object');
    
    // The keys should be present even if undefined in testing env
    expect('apiKey' in env.firebase).toBe(true);
    expect('authDomain' in env.firebase).toBe(true);
    expect('projectId' in env.firebase).toBe(true);
    expect('storageBucket' in env.firebase).toBe(true);
    expect('messagingSenderId' in env.firebase).toBe(true);
    expect('appId' in env.firebase).toBe(true);
  });
});
