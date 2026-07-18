import { jest } from '@jest/globals';

describe('validate', () => {
  let validate;
  let AppError;

  beforeAll(async () => {
    AppError = {
      validation: jest.fn().mockImplementation((msg, details) => new Error(`Validation Error: ${msg}`)),
    };
    jest.unstable_mockModule('../../errors/AppError.js', () => ({
      AppError,
    }));

    const module = await import('../../middlewares/validate.js');
    validate = module.validate;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should call next if validation passes and update req source', () => {
    const schema = {
      validate: jest.fn().mockReturnValue({ value: { key: 'valid' }, error: null }),
    };
    const req = { body: { key: 'raw' } };
    const res = {};
    const next = jest.fn();

    const middleware = validate(schema, 'body');
    middleware(req, res, next);

    expect(schema.validate).toHaveBeenCalledWith({ key: 'raw' }, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    expect(req.body).toEqual({ key: 'valid' });
    expect(next).toHaveBeenCalled();
  });

  it('should throw AppError.validation if validation fails', () => {
    const errorDetails = [
      { message: '"key" is required', path: ['key'], type: 'any.required' },
    ];
    const schema = {
      validate: jest.fn().mockReturnValue({ value: null, error: { details: errorDetails } }),
    };
    const req = { body: {} };
    const res = {};
    const next = jest.fn();

    const middleware = validate(schema);
    
    expect(() => middleware(req, res, next)).toThrow('Validation Error: Request validation failed.');
    expect(AppError.validation).toHaveBeenCalledWith('Request validation failed.', [
      { message: '"key" is required', path: 'key', type: 'any.required' }
    ]);
    expect(next).not.toHaveBeenCalled();
  });
});
