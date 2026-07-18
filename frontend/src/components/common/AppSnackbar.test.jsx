import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppSnackbar } from './AppSnackbar.jsx';

describe('AppSnackbar Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AppSnackbar />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <AppSnackbar />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
