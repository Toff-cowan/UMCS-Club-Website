import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CircuitPattern, NodeGraph, BinaryPattern, GradientOrb } from '../EngineeringPatterns';

export default function ExecHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSubtitle, setShowSubtitle] = useState(false);
  const location = useLocation();

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x: xPos, y: yPos });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show subtitle after title animation
  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/sigs', label: 'SIGs' },
    { path: '/about', label: 'ABOUT' },
    { path: '/projects', label: 'PROJECTS' },
    { path: '/exec', label: 'EXEC' },
  ];

  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const titleText = "EXEC";
  const subtitleText = "Leading the charge in innovation, collaboration, and community impact.";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-eng-bg pt-20">
      {/* Layered Background Elements */}
      <GradientOrb color="cyan" size="600" className="top-0 right-0" />
      <GradientOrb color="yellow" size="500" className="bottom-0 left-0" />
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
          filter: 'brightness(0.3) contrast(1.2)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
        }}
      />

      {/* Navigation Bar - Top Right with Magnetic Effect */}
      <nav className="absolute top-8 right-8 z-30">
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
                    transition-all duration-300 px-3 py-2 rounded
                    ${location.pathname === link.path
                      ? 'text-yellow-500'
                      : 'text-white hover:text-yellow-500'
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
                    className="absolute inset-0 bg-yellow-500/10 rounded -z-10"
                    initial={{ scale: 0, opacity: 0 }}
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
            className="text-white hover:text-yellow-500 transition-colors"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* Centered Title with Text Reveal */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Title - Letter by Letter Animation */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-display font-bold uppercase tracking-tighter mb-6">
            <span className="inline-block">
              {titleText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block text-yellow-500"
                  style={{
                    textShadow: '0 0 40px rgba(250, 204, 21, 0.8), 0 0 80px rgba(250, 204, 21, 0.4), 0 0 120px rgba(250, 204, 21, 0.2)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subtitle with Terminal Typing Effect */}
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="flex items-center justify-center gap-3 font-mono text-sm md:text-lg text-eng-cyan max-w-4xl mx-auto px-4">
                <motion.span
                  className="relative"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                >
                  {subtitleText}
                  <motion.span
                    className="inline-block w-0.5 h-5 bg-eng-cyan ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-eng-cyan/70 uppercase tracking-wider">Scroll</span>
          <motion.svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

