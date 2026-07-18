import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StatusChip } from './StatusChip.jsx';

describe('StatusChip Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <StatusChip />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <StatusChip />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
