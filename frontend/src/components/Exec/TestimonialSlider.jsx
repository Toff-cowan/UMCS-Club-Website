import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
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
      <div className="exec-slider-empty">
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
    <div className="exec-slider-wrap">
      <div className="exec-slider-main">
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
            className="exec-slider-slide"
          >
            <div className="exec-slider-image-wrap">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative' }}
              >
                <img
                  src={currentReview.imageSrc || `https://i.pravatar.cc/300?img=${currentReview.id}`}
                  alt={currentReview.name}
                  className="exec-slider-image"
                />
              </motion.div>
            </div>

            <div className="exec-slider-content">
              <div className="exec-slider-content-inner">
                <div>
                  <h3 className="exec-slider-name">
                    {currentReview.name}
                  </h3>
                  <p className="exec-slider-position">
                    {currentReview.affiliation}
                  </p>
                </div>

                <blockquote className="exec-slider-quote">
                  "{currentReview.quote}"
                </blockquote>

                {(currentReview.linkedin || currentReview.portfolio) && (
                <div className="exec-slider-socials">
                  {currentReview.linkedin && (
                    <motion.a
                      href={currentReview.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="exec-slider-social-link"
                      aria-label={`${currentReview.name}'s LinkedIn`}
                    >
                      <svg
                        className="exec-slider-social-link"
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
                      className="exec-slider-social-link"
                      aria-label={`${currentReview.name}'s Portfolio`}
                    >
                      <svg
                        className="exec-slider-social-link"
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
              className="exec-slider-nav-btn prev"
              aria-label="Previous executive"
            >
              <svg
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
              className="exec-slider-nav-btn next"
              aria-label="Next executive"
            >
              <svg
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
        <div className="exec-slider-thumbnails">
          {reviews.map((review, index) => (
            <motion.button
              key={review.id}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`exec-slider-thumb ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to ${review.name}`}
            >
              <img
                src={review.thumbnailSrc || review.imageSrc || `https://i.pravatar.cc/100?img=${review.id}`}
                alt={review.name}
                alt={review.name}
              />
              {index === currentIndex && (
                <motion.div
                  style={{ position: 'absolute', inset: 0, background: 'rgba(250, 204, 21, 0.2)' }}
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
        <div className="exec-slider-dots">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`exec-slider-dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

