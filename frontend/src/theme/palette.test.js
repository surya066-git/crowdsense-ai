import { palette } from './palette';

describe('palette', () => {
  it('exports an object with primary and secondary colors', () => {
    expect(palette).toBeDefined();
    expect(palette.primary).toBeDefined();
    expect(palette.secondary).toBeDefined();
    expect(palette.primary.main).toBe('#0B5FFF');
    expect(palette.secondary.main).toBe('#00A896');
  });

  it('contains expected status colors', () => {
    expect(palette.success.main).toBe('#16A34A');
    expect(palette.warning.main).toBe('#F59E0B');
    expect(palette.error.main).toBe('#DC2626');
  });

  it('contains background colors', () => {
    expect(palette.background.default).toBe('#F6F8FB');
    expect(palette.background.paper).toBe('#FFFFFF');
  });
});
