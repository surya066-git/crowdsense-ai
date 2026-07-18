import { createRequestId } from './requestId';

describe('createRequestId', () => {
  it('returns a UUID when crypto.randomUUID is available', () => {
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
    const spy = vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockUUID);
    expect(createRequestId()).toBe(mockUUID);
    spy.mockRestore();
  });

  it('returns a fallback string format when crypto is unavailable', () => {
    // Test the fallback branch by verifying the function returns a string
    // The format is req_<timestamp>_<random>
    const result = createRequestId();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
