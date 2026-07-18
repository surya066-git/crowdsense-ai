import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FeaturesSection } from './FeaturesSection.jsx';

describe('FeaturesSection Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <FeaturesSection />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <FeaturesSection />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
