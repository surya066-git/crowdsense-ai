import { Badge } from '@mui/material';

export function StatusBadge({ children, color = 'primary', variant = 'dot' }) {
  return (
    <Badge color={color} variant={variant} overlap="circular">
      {children}
    </Badge>
  );
}
