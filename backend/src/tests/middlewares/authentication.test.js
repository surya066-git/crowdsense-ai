import { jest } from '@jest/globals';

describe('authentication', () => {
  let authenticate;
  let AppError;
  let getAuthMock;
  let verifyIdTokenMock;

  beforeAll(async () => {
    AppError = {
      unauthorized: jest.fn().mockImplementation((msg) => new Error(`Unauthorized: ${msg}`)),
    };
    jest.unstable_mockModule('../../errors/AppError.js', () => ({
      AppError,
    }));

    jest.unstable_mockModule('../../middlewares/asyncHandler.js', () => ({
      asyncHandler: (fn) => fn, // Mocking asyncHandler to just pass through for easier testing
    }));

    verifyIdTokenMock = jest.fn();
    getAuthMock = jest.fn().mockReturnValue({
      verifyIdToken: verifyIdTokenMock,
    });
    jest.unstable_mockModule('../../firebase/admin.js', () => ({
      getAuth: getAuthMock,
    }));

    const module = await import('../../middlewares/authentication.js');
    authenticate = module.authenticate;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw unauthorized if no authorization header is present', async () => {
    const req = { headers: {} };
    const res = {};
    const next = jest.fn();

    await expect(authenticate(req, res, next)).rejects.toThrow('Unauthorized: A valid Firebase ID token is required.');
    expect(AppError.unauthorized).toHaveBeenCalledWith('A valid Firebase ID token is required.');
  });

  it('should throw unauthorized if token format is invalid', async () => {
    const req = { headers: { authorization: 'InvalidTokenFormat' } };
    const res = {};
    const next = jest.fn();

    await expect(authenticate(req, res, next)).rejects.toThrow('Unauthorized: A valid Firebase ID token is required.');
  });

  it('should authenticate and attach user to req if token is valid', async () => {
    const req = { headers: { authorization: 'Bearer valid_token' } };
    const res = {};
    const next = jest.fn();

    const decodedToken = {
      uid: 'user123',
      email: 'user@example.com',
      roles: ['user'],
    };
    verifyIdTokenMock.mockResolvedValue(decodedToken);

    await authenticate(req, res, next);

    expect(getAuthMock).toHaveBeenCalled();
    expect(verifyIdTokenMock).toHaveBeenCalledWith('valid_token');
    expect(req.user).toEqual({
      uid: 'user123',
      email: 'user@example.com',
      roles: ['user'],
      token: decodedToken,
    });
    expect(next).toHaveBeenCalled();
  });
  
  it('should handle missing email and roles in token', async () => {
    const req = { headers: { authorization: 'Bearer valid_token' } };
    const res = {};
    const next = jest.fn();

    const decodedToken = {
      uid: 'user123',
    };
    verifyIdTokenMock.mockResolvedValue(decodedToken);

    await authenticate(req, res, next);

    expect(req.user).toEqual({
      uid: 'user123',
      email: null,
      roles: [],
      token: decodedToken,
    });
    expect(next).toHaveBeenCalled();
  });
});
