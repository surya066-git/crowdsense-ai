import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PrimaryButton } from './PrimaryButton.jsx';

describe('PrimaryButton Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <PrimaryButton />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <PrimaryButton />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
