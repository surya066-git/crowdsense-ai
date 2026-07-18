import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

/**
 * A configurable modal dialog wrapping MUI Dialog.
 * Renders an optional title, content slot, and actions slot.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Whether the dialog is currently visible.
 * @param {string} [props.title] - Optional dialog title text.
 * @param {React.ReactNode} props.children - The main dialog body content.
 * @param {React.ReactNode} [props.actions] - Optional action buttons shown in the dialog footer.
 * @param {Function} props.onClose - Callback fired when the dialog requests to be closed.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.maxWidth='sm'] - Maximum width of the dialog.
 * @returns {JSX.Element} A full-width MUI Dialog component.
 * @example
 * <AppDialog
 *   open={isOpen}
 *   title="Confirm Action"
 *   onClose={handleClose}
 *   actions={<PrimaryButton onClick={handleConfirm}>Confirm</PrimaryButton>}
 * >
 *   Are you sure you want to proceed?
 * </AppDialog>
 */
export function AppDialog({ open, title, children, actions, onClose, maxWidth = 'sm' }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
}

AppDialog.propTypes = {
  /** Whether the dialog is open */
  open: PropTypes.bool.isRequired,
  /** Optional dialog title */
  title: PropTypes.string,
  /** Dialog body content */
  children: PropTypes.node.isRequired,
  /** Optional action buttons for the dialog footer */
  actions: PropTypes.node,
  /** Callback when dialog closes */
  onClose: PropTypes.func.isRequired,
  /** Maximum width breakpoint */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
