import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/sigs', label: 'SIGs' },
    { path: '/about', label: 'ABOUT' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/exec', label: 'EXEC' },
  ];

  return (
    <nav className="fixed top-8 right-8 z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`
                  relative text-sm font-display font-bold uppercase tracking-wider
                  transition-all duration-300 px-3 py-2 rounded border-2 border-transparent
                  ${location.pathname === link.path
                    ? 'text-yellow-500 border-yellow-500'
                    : 'text-white hover:text-yellow-500 hover:border-yellow-500'
                  }
                `}
              >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-500"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                <motion.span
                  className="absolute inset-0 bg-eng-yellow/10 rounded -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-yellow-500 transition-colors relative z-50"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 right-0 bg-black/95 backdrop-blur-xl rounded-lg p-4 min-w-[180px] border border-white/10 shadow-2xl"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block py-3 text-sm font-display font-bold uppercase tracking-wider
                      transition-all duration-300 relative border-l-2 border-transparent pl-3
                      ${location.pathname === link.path
                        ? 'text-yellow-500 border-yellow-500'
                        : 'text-white hover:text-yellow-500 hover:border-yellow-500'
                      }
                    `}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.span
                        className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"
                        layoutId="mobileActiveTab"
                        initial={false}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
