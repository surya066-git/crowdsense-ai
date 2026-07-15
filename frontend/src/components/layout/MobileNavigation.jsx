import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { PRIMARY_NAVIGATION } from '../../constants/navigation.js';

const mobileItems = PRIMARY_NAVIGATION.slice(0, 5);

export function MobileNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentValue =
    mobileItems.find((item) =>
      item.path === '/'
        ? location.pathname === item.path
        : matchPath({ path: item.path, end: false }, location.pathname),
    )?.path || '/';

  return (
    <Paper className="mobile-navigation" elevation={8}>
      <BottomNavigation
        value={currentValue}
        onChange={(_event, value) => navigate(value)}
        showLabels
      >
        {mobileItems.map((item) => {
          const Icon = item.icon;

          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              value={item.path}
              icon={<Icon aria-hidden="true" />}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
