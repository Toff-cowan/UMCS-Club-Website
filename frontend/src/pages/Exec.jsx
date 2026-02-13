import { useMemo } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getExecutives } from '@/services/api';
import ExecHero from '@/components/Exec/ExecHero';
import TestimonialSlider from '@/components/Exec/TestimonialSlider';
import { motion } from 'framer-motion';

export default function Exec() {
  const { data: executives, loading, error } = useFetch(getExecutives);

  // Transform executive data to Review[] format
  const reviews = useMemo(() => {
    if (!executives || executives.length === 0) return [];
    return executives.map((exec) => ({
      id: exec.id,
      name: exec.name,
      affiliation: exec.position,
      quote: exec.bio,
      imageSrc: exec.image,
      thumbnailSrc: exec.image,
      linkedin: exec.linkedin,
      portfolio: exec.portfolio,
    }));
  }, [executives]);

  if (loading) {
    return (
      <>
        <ExecHero />
        <div className="flex justify-center items-center min-h-screen bg-eng-bg">
          <p className="text-center text-xl text-white">Loading executives...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ExecHero />
        <div className="flex justify-center items-center min-h-screen bg-eng-bg">
          <p className="text-center text-xl text-red-600">Error: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <ExecHero />

      {/* Executive Slider Section */}
      <section className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-eng-bg">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eng-cyan/5 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              Executive Highlights
            </h2>
            <p className="text-white/70 text-lg md:text-xl font-body max-w-2xl mx-auto">
              Get to know the dedicated leaders shaping the future of our computing community
            </p>
          </motion.div>

          {/* Testimonial Slider */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TestimonialSlider reviews={reviews} />
          </motion.div>
        </div>
      </section>
    </>
  );
}

