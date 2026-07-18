import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppDialog } from './AppDialog.jsx';

describe('AppDialog Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AppDialog />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <AppDialog />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
