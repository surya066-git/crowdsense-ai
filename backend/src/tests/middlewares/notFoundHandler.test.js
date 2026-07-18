import { jest } from '@jest/globals';

describe('notFoundHandler', () => {
  let notFoundHandler;
  let AppError;

  beforeAll(async () => {
    const mockAppError = {
      notFound: jest.fn().mockReturnValue(new Error('NotFound')),
    };
    jest.unstable_mockModule('../../errors/AppError.js', () => ({
      AppError: mockAppError,
    }));

    AppError = (await import('../../errors/AppError.js')).AppError;
    const module = await import('../../middlewares/notFoundHandler.js');
    notFoundHandler = module.notFoundHandler;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should call next with notFound AppError', async () => {
    const req = { method: 'GET', originalUrl: '/test' };
    const res = {};
    const next = jest.fn();

    notFoundHandler(req, res, next);

    expect(AppError.notFound).toHaveBeenCalledWith('Route not found: GET /test');
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
