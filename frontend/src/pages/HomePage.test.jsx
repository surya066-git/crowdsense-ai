import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../components/home/HeroSection.jsx', () => ({ HeroSection: () => <div data-testid="hero-section" /> }));
vi.mock('../components/home/ProblemSection.jsx', () => ({ ProblemSection: () => <div data-testid="problem-section" /> }));
vi.mock('../components/home/SolutionSection.jsx', () => ({ SolutionSection: () => <div data-testid="solution-section" /> }));
vi.mock('../components/home/FeaturesSection.jsx', () => ({ FeaturesSection: () => <div data-testid="features-section" /> }));
vi.mock('../components/home/HowItWorksSection.jsx', () => ({ HowItWorksSection: () => <div data-testid="how-it-works-section" /> }));
vi.mock('../components/home/TechStackSection.jsx', () => ({ TechStackSection: () => <div data-testid="tech-stack-section" /> }));
vi.mock('../components/home/WhyUsSection.jsx', () => ({ WhyUsSection: () => <div data-testid="why-us-section" /> }));
vi.mock('../components/home/CtaSection.jsx', () => ({ CtaSection: () => <div data-testid="cta-section" /> }));

describe('HomePage', () => {
  it('renders all sections', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('problem-section')).toBeInTheDocument();
  });
});
