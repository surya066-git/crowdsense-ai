import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProblemSection } from './ProblemSection.jsx';

describe('ProblemSection Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ProblemSection />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <ProblemSection />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
