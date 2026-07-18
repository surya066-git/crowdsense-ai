import { APP_NAME, APP_DESCRIPTION, ROUTE_PATHS } from './appConstants';

describe('appConstants', () => {
  it('should have correct APP_NAME', () => {
    expect(APP_NAME).toBe('CrowdSense AI');
  });

  it('should have correct APP_DESCRIPTION', () => {
    expect(typeof APP_DESCRIPTION).toBe('string');
    expect(APP_DESCRIPTION).toContain('stadium entry');
  });

  describe('ROUTE_PATHS', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(ROUTE_PATHS)).toBe(true);
    });

    it('should contain expected routes', () => {
      expect(ROUTE_PATHS).toEqual({
        HOME: '/',
        UPLOAD: '/upload',
        MAP: '/map',
        RECOMMENDATION: '/recommendation',
        SIMULATION: '/simulation',
        HISTORY: '/history',
        ABOUT: '/about',
        LOGIN: '/login',
      });
    });
  });
});
