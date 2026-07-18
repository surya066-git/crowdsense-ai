import PropTypes from 'prop-types';
import { Button } from '@mui/material';

/**
 * A styled secondary (outlined) action button wrapping MUI Button.
 * Uses the application's primary color with an outlined variant.
 * @component
 * @param {Object} props - Props forwarded to the MUI Button component.
 * @param {React.ReactNode} props.children - The button label or content.
 * @returns {JSX.Element} A styled secondary MUI Button.
 * @example
 * <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
 */
export function SecondaryButton({ children, ...props }) {
  return (
    <Button
      className="app-button app-button-secondary"
      variant="outlined"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
}

SecondaryButton.propTypes = {
  /** The button label or content */
  children: PropTypes.node.isRequired,
};
