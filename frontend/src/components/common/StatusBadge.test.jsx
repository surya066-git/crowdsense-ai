import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StatusBadge } from './StatusBadge.jsx';

describe('StatusBadge Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <StatusBadge />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <StatusBadge />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
