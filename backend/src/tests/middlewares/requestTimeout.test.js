import { jest } from '@jest/globals';

describe('requestTimeout', () => {
  let requestTimeout;

  beforeAll(async () => {
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: {
        app: {
          requestTimeoutMs: 5000,
        },
      },
    }));

    const module = await import('../../middlewares/requestTimeout.js');
    requestTimeout = module.requestTimeout;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should set timeout on req and res and call next', async () => {
    const req = { setTimeout: jest.fn() };
    const res = { setTimeout: jest.fn() };
    const next = jest.fn();

    requestTimeout(req, res, next);

    expect(req.setTimeout).toHaveBeenCalledWith(5000);
    expect(res.setTimeout).toHaveBeenCalledWith(5000);
    expect(next).toHaveBeenCalled();
  });
});
