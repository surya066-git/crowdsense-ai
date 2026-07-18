import PropTypes from 'prop-types';
import { Button } from '@mui/material';

/**
 * A styled primary action button wrapping MUI Button.
 * Uses the application's primary color theme with contained variant.
 * @component
 * @param {Object} props - Props forwarded to the MUI Button component.
 * @param {React.ReactNode} props.children - The button label or content.
 * @returns {JSX.Element} A styled primary MUI Button.
 * @example
 * <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
 */
export function PrimaryButton({ children, ...props }) {
  return (
    <Button
      className="app-button app-button-primary"
      variant="contained"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
}

PrimaryButton.propTypes = {
  /** The button label or content */
  children: PropTypes.node.isRequired,
};
