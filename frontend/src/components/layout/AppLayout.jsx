import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Sidebar } from './Sidebar.jsx';
import { MobileNavigation } from './MobileNavigation.jsx';
import { Footer } from './Footer.jsx';
import GlobalLoader from '../loading/GlobalLoader.jsx';

export function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <div className="app-content">
          <Suspense fallback={<GlobalLoader />}>
            <Outlet />
          </Suspense>
          <Footer />
        </div>
      </div>
      <MobileNavigation />
    </div>
  );
}
