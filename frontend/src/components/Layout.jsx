// Layout component that shows how the navbar and footer are displayed on the page.
// It uses the Outlet component from react-router-dom to render the child routes between the Navbar and Footer components.

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Frame/Navbar';
import Footer from './Frame/Footer';
import MobileSidebar from './Frame/MobileSidebar';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isFullBleedPage = isHome || location.pathname === '/about' || location.pathname === '/sigs' || location.pathname === '/exec' || location.pathname === '/projects';
  const mainClassName = isFullBleedPage ? '' : 'main-with-nav';

  useEffect(() => {
    if (isHome) {
      document.body.classList.add('page-home');
    } else {
      document.body.classList.remove('page-home');
    }
    return () => document.body.classList.remove('page-home');
  }, [isHome]);

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
