import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { formatStatusLabel, getStatusTone } from '../../utils/statusFormatter.js';

/**
 * Displays a color-coded status chip derived from a status variant key.
 * The color and label are automatically determined from the status value.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.status - The status variant key (e.g., 'READY', 'DANGER', 'WARNING').
 * @param {string} [props.label] - Optional override label; uses formatted status if omitted.
 * @returns {JSX.Element} A small MUI Chip with status-derived color and label.
 * @example
 * <StatusChip status="READY" />
 * <StatusChip status="DANGER" label="Critical" />
 */
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

StatusChip.propTypes = {
  /** The status variant key used to determine the chip color */
  status: PropTypes.string.isRequired,
  /** Optional custom label; falls back to formatted status label */
  label: PropTypes.string,
};
