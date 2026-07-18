import { AppSnackbarContext } from './AppSnackbarContextValue';

describe('AppSnackbarContextValue', () => {
  it('should create context with default showSnackbar and closeSnackbar functions', () => {
    expect(AppSnackbarContext).toBeDefined();
    expect(AppSnackbarContext._currentValue.showSnackbar).toBeInstanceOf(Function);
    expect(AppSnackbarContext._currentValue.closeSnackbar).toBeInstanceOf(Function);
    
    // Verify default functions don't throw
    expect(() => AppSnackbarContext._currentValue.showSnackbar()).not.toThrow();
    expect(() => AppSnackbarContext._currentValue.closeSnackbar()).not.toThrow();
  });
});
