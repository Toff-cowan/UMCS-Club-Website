import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CircuitPattern, GradientOrb } from '../EngineeringPatterns';

const Footer = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Meet the team' },
  ];

  return (
    <footer 
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: '#0A0F2C' }}
    >
      {/* Background Elements */}
      <GradientOrb color="cyan" size="500" className="top-0 right-0 opacity-20" />
      <GradientOrb color="yellow" size="400" className="bottom-0 left-0 opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Logo Area - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            {/* Circuit Logo/Emblem */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 60 60" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-eng-cyan"
              >
                {/* Animated circuit nodes and lines */}
                <motion.circle 
                  cx="15" 
                  cy="15" 
                  r="3" 
                  fill="currentColor"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.circle 
                  cx="45" 
                  cy="15" 
                  r="3" 
                  fill="currentColor"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle 
                  cx="15" 
                  cy="45" 
                  r="3" 
                  fill="currentColor"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.circle 
                  cx="45" 
                  cy="45" 
                  r="3" 
                  fill="currentColor"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
                <motion.circle 
                  cx="30" 
                  cy="30" 
                  r="4" 
                  fill="currentColor"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <line x1="15" y1="15" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="45" y1="15" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="15" y1="45" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                <line x1="45" y1="45" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </motion.div>
            
            {/* Text */}
            <div className="flex flex-col">
              <motion.span
                className="text-white font-display font-bold text-2xl md:text-3xl uppercase tracking-tight"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                COMPUTING
              </motion.span>
              <motion.span
                className="text-eng-cyan font-display font-bold text-2xl md:text-3xl uppercase tracking-tight"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                SOCIETY
              </motion.span>
            </div>
          </motion.div>

          {/* Navigation and CTA - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row items-center gap-8"
          >
            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-white font-body text-sm md:text-base hover:text-eng-cyan transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-eng-cyan"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <motion.a 
                href="https://wa.me/yournumber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-eng-cyan transition-colors duration-200"
                aria-label="WhatsApp"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </motion.a>
              <motion.a 
                href="https://instagram.com/yourhandle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-eng-cyan transition-colors duration-200"
                aria-label="Instagram"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </motion.a>
            </div>

            {/* Join Us Button */}
            <motion.button 
              className="bg-teal-500 hover:bg-teal-600 text-white font-display font-bold uppercase tracking-wider px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-teal-500/50 relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative z-10">Join Us!!!</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
