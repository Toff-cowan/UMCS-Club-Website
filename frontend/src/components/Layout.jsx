//This the layout file that shows how the navbar and footer are displayed on the page.
// It uses the Outlet component from react-router-dom to render the child routes between the Navbar and Footer components.

import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
<>
    <Navbar/>
    <main>
            <Outlet />
    </main>
        <Footer/>
</>
      
  );
};

export default Layout
