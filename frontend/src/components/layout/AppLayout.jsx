import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';
import { MobileNavigation } from './MobileNavigation.jsx';
import { Footer } from './Footer.jsx';

export function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <div className="app-content">
          <Outlet />
          <Footer />
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
}
