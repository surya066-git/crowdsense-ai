import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SolutionSection } from './SolutionSection.jsx';

describe('SolutionSection Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <SolutionSection />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <SolutionSection />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
