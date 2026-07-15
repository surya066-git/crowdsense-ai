import { Skeleton } from '@mui/material';
import { AppCard } from '../common/AppCard.jsx';

export function SkeletonCard() {
  return (
    <AppCard className="skeleton-card">
      <Skeleton variant="text" width="40%" height={28} />
      <Skeleton variant="rounded" height={96} />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="55%" />
    </AppCard>
  );
}
