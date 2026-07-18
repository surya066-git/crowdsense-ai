import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HowItWorksSection } from './HowItWorksSection.jsx';

describe('HowItWorksSection Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <HowItWorksSection />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <HowItWorksSection />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
