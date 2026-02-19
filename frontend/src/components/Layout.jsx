// Layout component that shows how the navbar and footer are displayed on the page.
// It uses the Outlet component from react-router-dom to render the child routes between the Navbar and Footer components.

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Frame/Navbar';
import Footer from './Frame/Footer';
import MobileSidebar from './Frame/MobileSidebar';

const Layout = () => {
  const location = useLocation();
  // Full-bleed hero on SIGs/Exec: no top padding so hero fills viewport
  const isFullBleedPage = location.pathname === '/sigs' || location.pathname === '/exec';
  const mainClassName = isFullBleedPage ? '' : 'pt-20';

  return (
    <>
      <Navbar />
      <MobileSidebar />
      <main className={mainClassName}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
