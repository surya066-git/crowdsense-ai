import { jest } from '@jest/globals';

describe('asyncHandler', () => {
  let asyncHandler;

  beforeAll(async () => {
    const module = await import('../../middlewares/asyncHandler.js');
    asyncHandler = module.asyncHandler;
  });

  it('should call next with error if handler rejects', async () => {
    const error = new Error('Test error');
    const handler = jest.fn().mockRejectedValue(error);
    const req = {};
    const res = {};
    const next = jest.fn();

    const wrappedHandler = asyncHandler(handler);
    await wrappedHandler(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should not call next with error if handler resolves', async () => {
    const handler = jest.fn().mockResolvedValue('success');
    const req = {};
    const res = {};
    const next = jest.fn();

    const wrappedHandler = asyncHandler(handler);
    await wrappedHandler(req, res, next);

    expect(handler).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
