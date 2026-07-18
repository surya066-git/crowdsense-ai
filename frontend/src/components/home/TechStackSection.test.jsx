import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TechStackSection } from './TechStackSection.jsx';

describe('TechStackSection Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <TechStackSection />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <TechStackSection />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
