import { jest } from '@jest/globals';
import { successResponse } from '../../utils/response.js';

describe('response utils', () => {
  beforeEach(() => {
    jest.unstable_mockModule('../../models/ApiResponse.js', () => ({
      ApiResponse: {
        success: jest.fn().mockImplementation((val) => ({ success: true, ...val }))
      }
    }));
  });

  it('should return success response with defaults', async () => {
    const req = { id: 'req-123' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    // We mock ApiResponse before testing successResponse but in response.js it is static import.
    // If not using dynamic import for response.js, it might fail. Better to test behavior.
    const { successResponse } = await import('../../utils/response.js');
    
    successResponse(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: 'Success',
      requestId: 'req-123'
    }));
  });

  it('should return success response with custom data', async () => {
    const req = { id: 'req-123' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const { successResponse } = await import('../../utils/response.js');
    
    successResponse(req, res, { statusCode: 201, message: 'Created', data: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Created',
      data: { id: 1 },
      requestId: 'req-123'
    }));
  });
});
