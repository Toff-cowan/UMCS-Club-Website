import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GradientOrb } from './components/EngineeringPatterns';
import { getExecutives, getEvents } from './services/api';
import './About.css';




const About = () => {
  const [executives, setExecutives] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [executivesError, setExecutivesError] = useState(null);
  const [eventsLoading, setEventsLoading] = useState(true);
  const descriptionRef = useRef(null);


//Mock data to test executives section <-----here
  

  // Lead executive (President or Vice President) in center; others in circle
  const president = executives.find(exec =>
    exec.position && (exec.position.toLowerCase() === 'president' || exec.position.toLowerCase() === 'vice president')
  );
  const members = executives.filter(exec => exec !== president);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        setExecutivesError(null);
        const data = await getExecutives();
        setExecutives(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching executives:', error);
        setExecutivesError(error.message || 'Failed to load executives');
        setExecutives([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExecutives();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setCurrentEventIndex(0);
  }, [events.length]);

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
              The Computing Club is a community of tech enthusiasts exploring computer science, coding, 
              and digital innovation. Our mission is to inspire creativity and problem-solving skills through hands-on projects, workshops, and discussions on topics such as programming, 
              web development, artificial intelligence, cybersecurity, and robotics.
            </p>
            <p>
             Whether you're a beginner or a seasoned coder, we offer a collaborative space to grow your skills, compete in hackathons, 
             and gain real-world experience in the digital field.
            </p>
            <div className="meeting-time-box">
              <h3>Meeting Time:</h3>
              <p>📅 Every Thursday at 2:00 PM </p>
              <p>📍 Computing Lecture Room</p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events – side carousel with arrows */}
      <section className="about-events">
        <h2 className="about-events-title">NEWS & EVENTS</h2>
        {eventsLoading ? (
          <p className="about-events-loading">Loading events…</p>
        ) : events.length === 0 ? (
          <p className="about-events-empty">No events at this time. Check back soon!</p>
        ) : (
          <div className="about-events-carousel">
            <button
              type="button"
              className="about-events-arrow about-events-arrow-prev"
              onClick={() => setCurrentEventIndex((i) => (i - 1 + events.length) % events.length)}
              aria-label="Previous event"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="about-events-track">
              {events.map((event, index) => (
                <article
                  key={event._id}
                  className={`about-event-card ${index === currentEventIndex ? 'about-event-card-active' : ''}`}
                  aria-hidden={index !== currentEventIndex}
                >
                  {event.image && (
                    <div
                      className="about-event-image"
                      style={{ backgroundImage: `url(${event.image})` }}
                      role="img"
                      aria-label={event.title}
                    />
                  )}
                  <div className="about-event-body">
                    <h3 className="about-event-title">{event.title}</h3>
                    {event.description && (
                      <p className="about-event-description">{event.description}</p>
                    )}
{(event.date || event.createdAt) && (
                    <time className="about-event-date" dateTime={event.date || event.createdAt}>
                      {new Date(event.date || event.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="about-events-arrow about-events-arrow-next"
              onClick={() => setCurrentEventIndex((i) => (i + 1) % events.length)}
              aria-label="Next event"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="about-events-dots">
              {events.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`about-events-dot ${idx === currentEventIndex ? 'active' : ''}`}
                  onClick={() => setCurrentEventIndex(idx)}
                  aria-label={`Go to event ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Executives Section */}
      <section className="about-executive">
        <div className="about-code-snippets-bg" aria-hidden="true">
          <pre className="about-code-snippet about-code-snippet-1"><code>{`const lead = execs.find(e => e.role === 'President');`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-2"><code>{`<ExecutiveCard name={exec.name} />`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-3"><code>{`function getLeaders() { return execs; }`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-4"><code>{`export default About;`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-5"><code>{`position: 'President'`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-6"><code>{`// Meet the team`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-7"><code>{`fetch('/api/executives')`}</code></pre>
          <pre className="about-code-snippet about-code-snippet-8"><code>{`about-hero`}</code></pre>
        </div>

        <div className="about-executive-inner">
          <h2>MEET THE EXECUTIVES</h2>

        {loading ? (
          <div className="loading">Loading executives...</div>
        ) : executivesError ? (
          <div className="loading" style={{ color: 'var(--color-muted)' }}>{executivesError}</div>
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
        </div>
      </section>
    </div>
  );
};

export default About;