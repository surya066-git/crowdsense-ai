import { Box } from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle.js';

// Import Home Page Components
import { HeroSection } from '../components/home/HeroSection.jsx';
import { ProblemSection } from '../components/home/ProblemSection.jsx';
import { SolutionSection } from '../components/home/SolutionSection.jsx';
import { FeaturesSection } from '../components/home/FeaturesSection.jsx';
import { HowItWorksSection } from '../components/home/HowItWorksSection.jsx';
import { TechStackSection } from '../components/home/TechStackSection.jsx';
import { WhyUsSection } from '../components/home/WhyUsSection.jsx';
import { CtaSection } from '../components/home/CtaSection.jsx';

export default function HomePage() {
  usePageTitle('Home');

  return (
    <Box component="main" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechStackSection />
      <WhyUsSection />
      <CtaSection />
    </Box>
  );
}
