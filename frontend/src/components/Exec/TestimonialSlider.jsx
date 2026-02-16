import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialSlider({ reviews = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

  // Auto-advance slider
  useEffect(() => {
    if (reviews.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [reviews.length]);

  const goToSlide = (index) => {
    if (index > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(index);
    // Reset auto-advance timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center text-white py-20">
        <p>No executives to display.</p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Slider */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-8 md:p-12"
          >
            {/* Image Section */}
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={currentReview.imageSrc || `https://i.pravatar.cc/300?img=${currentReview.id}`}
                  alt={currentReview.name}
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover object-top border-4 border-yellow-500/50 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-cyan-500/20 blur-xl -z-10"></div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {currentReview.name}
                </h3>
                <p className="text-xl md:text-2xl text-yellow-500 font-body font-semibold">
                  {currentReview.affiliation}
                </p>
              </div>

              <blockquote className="text-lg md:text-xl text-white/90 font-body leading-relaxed italic max-w-2xl">
                "{currentReview.quote}"
              </blockquote>

              {/* Social Links */}
              {(currentReview.linkedin || currentReview.portfolio) && (
                <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                  {currentReview.linkedin && (
                    <motion.a
                      href={currentReview.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white hover:text-blue-500 transition-colors duration-300"
                      aria-label={`${currentReview.name}'s LinkedIn`}
                    >
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </motion.a>
                  )}
                  {currentReview.portfolio && (
                    <motion.a
                      href={currentReview.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white hover:text-teal-400 transition-colors duration-300"
                      aria-label={`${currentReview.name}'s Portfolio`}
                    >
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {reviews.length > 1 && (
          <>
            <motion.button
              onClick={goToPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
              aria-label="Previous executive"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
              aria-label="Next executive"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-4 mt-8 overflow-x-auto pb-4">
          {reviews.map((review, index) => (
            <motion.button
              key={review.id}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex-shrink-0 relative rounded-full overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-yellow-500 scale-110'
                  : 'border-white/30 hover:border-yellow-500/50'
              }`}
              aria-label={`Go to ${review.name}`}
            >
              <img
                src={review.thumbnailSrc || review.imageSrc || `https://i.pravatar.cc/100?img=${review.id}`}
                alt={review.name}
                className="w-16 h-16 md:w-20 md:h-20 object-cover object-top"
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-yellow-500/20"
                  layoutId="activeThumbnail"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* Dots Indicator */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-500 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

