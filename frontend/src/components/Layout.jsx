// Layout component that shows how the navbar and footer are displayed on the page.
// It uses the Outlet component from react-router-dom to render the child routes between the Navbar and Footer components.

import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from './Frame/Navbar';
import Footer from './Frame/Footer';
import MobileSidebar from './Frame/MobileSidebar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <MobileSidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
