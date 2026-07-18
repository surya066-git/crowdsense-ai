import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import { FiTrash2, FiFileText } from 'react-icons/fi';
import { getUploadHistory, deleteUpload } from '../../services/uploadService.js';
import { useSnackbar } from '../../hooks/useSnackbar.js';
import { formatTimeAgo } from '../../utils/timeFormatter.js';

export function UploadHistory({ refreshTrigger }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getUploadHistory();
      setHistory(res.data || []);
    } catch (error) {
      showSnackbar('Failed to fetch upload history', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getUploadHistory()
      .then((res) => {
        if (isMounted) {
          setHistory(res.data || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          showSnackbar('Failed to fetch upload history', 'error');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger, showSnackbar]);

  const handleDelete = async (id) => {
    try {
      await deleteUpload(id);
      showSnackbar('Upload record deleted', 'success');
      fetchHistory();
    } catch (error) {
      showSnackbar('Failed to delete record', 'error');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 4, borderRadius: 4, border: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Recent Uploads
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : history.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          <Typography variant="body2">No uploads found.</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FiFileText color="#757575" />
                      <Typography variant="body2" fontWeight={500}>
                        {row.fileName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={row.status === 'SUCCESS' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatTimeAgo(new Date(row.createdAt))}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="Delete entry" size="small" color="error" onClick={() => handleDelete(row.id)}>
                      <FiTrash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
