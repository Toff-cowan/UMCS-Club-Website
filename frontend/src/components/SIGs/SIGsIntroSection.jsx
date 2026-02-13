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
        ...(isActive && {
          boxShadow: '0 0 20px rgba(234, 179, 8, 0.8), 0 0 40px rgba(234, 179, 8, 0.6), 0 0 60px rgba(234, 179, 8, 0.4)',
        }),
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
      className={`
        relative px-8 py-3 rounded-full font-display font-bold text-sm md:text-base
        transition-all duration-300 ease-out overflow-hidden
        ${isActive
          ? 'bg-yellow-500 text-black border-2 border-yellow-500 animate-pulseGlow'
          : 'bg-white/5 backdrop-blur-sm border-2 border-white/30 text-white hover:border-yellow-500 hover:text-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 hover:bg-white/10'
        }
      `}
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
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
    <section 
      ref={sectionRef}
      className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: '#0A0F2C' }}
    >
      {/* Background Elements */}
      <GradientOrb color="cyan" size="400" className="top-0 right-0 opacity-30" />
      <GradientOrb color="yellow" size="300" className="bottom-0 left-0 opacity-20" />
      <CircuitPattern className="opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Category Buttons Row */}
        <motion.div 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {sigs.map((sig, index) => (
              <motion.div
                key={sig._id || sig.sig || index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 hover:border-eng-cyan/40 hover:bg-white/10 transition-all duration-300"
              >
                {sig.icon && (
                  <div className="mb-4">
                    <img
                      src={sig.icon}
                      alt=""
                      className="h-12 w-12 object-contain"
                      aria-hidden
                    />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                  {sig.name}
                </h3>
                {sig.category && (
                  <span className="inline-block text-xs font-mono text-eng-cyan/90 uppercase tracking-wider mb-3">
                    {sig.category}
                  </span>
                )}
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-body line-clamp-3">
                  {sig.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Two Column Layout: Text and Image (when a specific category is selected) */}
        {activeCategory !== 'All' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Side: Text Block with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            key={activeCategory} // Force re-animation on category change
            className="relative group"
          >
         
            {/* Gradient accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-eng-yellow/50 via-eng-cyan/30 to-transparent rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-6">
              {activeSIG ? (
                <>
                  <motion.h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={`title-${activeCategory}`}
                  >
                    {activeSIG.name}
                  </motion.h2>
                  <motion.p 
                    className="text-white/90 text-lg md:text-xl leading-relaxed font-body"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    key={`desc-${activeCategory}`}
                  >
                    {activeSIG.description}
                  </motion.p>
                  <motion.p 
                    className="text-white/70 text-base md:text-lg leading-relaxed font-body"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Join our community of developers and enthusiasts to explore cutting-edge technologies, 
                    collaborate on projects, and grow your skills in a supportive environment.
                  </motion.p>
                </>
              ) : (
                <p className="text-white text-lg md:text-xl leading-relaxed font-body">
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
            className="relative group"
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            <motion.div
              style={{
                rotateX: imageXSpring,
                rotateY: imageYSpring,
                transformStyle: 'preserve-3d',
              }}
              className="relative rounded-lg overflow-hidden shadow-2xl transition-shadow duration-300 group-hover:shadow-eng-cyan/20"
            >
              {/* Background Image */}
              <div 
                className="w-full h-[300px] md:h-[350px] bg-cover bg-center bg-no-repeat relative"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
              >
                {/* Overlay */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: 'rgba(10, 15, 44, 0.4)',
                  }}
                ></div>
              </div>
              
              {/* Code Preview Overlay - Enhanced Glassmorphism */}
              <div className="absolute inset-0 p-6 md:p-8 font-mono text-xs md:text-sm text-white/95 z-10 pointer-events-none">
                <div className="h-full bg-gradient-to-br from-black/50 via-black/40 to-black/50 rounded-lg p-4 md:p-6 overflow-hidden backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-500 group-hover:border-eng-cyan/50 group-hover:shadow-eng-cyan/20">
                  <div className="space-y-1.5 leading-tight">
                    <div className="text-gray-400">// {activeSIG?.name || 'SIG'} Component</div>
                    <div className="text-blue-400">
                      <span className="text-purple-400">const</span> handleJoin = 
                      <span className="text-eng-yellow"> ()</span> =&gt; {'{'}
                    </div>
                    <div className="pl-4 text-white mt-1.5">
                      <span className="text-purple-400">this</span>.
                      <span className="text-blue-300">props</span>.
                      <span className="text-blue-300">navigation</span>.
                      <span className="text-green-400">navigate</span>
                      <span className="text-eng-yellow">('{activeSIG?.category || 'SIGs'}')</span>
                    </div>
                    <div className="text-blue-400">{'}'}</div>
                    <div className="mt-1.5 text-gray-400">// Component render</div>
                    <div className="text-white">
                      <span className="text-purple-400">return</span> (
                    </div>
                    <div className="pl-4 text-gray-300">
                      <span className="text-pink-400">&lt;</span>
                      <span className="text-pink-400">View</span>
                      <span className="text-pink-400">&gt;</span>
                    </div>
                    <div className="pl-8 text-gray-300">
                      <span className="text-pink-400">&lt;</span>
                      <span className="text-pink-400">Button</span>
                    </div>
                    <div className="pl-12 text-white">
                      <span className="text-blue-300">title</span>=
                      <span className="text-green-400">"Join {activeSIG?.name || 'SIG'}"</span>
                    </div>
                    <div className="pl-12 text-white">
                      <span className="text-blue-300">onPress</span>=
                      <span className="text-eng-yellow">{'{'}handleJoin{'}'}</span>
                    </div>
                    <div className="pl-8 text-gray-300">
                      <span className="text-pink-400">/&gt;</span>
                    </div>
                    <div className="pl-4 text-gray-300">
                      <span className="text-pink-400">&lt;/</span>
                      <span className="text-pink-400">View</span>
                      <span className="text-pink-400">&gt;</span>
                    </div>
                    <div className="text-white">);</div>
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
