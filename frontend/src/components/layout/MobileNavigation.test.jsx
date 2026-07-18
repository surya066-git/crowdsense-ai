import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MobileNavigation } from './MobileNavigation.jsx';

describe('MobileNavigation Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <MobileNavigation />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
