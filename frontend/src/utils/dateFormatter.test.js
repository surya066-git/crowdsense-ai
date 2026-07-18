import { formatDate } from './dateFormatter';

describe('formatDate', () => {
  it('returns "Not available" when value is falsy', () => {
    expect(formatDate(null)).toBe('Not available');
    expect(formatDate(undefined)).toBe('Not available');
    expect(formatDate('')).toBe('Not available');
  });

  it('formats valid date string with default locale', () => {
    const dateStr = '2023-10-25T10:00:00Z';
    const result = formatDate(dateStr);
    expect(result).toMatch(/Oct 25, 2023/);
  });

  it('formats valid date object with default locale', () => {
    const dateObj = new Date('2023-10-25T10:00:00Z');
    const result = formatDate(dateObj);
    expect(result).toMatch(/Oct 25, 2023/);
  });
});
