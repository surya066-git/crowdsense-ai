import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SecondaryButton } from './SecondaryButton.jsx';

describe('SecondaryButton Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SecondaryButton />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <SecondaryButton />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
