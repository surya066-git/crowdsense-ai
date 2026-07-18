import { jest } from '@jest/globals';

describe('authorizeRoles', () => {
  let authorizeRoles;
  let AppError;

  beforeAll(async () => {
    AppError = {
      unauthorized: jest.fn().mockReturnValue(new Error('Unauthorized')),
      forbidden: jest.fn().mockReturnValue(new Error('Forbidden')),
    };
    jest.unstable_mockModule('../../errors/AppError.js', () => ({
      AppError,
    }));

    const module = await import('../../middlewares/authorization.js');
    authorizeRoles = module.authorizeRoles;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw unauthorized if no user is on req', () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    const middleware = authorizeRoles('admin');
    
    expect(() => middleware(req, res, next)).toThrow('Unauthorized');
    expect(AppError.unauthorized).toHaveBeenCalled();
  });

  it('should call next if no roles are required', () => {
    const req = { user: { roles: ['user'] } };
    const res = {};
    const next = jest.fn();

    const middleware = authorizeRoles();
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should call next if user has allowed role', () => {
    const req = { user: { roles: ['admin', 'user'] } };
    const res = {};
    const next = jest.fn();

    const middleware = authorizeRoles('admin');
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should throw forbidden if user does not have allowed role', () => {
    const req = { user: { roles: ['user'] } };
    const res = {};
    const next = jest.fn();

    const middleware = authorizeRoles('admin');
    
    expect(() => middleware(req, res, next)).toThrow('Forbidden');
    expect(AppError.forbidden).toHaveBeenCalled();
  });

  it('should handle undefined user roles gracefully and throw forbidden', () => {
    const req = { user: {} };
    const res = {};
    const next = jest.fn();

    const middleware = authorizeRoles('admin');
    
    expect(() => middleware(req, res, next)).toThrow('Forbidden');
    expect(AppError.forbidden).toHaveBeenCalled();
  });
});
