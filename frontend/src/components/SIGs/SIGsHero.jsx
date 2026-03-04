import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GradientOrb } from '../EngineeringPatterns';

export default function SIGsHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSubtitle, setShowSubtitle] = useState(false);

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

  const titleText = "SIGS";
  const subtitleText = "BUILD. BREAK. INNOVATE.";

  return (
    <div className="sigs-hero-wrap">
      <GradientOrb color="cyan" size="600" className="top-0 right-0" />
      <GradientOrb color="yellow" size="500" className="bottom-0 left-0" />
      
      <motion.div 
        className="sigs-hero-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            filter: 'brightness(0.3) contrast(1.2)',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
          }}
      />
      <div className="sigs-hero-grid" aria-hidden="true" />

      <div className="sigs-hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Title - Letter by Letter Animation */}
          <h1 className="sigs-hero-title">
            <span className="inline-block">
              {titleText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ transformStyle: 'preserve-3d' }}
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
              <div className="sigs-hero-subtitle-wrap">
                <motion.span
                  className="relative"
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                >
                  {subtitleText}
                  <motion.span
                    className="inline-block"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="sigs-hero-scroll"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="sigs-hero-scroll-inner"
        >
          <span className="sigs-hero-scroll-text">Scroll</span>
          <motion.svg
            className="sigs-hero-scroll-icon"
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
