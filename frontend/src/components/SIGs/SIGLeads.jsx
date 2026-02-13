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
      <section 
        ref={sectionRef}
        className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor: '#0A0F2C' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-lg">Loading SIG Leads...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        ref={sectionRef}
        className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor: '#0A0F2C' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-lg">Error loading SIG Leads: {error}</p>
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
    <section 
      ref={sectionRef}
      className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: '#0A0F2C' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eng-cyan/5 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            SIG Leads
          </h2>
          <p className="text-white/70 text-lg md:text-xl font-body max-w-2xl mx-auto">
            Meet the passionate leaders driving innovation in each Special Interest Group
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative flex justify-center items-center min-h-[500px] md:min-h-[550px]">
          {/* Desktop: Carousel with 3 cards */}
          <div className="hidden md:block relative w-full max-w-5xl mx-auto">
            <div className="relative h-[450px]">
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
                  />
                );
              })}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {leads.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-yellow-500 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to lead ${index + 1}`}
                />
              ))}
            </div>

            {/* Shuffle Button */}
            <div className="flex justify-center mt-6">
              <motion.button
                onClick={handleShuffle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border-2 border-yellow-500/50 hover:border-yellow-500 text-yellow-500 font-display font-bold uppercase tracking-wider rounded-full transition-all duration-300"
              >
                Next Lead
              </motion.button>
            </div>
          </div>

          {/* Mobile: Stacked Cards */}
          <div className="md:hidden w-full space-y-6">
            {visibleLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-full max-w-sm mx-auto"
              >
                <div className="grid place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md">
                  <img
                    src={`https://i.pravatar.cc/128?img=${lead.avatarId || lead.id}`}
                    alt={`Avatar of ${lead.lead}`}
                    className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
                  />
                  <span className="text-center text-lg italic text-slate-400">"{lead.quote}"</span>
                  <div className="text-center space-y-1">
                    <span className="text-center text-sm font-medium text-indigo-400 block">{lead.lead}</span>
                    {lead.sig && <span className="text-center text-xs text-slate-500 block">{lead.sig}</span>}
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

