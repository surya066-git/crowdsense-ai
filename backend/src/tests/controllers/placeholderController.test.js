import { jest } from '@jest/globals';

jest.unstable_mockModule('../../utils/response.js', () => ({
  successResponse: jest.fn((req, res, data) => {
    res.status(200).json(data);
  }),
}));

const { successResponse } = await import('../../utils/response.js');
const { createPlaceholderController } = await import('../../controllers/placeholderController.js');

describe('Placeholder Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('createPlaceholderController should return a generic placeholder response', () => {
    const moduleName = 'TestModule';
    const controller = createPlaceholderController(moduleName);

    controller(req, res);

    expect(successResponse).toHaveBeenCalledWith(req, res, {
      message: 'TestModule module is ready.',
      data: {
        module: 'TestModule',
        status: 'placeholder',
        note: 'Business logic will be added in a later implementation phase.',
      },
    });
  });
});
