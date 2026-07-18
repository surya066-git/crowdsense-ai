import React from 'react';
import { renderHook } from '@testing-library/react';
import { useSnackbar } from './useSnackbar.js';
import { AppSnackbarContext } from '../contexts/AppSnackbarContextValue.js';

describe('useSnackbar', () => {
  it('should return the context value', () => {
    const mockContextValue = {
      showSnackbar: vi.fn(),
      hideSnackbar: vi.fn(),
    };

    const wrapper = ({ children }) => (
      <AppSnackbarContext.Provider value={mockContextValue}>
        {children}
      </AppSnackbarContext.Provider>
    );

    const { result } = renderHook(() => useSnackbar(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });
});
