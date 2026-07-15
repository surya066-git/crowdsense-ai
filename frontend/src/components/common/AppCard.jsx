import { Card, CardContent } from '@mui/material';

export function AppCard({ children, className = '', ...props }) {
  return (
    <Card className={`app-card ${className}`.trim()} {...props}>
      <CardContent className="app-card-content">{children}</CardContent>
    </Card>
  );
}
