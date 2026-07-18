import { formatTime, formatDuration, formatTimeAgo } from './timeFormatter';

describe('formatTime', () => {
  it('returns "Not available" when value is falsy', () => {
    expect(formatTime(null)).toBe('Not available');
    expect(formatTime(undefined)).toBe('Not available');
    expect(formatTime('')).toBe('Not available');
  });

  it('formats valid date string with default locale', () => {
    const date = new Date('2023-10-25T10:30:00Z');
    const result = formatTime(date, 'en-US');
    expect(typeof result).toBe('string');
  });
});

describe('formatDuration', () => {
  it('returns "Not available" for non-finite values', () => {
    expect(formatDuration(null)).toBe('Not available');
    expect(formatDuration(undefined)).toBe('Not available');
    expect(formatDuration('10')).toBe('Not available');
    expect(formatDuration(NaN)).toBe('Not available');
  });

  it('formats duration under 60 minutes', () => {
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(59.4)).toBe('59 min');
  });

  it('formats duration exactly 60 minutes or more', () => {
    expect(formatDuration(60)).toBe('1 hr');
    expect(formatDuration(125)).toBe('2 hr 5 min');
  });
});

describe('formatTimeAgo', () => {
  it('returns "Unknown" when date is not provided', () => {
    expect(formatTimeAgo(null)).toBe('Unknown');
  });

  it('returns correct time ago string', () => {
    const now = Date.now();
    expect(formatTimeAgo(new Date(now - 30 * 1000))).toBe('30 seconds ago');
    expect(formatTimeAgo(new Date(now - 2 * 60 * 1000))).toBe('2 minutes ago');
    expect(formatTimeAgo(new Date(now - 2 * 60 * 60 * 1000))).toBe('2 hours ago');
    expect(formatTimeAgo(new Date(now - 2 * 24 * 60 * 60 * 1000))).toBe('2 days ago');
    expect(formatTimeAgo(new Date(now - 2 * 30 * 24 * 60 * 60 * 1000))).toMatch(/months? ago/);
    expect(formatTimeAgo(new Date(now - 2 * 365 * 24 * 60 * 60 * 1000))).toMatch(/years? ago/);
  });
});
