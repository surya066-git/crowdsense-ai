import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WhyUsSection } from './WhyUsSection.jsx';

describe('WhyUsSection Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <WhyUsSection />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <WhyUsSection />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
