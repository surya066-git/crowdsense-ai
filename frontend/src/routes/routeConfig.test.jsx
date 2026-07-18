import { publicRoutes, protectedRoutes } from './routeConfig';
import { ROUTE_PATHS } from '../constants/appConstants';

describe('routeConfig', () => {
  it('defines public routes correctly', () => {
    expect(publicRoutes).toBeDefined();
    expect(Array.isArray(publicRoutes)).toBe(true);
    expect(publicRoutes).toHaveLength(3);
    
    expect(publicRoutes[0]).toMatchObject({
      path: ROUTE_PATHS.HOME,
      index: true,
    });
    expect(publicRoutes[0].element).toBeDefined();

    expect(publicRoutes[1]).toMatchObject({
      path: ROUTE_PATHS.ABOUT,
    });
    expect(publicRoutes[1].element).toBeDefined();
    
    expect(publicRoutes[2]).toMatchObject({
      path: ROUTE_PATHS.LOGIN,
    });
    expect(publicRoutes[2].element).toBeDefined();
  });

  it('defines protected routes correctly', () => {
    expect(protectedRoutes).toBeDefined();
    expect(Array.isArray(protectedRoutes)).toBe(true);
    expect(protectedRoutes).toHaveLength(5);
    
    expect(protectedRoutes[0]).toMatchObject({
      path: ROUTE_PATHS.UPLOAD,
    });
    expect(protectedRoutes[0].element).toBeDefined();

    expect(protectedRoutes[1]).toMatchObject({
      path: ROUTE_PATHS.MAP,
    });
    expect(protectedRoutes[1].element).toBeDefined();

    expect(protectedRoutes[2]).toMatchObject({
      path: ROUTE_PATHS.RECOMMENDATION,
    });
    expect(protectedRoutes[2].element).toBeDefined();

    expect(protectedRoutes[3]).toMatchObject({
      path: ROUTE_PATHS.SIMULATION,
    });
    expect(protectedRoutes[3].element).toBeDefined();

    expect(protectedRoutes[4]).toMatchObject({
      path: ROUTE_PATHS.HISTORY,
    });
    expect(protectedRoutes[4].element).toBeDefined();
  });
  
  it('should freeze routes arrays to prevent mutations', () => {
    expect(Object.isFrozen(publicRoutes)).toBe(true);
    expect(Object.isFrozen(protectedRoutes)).toBe(true);
  });
});
