import { lightTheme, darkTheme } from './theme';

describe('theme', () => {
  it('creates lightTheme with correct properties', () => {
    expect(lightTheme).toBeDefined();
    expect(lightTheme.palette.mode).toBe('light');
    expect(lightTheme.shape.borderRadius).toBe(8);
  });

  it('creates darkTheme with dark mode palette', () => {
    expect(darkTheme).toBeDefined();
    expect(darkTheme.palette.mode).toBe('dark');
    expect(darkTheme.palette.background.default).toBe('#0F172A');
  });
});
