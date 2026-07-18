import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UploadPage from './UploadPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/upload/UploadCard.jsx', () => ({
  UploadCard: () => <div data-testid="upload-card" />
}));

vi.mock('../components/upload/UploadHistory.jsx', () => ({
  UploadHistory: () => <div data-testid="upload-history" />
}));

describe('UploadPage', () => {
  it('renders correctly', () => {
    render(<MemoryRouter><UploadPage /></MemoryRouter>);
    expect(screen.getByText('Upload Synthetic Data')).toBeInTheDocument();
  });
});
