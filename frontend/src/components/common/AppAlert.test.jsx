import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppAlert } from './AppAlert.jsx';

describe('AppAlert Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AppAlert />
      </MemoryRouter>,
    );
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <AppAlert />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
