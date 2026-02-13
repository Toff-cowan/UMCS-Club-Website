// Layout component that shows how the navbar and footer are displayed on the page.
// It uses the Outlet component from react-router-dom to render the child routes between the Navbar and Footer components.

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Frame/Navbar';
import Footer from './Frame/Footer';
import MobileSidebar from './Frame/MobileSidebar';

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/sigs' && location.pathname !== '/exec';
  const mainClassName = location.pathname === '/sigs' || location.pathname === '/exec' ? '' : 'pt-20';

  return (
    <>
      {showNavbar && <Navbar />}
      <MobileSidebar />
      <main className={mainClassName}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
