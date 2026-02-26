import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {FaLinkedin,FaGithub,FaInstagram,FaTimes,FaBars,FaHome,FaUsers,FaInfoCircle,FaFolderOpen,FaUserTie} from 'react-icons/fa';
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
            <Link to="/" onClick={() => setIsOpen(false)}>
              <FaHome className="mobile-sidebar-link-icon" />
              <span>Home</span>
            </Link>
            <Link to="/sigs" onClick={() => setIsOpen(false)}>
              <FaUsers className="mobile-sidebar-link-icon" />
              <span>SIGs</span>
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              <FaInfoCircle className="mobile-sidebar-link-icon" />
              <span>About</span>
            </Link>
            <Link to="/projects" onClick={() => setIsOpen(false)}>
              <FaFolderOpen className="mobile-sidebar-link-icon" />
              <span>Projects</span>
            </Link>
            <Link to="/exec" onClick={() => setIsOpen(false)}>
              <FaUserTie className="mobile-sidebar-link-icon" />
              <span>Exec</span>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="mobile-sidebar-socials">
            <a
              href="https://www.linkedin.com/in/uwimonacs/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={() => setIsOpen(false)}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/UMCS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={() => setIsOpen(false)}
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/uwimonacs?igsh=NDgyNnN5amY2eGE1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              onClick={() => setIsOpen(false)}
            >
              <FaInstagram />
            </a>
          </div>

        </div>
      </nav>
    </>
  );
};

export default MobileSidebar;
