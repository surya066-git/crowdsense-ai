import { Button } from '@mui/material';

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
