import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFetch } from '@/hooks/useFetch';
import { getSIGLeads } from '@/services/api';
import { TestimonialCard } from './TestimonialCard';

export default function SIGLeads() {
  const { data: leads, loading, error } = useFetch(getSIGLeads);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-cycle through leads
  useEffect(() => {
    if (!leads || leads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leads.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [leads]);

  const handleShuffle = () => {
    if (!leads || leads.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % leads.length);
  };

  const getImage = (lead) => (lead.image && String(lead.image).trim()) || null;

  // Get the 3 cards to display (current, next, next+1)
  const getVisibleCards = () => {
    if (!leads || leads.length === 0) return [];
    const visible = [];
    for (let i = 0; i < Math.min(3, leads.length); i++) {
      const index = (currentIndex + i) % leads.length;
      visible.push({ ...leads[index], originalIndex: index });
    }
    return visible;
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="sigs-leads-section">
        <div className="sigs-leads-inner">
          <p className="sigs-loading-text">Loading SIG Leads...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="sigs-leads-section">
        <div className="sigs-leads-inner">
          <p className="sigs-error-text">Error loading SIG Leads: {error}</p>
        </div>
      </section>
    );
  }

  if (!leads || leads.length === 0) {
    return null;
  }

  // Show only the first 3 leads for mobile view
  const visibleLeads = leads.slice(0, Math.min(3, leads.length));

  return (
    <section ref={sectionRef} className="sigs-leads-section">
      <div className="sigs-leads-bg" aria-hidden="true" />
      <div className="sigs-leads-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="sigs-leads-header"
        >
          <h2 className="sigs-leads-title">SIG Leads</h2>
          <p className="sigs-leads-subtitle">
            Meet the passionate leaders driving innovation in each Special Interest Group
          </p>
        </motion.div>

        <div className="sigs-leads-carousel">
          <div className="sigs-leads-desktop">
            <div className="sigs-leads-cards-wrap">
              {getVisibleCards().map((lead, displayIndex) => {
                const position = displayIndex === 0 ? 'front' : displayIndex === 1 ? 'middle' : 'back';
                return (
                  <TestimonialCard
                    key={lead.id}
                    handleShuffle={handleShuffle}
                    testimonial={lead.quote}
                    position={position}
                    id={lead.avatarId || lead.id}
                    author={lead.lead}
                    sig={lead.sig}
                    image={getImage(lead)}
                  />
                );
              })}
            </div>

            <div className="sigs-leads-dots">
              {leads.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`sigs-leads-dot ${index === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to lead ${index + 1}`}
                />
              ))}
            </div>

            <div className="sigs-leads-shuffle-wrap">
              <motion.button
                type="button"
                onClick={handleShuffle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="sigs-leads-shuffle-btn"
              >
                Next Lead
              </motion.button>
            </div>
          </div>

          <div className="sigs-leads-mobile">
            {visibleLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="sigs-leads-mobile-card-wrap"
              >
                <div className="sigs-leads-mobile-card">
                  {getImage(lead) ? (
                    <img
                      src={getImage(lead)}
                      alt={`Avatar of ${lead.lead}`}
                    />
                  ) : (
                    <div className="sigs-leads-mobile-avatar-placeholder" aria-hidden="true" />
                  )}
                  <span className="sigs-leads-mobile-quote">"{lead.quote}"</span>
                  <div className="sigs-leads-mobile-meta">
                    <span className="name">{lead.lead}</span>
                    {lead.sig && <span className="sig">{lead.sig}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

