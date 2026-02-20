import { useRef, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { CircuitPattern, GradientOrb } from '../EngineeringPatterns';

// Map categories to relevant images
const categoryImages = {
  'Web': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'AI': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Cyber': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Game': 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Robotics': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
};

// Magnetic Button Component
function MagneticButton({ children, isActive, onClick, index, isVisible }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }}
      className={`sigs-magnetic-btn ${isActive ? 'active' : ''}`}
    >
      <motion.span
        style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span>{children}</span>
    </motion.button>
  );
}

export default function SIGsIntroSection({ activeCategory, onCategoryChange, sigs }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Get the first SIG from the active category
  const activeSIG = useMemo(() => {
    if (!sigs || sigs.length === 0) return null;
    if (activeCategory === 'All') {
      return sigs[0];
    }
    return sigs.find(sig => sig.category === activeCategory) || sigs[0];
  }, [sigs, activeCategory]);

  // Get image for current category
  const backgroundImage = useMemo(() => {
    if (activeSIG?.icon && activeSIG.icon.startsWith('http')) {
      return activeSIG.icon;
    }
    const categoryForImage = activeCategory === 'All' && activeSIG?.category 
      ? activeSIG.category 
      : activeCategory;
    return categoryImages[categoryForImage] || categoryImages['Web'];
  }, [activeSIG, activeCategory]);

  // Fixed category tabs with specific names
  const displayCategories = [
    { id: 'All', label: 'All' },
    { id: 'Web', label: 'Web Dev' },
    { id: 'Cyber', label: 'Cyber Security' },
    { id: 'Game', label: 'Game Dev' },
    { id: 'AI', label: 'AI Dev' },
    { id: 'Robotics', label: 'Robotics' },
  ];

  // 3D tilt effect for image
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);
  const imageXSpring = useSpring(imageX, { stiffness: 300, damping: 30 });
  const imageYSpring = useSpring(imageY, { stiffness: 300, damping: 30 });

  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = (e.clientY - centerY) / 20;
    const rotateY = (centerX - e.clientX) / 20;
    imageX.set(rotateX);
    imageY.set(rotateY);
  };

  const handleImageMouseLeave = () => {
    imageX.set(0);
    imageY.set(0);
  };

  return (
    <section ref={sectionRef} className="sigs-intro-section">
      {/* Background Elements */}
      <GradientOrb color="cyan" size="400" className="top-0 right-0 opacity-30" />
      <GradientOrb color="yellow" size="300" className="bottom-0 left-0 opacity-20" />
      <CircuitPattern className="opacity-5" />

      <div className="sigs-intro-inner">
        <motion.div 
          className="sigs-intro-buttons-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="sigs-intro-buttons">
            {displayCategories.map((category, index) => (
              <MagneticButton
                key={category.id}
                isActive={activeCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
                index={index}
                isVisible={isInView}
              >
                {category.label}
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        {/* When "All" is selected: grid of all SIGs */}
        {activeCategory === 'All' && sigs && sigs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="sigs-grid"
          >
            {sigs.map((sig, index) => (
              <motion.div
                key={sig._id || sig.sig || index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="sigs-card"
              >
                {sig.icon && (
                  <div className="sigs-card-icon">
                    <img
                      src={sig.icon}
                      alt=""
                      aria-hidden
                    />
                  </div>
                )}
                <h3 className="sigs-card-title">
                  {sig.name}
                </h3>
                {sig.category && (
                  <span className="sigs-card-category">
                    {sig.category}
                  </span>
                )}
                <p className="sigs-card-desc line-clamp-3">
                  {sig.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeCategory !== 'All' && (
        <div className="sigs-two-col">
          {/* Left Side: Text Block with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            key={activeCategory}
            className="sigs-text-block"
          >
            <div className="accent-bar" />
            <div className="sigs-text-content">
              {activeSIG ? (
                <>
                  <motion.h2 
                    className="sigs-detail-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={`title-${activeCategory}`}
                  >
                    {activeSIG.name}
                  </motion.h2>
                  <motion.p 
                    className="sigs-detail-desc"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    key={`desc-${activeCategory}`}
                  >
                    {activeSIG.description}
                  </motion.p>
                  <motion.p 
                    className="sigs-detail-para"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Join our community of developers and enthusiasts to explore cutting-edge technologies, 
                    collaborate on projects, and grow your skills in a supportive environment.
                  </motion.p>
                </>
              ) : (
                <p className="sigs-detail-desc">
                  Loading category information...
                </p>
              )}
            </div>
          </motion.div>

          {/* Right Side: Code Image with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            key={`image-${activeCategory}`}
            className="sigs-image-block"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            <motion.div
              style={{
                rotateX: imageXSpring,
                rotateY: imageYSpring,
                transformStyle: 'preserve-3d',
              }}
              className="image-inner"
            >
              {/* Background Image */}
              <div 
                className="sigs-image-bg"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="sigs-image-overlay" />
              </div>
              <div className="sigs-code-overlay">
                <div className="sigs-code-panel">
                  <div className="sigs-code-lines">
                    <div className="sigs-code-line">// {activeSIG?.name || 'SIG'} Component</div>
                    <div className="sigs-code-blue">
                      <span className="sigs-code-purple">const</span> handleJoin = 
                      <span className="sigs-code-yellow"> ()</span> =&gt; {'{'}
                    </div>
                    <div className="sigs-code-pl4 sigs-code-mt sigs-code-white">
                      <span className="sigs-code-purple">this</span>.
                      <span className="sigs-code-blue">props</span>.
                      <span className="sigs-code-blue">navigation</span>.
                      <span className="sigs-code-green">navigate</span>
                      <span className="sigs-code-yellow">('{activeSIG?.category || 'SIGs'}')</span>
                    </div>
                    <div className="sigs-code-blue">{'}'}</div>
                    <div className="sigs-code-mt sigs-code-line">// Component render</div>
                    <div className="sigs-code-white">
                      <span className="sigs-code-purple">return</span> (
                    </div>
                    <div className="sigs-code-pl4 sigs-code-line">
                      <span className="sigs-code-pink">&lt;</span>
                      <span className="sigs-code-pink">View</span>
                      <span className="sigs-code-pink">&gt;</span>
                    </div>
                    <div className="sigs-code-pl8 sigs-code-line">
                      <span className="sigs-code-pink">&lt;</span>
                      <span className="sigs-code-pink">Button</span>
                    </div>
                    <div className="sigs-code-pl12 sigs-code-white">
                      <span className="sigs-code-blue">title</span>=
                      <span className="sigs-code-green">"Join {activeSIG?.name || 'SIG'}"</span>
                    </div>
                    <div className="sigs-code-pl12 sigs-code-white">
                      <span className="sigs-code-blue">onPress</span>=
                      <span className="sigs-code-yellow">{'{'}handleJoin{'}'}</span>
                    </div>
                    <div className="sigs-code-pl8 sigs-code-line">
                      <span className="sigs-code-pink">/&gt;</span>
                    </div>
                    <div className="sigs-code-pl4 sigs-code-line">
                      <span className="sigs-code-pink">&lt;/</span>
                      <span className="sigs-code-pink">View</span>
                      <span className="sigs-code-pink">&gt;</span>
                    </div>
                    <div className="sigs-code-white">);</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        )}

      </div>
    </section>
  );
}
