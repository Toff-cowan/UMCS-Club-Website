import { useMemo } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getExecutives } from '@/services/api';
import ExecHero from '@/components/Exec/ExecHero';
import TestimonialSlider from '@/components/Exec/TestimonialSlider';
import { motion } from 'framer-motion';
import '../App.css';
import '../index.css';
import './Exec.css';

export default function Exec() {
  const { data: executives, loading, error } = useFetch(getExecutives);

  // Transform executive data to Review[] format
  const reviews = useMemo(() => {
    if (!executives || executives.length === 0) return [];
    return executives.map((exec) => ({
      id: exec.id || exec._id,
      name: exec.name,
      affiliation: exec.position,
      quote: exec.quote || exec.bio || "",
      imageSrc: exec.image,
      thumbnailSrc: exec.image,
      linkedin: exec.linkedin,
      portfolio: exec.portfolio,
    }));
  }, [executives]);

  if (loading) {
    return (
      <div className="exec-page-wrap">
        <ExecHero />
        <div className="exec-loading-wrap">
          <p className="exec-loading-text-wrap">Loading executives...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="exec-page-wrap">
        <ExecHero />
        <div className="exec-loading-wrap">
          <p className="exec-error-text-wrap">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exec-page-wrap">
      <ExecHero />

      <section className="exec-section-wrap">
        <div className="exec-section-bg" aria-hidden="true" />
        {/* Floating code snippets background (low opacity) */}
        <div className="exec-code-snippets-bg" aria-hidden="true">
          <pre className="exec-code-snippet exec-code-snippet-1"><code>{`const lead = execs.find(e => e.role === 'President');`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-2"><code>{`<ExecutiveCard name={exec.name} />`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-3"><code>{`function getLeaders() { return execs; }`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-4"><code>{`export default Exec;`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-5"><code>{`position: 'President'`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-6"><code>{`// Executive Highlights`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-7"><code>{`reviews.map(r => <Slide key={r.id} />)`}</code></pre>
          <pre className="exec-code-snippet exec-code-snippet-8"><code>{`useFetch(getExecutives)`}</code></pre>
        </div>

        <div className="exec-section-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="exec-section-header-wrap"
          >
            <h2 className="exec-section-title-wrap">
              Executive Highlights
            </h2>
            <p className="exec-section-subtitle-wrap">
              Get to know the dedicated leaders shaping the future of our computing community
            </p>
          </motion.div>

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
    </div>
  );
}

