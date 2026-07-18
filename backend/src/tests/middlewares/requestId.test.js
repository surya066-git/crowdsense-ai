import { jest } from '@jest/globals';

describe('requestId', () => {
  let requestId;
  let cryptoMock;
  let uuidMock;

  beforeAll(async () => {
    cryptoMock = {
      randomUUID: jest.fn().mockReturnValue('mocked-uuid'),
    };
    uuidMock = {
      validate: jest.fn(),
    };
    
    jest.unstable_mockModule('crypto', () => cryptoMock);
    jest.unstable_mockModule('uuid', () => uuidMock);

    const module = await import('../../middlewares/requestId.js');
    requestId = module.requestId;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should reuse existing valid UUID', () => {
    const req = { get: jest.fn().mockReturnValue('existing-valid-uuid') };
    const res = { setHeader: jest.fn() };
    const next = jest.fn();

    uuidMock.validate.mockReturnValue(true);

    requestId(req, res, next);

    expect(req.id).toBe('existing-valid-uuid');
    expect(res.setHeader).toHaveBeenCalledWith('X-Request-Id', 'existing-valid-uuid');
    expect(next).toHaveBeenCalled();
    expect(cryptoMock.randomUUID).not.toHaveBeenCalled();
  });

  it('should generate new UUID if existing is invalid', () => {
    const req = { get: jest.fn().mockReturnValue('invalid-uuid') };
    const res = { setHeader: jest.fn() };
    const next = jest.fn();

    uuidMock.validate.mockReturnValue(false);

    requestId(req, res, next);

    expect(req.id).toBe('mocked-uuid');
    expect(res.setHeader).toHaveBeenCalledWith('X-Request-Id', 'mocked-uuid');
    expect(next).toHaveBeenCalled();
    expect(cryptoMock.randomUUID).toHaveBeenCalled();
  });

  it('should generate new UUID if no header is present', () => {
    const req = { get: jest.fn().mockReturnValue(undefined) };
    const res = { setHeader: jest.fn() };
    const next = jest.fn();

    requestId(req, res, next);

    expect(req.id).toBe('mocked-uuid');
    expect(res.setHeader).toHaveBeenCalledWith('X-Request-Id', 'mocked-uuid');
    expect(next).toHaveBeenCalled();
    expect(cryptoMock.randomUUID).toHaveBeenCalled();
  });
});
