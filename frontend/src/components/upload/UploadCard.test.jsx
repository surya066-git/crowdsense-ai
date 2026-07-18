import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UploadCard } from './UploadCard';
import { uploadFile } from '../../services/uploadService';
import { ThemeProvider, createTheme } from '@mui/material';

vi.mock('../../services/uploadService', () => ({
  uploadFile: vi.fn(),
}));

const renderWithTheme = (component) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('UploadCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithTheme(<UploadCard onUploadSuccess={vi.fn()} />);
    expect(screen.getByText('Upload Dataset')).toBeInTheDocument();
    expect(screen.getByText('Supported files: crowd.csv, gates.csv, incidents.csv, weather.json')).toBeInTheDocument();
  });

  it('handles invalid file type selection', async () => {
    renderWithTheme(<UploadCard onUploadSuccess={vi.fn()} />);
    const file = new File(['dummy content'], 'invalid.txt', { type: 'text/plain' });
    
    // MUI input type="file" is hidden, we can select it by some means, or we can use test-id if present.
    // The input is rendered as <input type="file" style="display: none;" />
    // We can query it by type="file" since it's the only one.
    // Actually, screen.getByLabelText usually works if there's a label, but here there's none.
    // Let's use document.querySelector.
    const input = document.querySelector('input[type="file"]');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText(/Invalid file. Please upload one of:/)).toBeInTheDocument();
    });
  });

  it('handles valid file selection and successful upload', async () => {
    const onUploadSuccess = vi.fn();
    uploadFile.mockResolvedValueOnce();

    renderWithTheme(<UploadCard onUploadSuccess={onUploadSuccess} />);
    const file = new File(['dummy content'], 'crowd.csv', { type: 'text/csv' });
    
    const input = document.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('crowd.csv')).toBeInTheDocument();
    });

    const uploadButton = screen.getByText('Upload File');
    fireEvent.click(uploadButton);

    expect(screen.getByText('Uploading crowd.csv...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Upload Successful!')).toBeInTheDocument();
    });
    
    expect(onUploadSuccess).toHaveBeenCalled();
  });

  it('handles valid file selection and failed upload', async () => {
    uploadFile.mockRejectedValueOnce(new Error('Network Error'));

    renderWithTheme(<UploadCard onUploadSuccess={vi.fn()} />);
    const file = new File(['dummy content'], 'weather.json', { type: 'application/json' });
    
    const input = document.querySelector('input[type="file"]');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('weather.json')).toBeInTheDocument();
    });

    const uploadButton = screen.getByText('Upload File');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText('Network Error')).toBeInTheDocument();
    });
  });
});
