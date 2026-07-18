import { renderHook } from '@testing-library/react';
import { usePageTitle } from './usePageTitle.js';

vi.mock('../config/env.js', () => ({
  env: {
    appName: 'Test App',
  },
}));

describe('usePageTitle', () => {
  let originalTitle;

  beforeEach(() => {
    originalTitle = document.title;
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('should set document title to title + appName when title is provided', () => {
    renderHook(() => usePageTitle('Test Page'));
    expect(document.title).toBe('Test Page | Test App');
  });

  it('should set document title to appName when title is not provided', () => {
    renderHook(() => usePageTitle(''));
    expect(document.title).toBe('Test App');
  });
  
  it('should update document title when title changes', () => {
    const { rerender } = renderHook(({ title }) => usePageTitle(title), {
      initialProps: { title: 'First Title' }
    });
    expect(document.title).toBe('First Title | Test App');

    rerender({ title: 'Second Title' });
    expect(document.title).toBe('Second Title | Test App');
  });
});
