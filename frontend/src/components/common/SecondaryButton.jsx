import { Button } from '@mui/material';

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
