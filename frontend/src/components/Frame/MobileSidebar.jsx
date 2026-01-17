import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaTimes, FaBars } from 'react-icons/fa';
import './MobileSidebar.css';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-sidebar') && !event.target.closest('.mobile-menu-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Toggle Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay */}
      <div 
        className={`mobile-sidebar-overlay ${isOpen ? 'visible' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <nav className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-content">
          {/* Close Button */}
          <button 
            className="mobile-sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Navigation Links */}
          <div className="mobile-sidebar-links">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/resources" onClick={() => setIsOpen(false)}>Resources</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link to="/exec" onClick={() => setIsOpen(false)}>Meet the Team</Link>
          </div>

          {/* Social Icons */}
          <div className="mobile-sidebar-socials">
            <a 
              href="#" 
              aria-label="WhatsApp"
              onClick={() => setIsOpen(false)}
            >
              <FaWhatsapp />
            </a>
            <a 
              href="#" 
              aria-label="Instagram"
              onClick={() => setIsOpen(false)}
            >
              <FaInstagram />
            </a>
          </div>

          {/* CTA Button */}
          <button 
            className="mobile-sidebar-cta"
            onClick={() => setIsOpen(false)}
          >
            Join Us!!!
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileSidebar;
