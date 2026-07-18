import PropTypes from 'prop-types';
import { Card, CardContent } from '@mui/material';

/**
 * A styled card wrapper using MUI Card with consistent padding and styling.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Card content.
 * @param {string} [props.className=''] - Additional CSS class names.
 * @returns {JSX.Element} A styled MUI Card with CardContent.
 * @example
 * <AppCard>
 *   <Typography>Card Content</Typography>
 * </AppCard>
 */
export function AppCard({ children, className = '', ...props }) {
  return (
    <Card className={`app-card ${className}`.trim()} {...props}>
      <CardContent className="app-card-content">{children}</CardContent>
    </Card>
  );
}

AppCard.propTypes = {
  /** Card content to display */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string,
};
