import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GradientOrb } from './components/EngineeringPatterns';
import './About.css';




const About = () => {
  const [executives, setExecutives] = useState([]);
  const [loading, setLoading] = useState(true);
  const descriptionRef = useRef(null);


//Mock data to test executives section <-----here
  

  // Lead executive (President or Vice President) in center; others in circle
  const president = executives.find(exec =>
    exec.position && (exec.position.toLowerCase() === 'president' || exec.position.toLowerCase() === 'vice president')
  );
  const members = executives.filter(exec => exec !== president);

  useEffect(() => {
    // Fetch execs from database
    const fetchExecutives = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/executives');
        const data = await response.json();
        setExecutives(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching executives:', error);
        // Fallback to mock data if fetch fails
        setExecutives([]);
        setLoading(false);
      }
    };

    fetchExecutives();
  }, []);

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };
  const titleText = 'ABOUT';

  return (
    <div className="about-container">
      {/* Hero Section – match SIGs color and theme */}
      <section className="about-hero">
        <GradientOrb color="yellow" size="500" className="about-hero-orb-bottom" />
        <motion.div
          className="about-hero-bg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            filter: 'brightness(0.3) contrast(1.2)',
          }}
        />
        <div className="about-hero-overlay">
          <div className="about-hero-grid" aria-hidden="true" />
        </div>
        <div className="about-hero-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="about-hero-title-wrap"
          >
            <h1 className="about-hero-title">
              <span>
                {titleText.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="about-hero-title-letter"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>
        </div>
        <motion.button
          type="button"
          className="about-hero-scroll"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          onClick={() => descriptionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to content"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="about-hero-scroll-inner"
          >
            <span className="about-hero-scroll-text">Scroll</span>
            <motion.svg
              className="about-hero-scroll-icon"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </motion.button>
      </section>

      {/* Description Section */}
      <section className="about-description" ref={descriptionRef}>
        <div className="about-grid">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" 
              alt="Coding"
              className="description-image"
            />
          </div>
          <div className="description-text">
            <p>
              The Computing Club is a dynamic group of tech enthusiasts dedicated to exploring the ever-evolving 
              world of computer science, coding, and digital innovation. Our mission is to inspire creativity, 
              teamwork, and problem-solving skills through hands-on projects, workshops, and discussions on topics 
              such as programming, web development, artificial intelligence, cybersecurity, and robotics.
            </p>
            <p>
              Whether you're a beginner eager to learn or an experienced coder looking to collaborate, the club 
              provides a supportive environment to sharpen your skills and bring ideas to life. Members have 
              opportunities to participate in hackathons, coding challenges, and community tech events, helping 
              them gain real-world experience and confidence in the digital field
            </p>
            <div className="meeting-time-box">
              <h3>Meeting Time:</h3>
              <p>📅 Every Thursday at 2:00 PM </p>
              <p>📍 Computing Lecture Room</p>
            </div>
          </div>
        </div>
      </section>
    {/* Executives Section */}
    {/* Executives Section */}
      <section className="about-executive">
        
        <h2>MEET THE EXECUTIVES</h2>
        
        {loading ? (
          <div className="loading">Loading executives...</div>
        ) : (
          <div className="executive-grid">
            {/* President */}
            {president && (
              <div className="executive-member main">
                <img src={president.image || 'path-to-main-executive.jpg'} alt={president.position || 'Lead'} />
                <div className="member-info">
                  <h3>{president.name}</h3>
                  <p>{president.position}</p>
                </div>
              </div>
            )}

            {/* Other Execs */}
            {members.map((member, index) => {
              const baseAngle = -90; // rotations start from top
              const angle = baseAngle + (360 / members.length) * index;
              return (
                <div 
                  key={member._id || index} 
                  className="executive-member"
                  style={{ 
                    '--rotation-angle': `${angle}deg`,
                    animationDelay: `${-(20 / members.length) * index}s`
                  }}
                >
                  <img src={member.image || '/default-avatar.jpg'} alt="Member" />
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p>{member.position}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default About;