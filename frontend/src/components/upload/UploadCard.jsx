import { useState, useRef } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Stack, Alert, useTheme } from '@mui/material';
import { FiUploadCloud, FiFile, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import { uploadFile } from '../../services/uploadService.js';

export function UploadCard({ onUploadSuccess }) {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('IDLE'); // IDLE, UPLOADING, SUCCESS, ERROR
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile) => {
    const validNames = ['crowd.csv', 'gates.csv', 'incidents.csv', 'weather.json'];
    if (!validNames.includes(selectedFile.name)) {
      setErrorMessage(`Invalid file. Please upload one of: ${validNames.join(', ')}`);
      return false;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit.');
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        setStatus('IDLE');
        setErrorMessage('');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setStatus('IDLE');
        setErrorMessage('');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus('UPLOADING');
    setProgress(0);
    setErrorMessage('');

    try {
      await uploadFile(file, (percentCompleted) => {
        setProgress(percentCompleted);
      });
      setStatus('SUCCESS');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      setStatus('ERROR');
      setErrorMessage(error.response?.data?.message || error.message || 'Upload failed');
    }
  };

  const resetUpload = () => {
    setFile(null);
    setStatus('IDLE');
    setProgress(0);
    setErrorMessage('');
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
      {status === 'SUCCESS' ? (
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center', py: 4 }}>
          <FiCheckCircle size={64} color={theme.palette.success.main} />
          <Typography variant="h5" fontWeight={700}>Upload Successful!</Typography>
          <Typography color="text.secondary">The dataset has been parsed and stored.</Typography>
          <Button variant="outlined" onClick={resetUpload} startIcon={<FiRefreshCw />}>
            Upload Another File
          </Button>
        </Stack>
      ) : (
        <>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Upload Dataset
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Supported files: crowd.csv, gates.csv, incidents.csv, weather.json
          </Typography>

          <Box
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: `2px dashed ${dragActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
              borderRadius: 3,
              p: 6,
              textAlign: 'center',
              bgcolor: dragActive ? 'primary.50' : 'grey.50',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'primary.50',
                borderColor: 'primary.main'
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            {file ? (
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <FiFile size={48} color={theme.palette.primary.main} />
                <Typography fontWeight={600}>{file.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {(file.size / 1024).toFixed(1)} KB
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <FiUploadCloud size={48} color={theme.palette.text.secondary} />
                <Typography fontWeight={600}>
                  Drag & Drop or <span style={{ color: theme.palette.primary.main }}>Browse</span>
                </Typography>
              </Stack>
            )}
          </Box>

          {status === 'ERROR' && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {status === 'UPLOADING' && (
            <Box sx={{ mt: 3 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }} mb={1}>
                <Typography variant="body2" fontWeight={600}>Uploading {file?.name}...</Typography>
                <Typography variant="body2">{progress}%</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
            </Box>
          )}

          <Stack direction="row" spacing={2} mt={4} sx={{ justifyContent: 'flex-end' }}>
            {file && status !== 'UPLOADING' && (
              <Button color="inherit" onClick={(e) => { e.stopPropagation(); resetUpload(); }}>
                Cancel
              </Button>
            )}
            <Button
              variant="contained"
              onClick={(e) => { e.stopPropagation(); handleUpload(); }}
              disabled={!file || status === 'UPLOADING'}
              sx={{ px: 4, borderRadius: '50px' }}
            >
              {status === 'UPLOADING' ? 'Uploading...' : 'Upload File'}
            </Button>
          </Stack>
        </>
      )}
    </Paper>
  );
}
