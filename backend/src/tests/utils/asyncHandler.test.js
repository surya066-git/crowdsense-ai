import { jest } from '@jest/globals';
import { asyncHandler } from '../../utils/asyncHandler.js';

describe('asyncHandler', () => {
  it('should call next with error if promise rejects', async () => {
    const error = new Error('Test Error');
    const fn = jest.fn().mockRejectedValue(error);
    const req = {};
    const res = {};
    const next = jest.fn();

    await asyncHandler(fn)(req, res, next);
    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should not call next if promise resolves', async () => {
    const fn = jest.fn().mockResolvedValue('success');
    const req = {};
    const res = {};
    const next = jest.fn();

    await asyncHandler(fn)(req, res, next);
    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
