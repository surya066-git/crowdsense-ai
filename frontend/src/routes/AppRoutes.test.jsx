import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from './routeConfig.jsx';

// Mock react-router-dom using importOriginal pattern
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    createBrowserRouter: vi.fn((routes, options) => ({ routes, options })),
  };
});

// Mock components to prevent deep imports
vi.mock('../components/layout/AppLayout.jsx', () => ({
  AppLayout: () => <div data-testid="app-layout">AppLayout</div>,
}));
vi.mock('../components/auth/ProtectedRoute.jsx', () => ({
  ProtectedRoute: ({ children }) => <div data-testid="protected-route">{children}</div>,
}));
vi.mock('../pages/ErrorPage.jsx', () => ({ default: () => <div data-testid="error-page">ErrorPage</div> }));
vi.mock('../pages/NotFoundPage.jsx', () => ({ default: () => <div data-testid="not-found-page">NotFoundPage</div> }));

describe('AppRoutes configuration', () => {
  it('creates router with expected configuration', async () => {
    const { router } = await import('./AppRoutes.jsx');
    expect(createBrowserRouter).toHaveBeenCalled();
    const args = createBrowserRouter.mock.calls[0];
    const routes = args[0];

    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/');
    
    expect(routes[0].element).toBeDefined();
    expect(routes[0].errorElement).toBeDefined();
    
    const children = routes[0].children;
    expect(children).toBeDefined();
    expect(Array.isArray(children)).toBe(true);
    
    const childPaths = children.map(child => child.path || (child.index ? 'index' : undefined));
    publicRoutes.forEach(route => {
      const expectedPath = route.path || (route.index ? 'index' : undefined);
      expect(childPaths).toContain(expectedPath);
    });

    const catchAllRoute = children.find(child => child.path === '*');
    expect(catchAllRoute).toBeDefined();
    expect(catchAllRoute.element).toBeDefined();
  });
});
