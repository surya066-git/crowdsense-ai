import { NavLink } from 'react-router-dom';
import { PRIMARY_NAVIGATION } from '../../constants/navigation.js';

export function Sidebar() {
  return (
    <aside className="app-sidebar" aria-label="Desktop navigation">
      <nav className="sidebar-nav">
        {PRIMARY_NAVIGATION.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              className="sidebar-link"
              to={item.path}
              end={item.path === '/'}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
