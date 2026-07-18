import { PRIMARY_NAVIGATION, UTILITY_NAVIGATION } from './navigation';
import { ROUTE_PATHS } from './appConstants';
import { FiClock, FiCompass, FiHome, FiInfo, FiLogIn, FiMap, FiUploadCloud } from 'react-icons/fi';

describe('navigation constants', () => {
  describe('PRIMARY_NAVIGATION', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(PRIMARY_NAVIGATION)).toBe(true);
    });

    it('should contain the correct primary navigation items', () => {
      expect(PRIMARY_NAVIGATION).toHaveLength(6);
      
      const homeNav = PRIMARY_NAVIGATION.find((n) => n.label === 'Home');
      expect(homeNav).toBeDefined();
      expect(homeNav.path).toBe(ROUTE_PATHS.HOME);
      expect(homeNav.icon).toBe(FiHome);

      const aboutNav = PRIMARY_NAVIGATION.find((n) => n.label === 'About');
      expect(aboutNav).toBeDefined();
      expect(aboutNav.path).toBe(ROUTE_PATHS.ABOUT);
      expect(aboutNav.icon).toBe(FiInfo);
    });
  });

  describe('UTILITY_NAVIGATION', () => {
    it('should be frozen', () => {
      expect(Object.isFrozen(UTILITY_NAVIGATION)).toBe(true);
    });

    it('should contain the login navigation item', () => {
      expect(UTILITY_NAVIGATION).toHaveLength(1);
      expect(UTILITY_NAVIGATION[0]).toEqual({
        label: 'Login',
        path: ROUTE_PATHS.LOGIN,
        icon: FiLogIn,
      });
    });
  });
});
