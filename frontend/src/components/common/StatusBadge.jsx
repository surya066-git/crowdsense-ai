import PropTypes from 'prop-types';
import { Badge } from '@mui/material';

/**
 * A circular badge overlay for indicating status on icons or avatars.
 * Wraps MUI Badge with sensible defaults for color and variant.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The element the badge is anchored to.
 * @param {string} [props.color='primary'] - The badge color (MUI color key).
 * @param {'dot'|'standard'} [props.variant='dot'] - Badge display variant.
 * @returns {JSX.Element} An MUI Badge wrapping the children.
 * @example
 * <StatusBadge color="error">
 *   <NotificationsIcon />
 * </StatusBadge>
 */
export function StatusBadge({ children, color = 'primary', variant = 'dot' }) {
  return (
    <Badge color={color} variant={variant} overlap="circular">
      {children}
    </Badge>
  );
}

StatusBadge.propTypes = {
  /** The element the badge wraps and anchors to */
  children: PropTypes.node.isRequired,
  /** MUI color key for the badge */
  color: PropTypes.string,
  /** Badge display variant */
  variant: PropTypes.oneOf(['dot', 'standard']),
};
