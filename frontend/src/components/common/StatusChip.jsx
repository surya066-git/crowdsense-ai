import { Chip } from '@mui/material';
import { formatStatusLabel, getStatusTone } from '../../utils/statusFormatter.js';

export function StatusChip({ status, label }) {
  return (
    <Chip
      className="status-chip"
      color={getStatusTone(status)}
      label={label || formatStatusLabel(status)}
      size="small"
    />
  );
}
