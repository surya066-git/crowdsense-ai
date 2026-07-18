import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppCard } from './AppCard.jsx';

describe('AppCard Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AppCard />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <AppCard />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
