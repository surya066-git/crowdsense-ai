import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { UploadHistory } from './UploadHistory';
import { getUploadHistory, deleteUpload } from '../../services/uploadService';
import { useSnackbar } from '../../hooks/useSnackbar';
import { formatTimeAgo } from '../../utils/timeFormatter';

vi.mock('../../services/uploadService', () => ({
  getUploadHistory: vi.fn(),
  deleteUpload: vi.fn(),
}));

vi.mock('../../hooks/useSnackbar', () => ({
  useSnackbar: vi.fn(),
}));

vi.mock('../../utils/timeFormatter', () => ({
  formatTimeAgo: vi.fn(),
}));

describe('UploadHistory', () => {
  const mockShowSnackbar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useSnackbar.mockReturnValue({ showSnackbar: mockShowSnackbar });
    formatTimeAgo.mockReturnValue('2 hours ago');
  });

  it('renders loading state initially', () => {
    // To see loading state we need to prevent promise resolution temporarily
    let resolvePromise;
    const promise = new Promise(resolve => { resolvePromise = resolve; });
    getUploadHistory.mockReturnValue(promise);

    render(<UploadHistory refreshTrigger={0} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    resolvePromise({ data: [] });
  });

  it('renders empty state when no history', async () => {
    getUploadHistory.mockResolvedValueOnce({ data: [] });

    render(<UploadHistory refreshTrigger={0} />);
    
    await waitFor(() => {
      expect(screen.getByText('No uploads found.')).toBeInTheDocument();
    });
  });

  it('renders history correctly', async () => {
    const mockData = [
      { id: 1, fileName: 'crowd.csv', status: 'SUCCESS', createdAt: '2023-01-01T00:00:00Z' },
      { id: 2, fileName: 'gates.csv', status: 'ERROR', createdAt: '2023-01-02T00:00:00Z' },
    ];
    getUploadHistory.mockResolvedValueOnce({ data: mockData });

    render(<UploadHistory refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('crowd.csv')).toBeInTheDocument();
      expect(screen.getByText('gates.csv')).toBeInTheDocument();
    });
    
    expect(screen.getByText('SUCCESS')).toBeInTheDocument();
    expect(screen.getByText('ERROR')).toBeInTheDocument();
    expect(screen.getAllByText('2 hours ago').length).toBe(2);
  });

  it('handles fetch error gracefully', async () => {
    getUploadHistory.mockRejectedValueOnce(new Error('Fetch error'));

    render(<UploadHistory refreshTrigger={0} />);

    await waitFor(() => {
      expect(mockShowSnackbar).toHaveBeenCalledWith('Failed to fetch upload history', 'error');
    });
  });

  it('handles delete action correctly', async () => {
    const mockData = [
      { id: 1, fileName: 'crowd.csv', status: 'SUCCESS', createdAt: '2023-01-01T00:00:00Z' },
    ];
    getUploadHistory.mockResolvedValueOnce({ data: mockData });
    getUploadHistory.mockResolvedValueOnce({ data: [] }); // For refetch
    deleteUpload.mockResolvedValueOnce({});

    render(<UploadHistory refreshTrigger={0} />);

    await waitFor(() => {
      expect(screen.getByText('crowd.csv')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUpload).toHaveBeenCalledWith(1);
      expect(mockShowSnackbar).toHaveBeenCalledWith('Upload record deleted', 'success');
      expect(getUploadHistory).toHaveBeenCalledTimes(2);
    });
  });
});
