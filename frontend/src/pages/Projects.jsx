import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

/**
 * Projects Page
 * Fetches project data from backend and displays in a paginated grid.
 * Cards match the Home page project card style.
 */

// Minimal mock fallback if backend is unavailable
const mockProjects = new Array(9).fill(0).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  description: `Short description for project ${i + 1}`,
}));

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(mockProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const introRef = useRef(null);
  const [introVisible, setIntroVisible] = useState(false);

  const [flippedId, setFlippedId] = useState(null);

  const handleCardClick = (e, id) => {
    e.stopPropagation();
    setFlippedId((prev) => (prev === id ? null : id));
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  useEffect(() => {
    setFlippedId(null);
  }, [currentPage]);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIntroVisible(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Please ensure backend is running and exposes /api/projects
        const res = await fetch('http://localhost:5000/api/projects');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // backend may return { success: true, data: [...] } or an array
        const list = Array.isArray(data) ? data : data.data || [];
        if (list.length) setProjects(list);
      } catch (err) {
        console.warn('Could not load projects from backend, using mock data', err);
        setError(err.message);
        setProjects(mockProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero-background" aria-hidden="true" />
        <div className="projects-hero-overlay">
          <div className="projects-hero-grid" aria-hidden="true" />
        </div>
        <h1 className="projects-hero-title">Projects</h1>
      </section>

      {/* Purpose / intro section */}
      <section className="projects-intro" ref={introRef}>
        <div className="projects-intro-ribbon" aria-hidden="true" />
        <p className={`projects-intro-text ${introVisible ? 'projects-intro-text-visible' : ''}`}>
          This page showcases projects built by our club members—from web apps and games to tools and experiments.
          Browse below to see what we’re working on and get inspired to start your own.
        </p>
      </section>

      <main className="lt-main">
        {loading && <div className="lt-loading">Loading projects...</div>}
        {error && <div className="lt-error">Backend error: {error}</div>}

        {/* Grid: Home-style cards with flip to show description + date */}
        <section className="lt-grid">
          {projects.slice((currentPage - 1) * 6, currentPage * 6).map((p, idx) => {
            const id = p._id || p.id || idx + (currentPage - 1) * 6;
            const isFlipped = flippedId === id;
            const createdDate = p.createdAt ? new Date(p.createdAt).toLocaleDateString() : null;
            return (
              <div
                key={id}
                className={`project-card-flip ${isFlipped ? 'flipped' : ''}`}
                onClick={(e) => handleCardClick(e, id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e, id)}
                aria-label={isFlipped ? 'Flip card to front' : 'Flip card for full details'}
              >
                <div className={`project-card-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front: same as Home – image, title, short description, status */}
                  <div className="project-card project-card-front">
                    {(p.image || p.img) ? (
                      <div
                        className="project-image"
                        style={{ backgroundImage: `url(${p.image || p.img})` }}
                      />
                    ) : (
                      <div className="project-image project-image-placeholder" />
                    )}
                    <div className="project-content">
                      <h3 className="project-title">{p.title || p.name || 'Untitled'}</h3>
                      {p.description && (
                        <p className="project-description">{p.description}</p>
                      )}
                      {p.status && (
                        <span className={`project-status project-status-${p.status.toLowerCase()}`}>
                          {p.status}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Back: full description + date */}
                  <div className="project-card project-card-back">
                    <div className="project-back-content">
                      <p className="project-description-full">{p.description || 'No description.'}</p>
                      {createdDate && <p className="project-date">{createdDate}</p>}
                    </div>
                    <button
                      type="button"
                      className="project-view-detail"
                      onClick={(e) => { e.stopPropagation(); handleProjectClick(id); }}
                    >
                      View project
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      {/* Pagination controls */}
      {projects.length > 6 && (
        <div className="lt-pagination">
          <button
            className="lt-page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="lt-page-indicators">
            {Array.from({ length: Math.ceil(projects.length / 6) }).map((_, i) => (
              <button
                key={i}
                className={`lt-page-dot ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className="lt-page-btn"
            onClick={() => setCurrentPage((p) => Math.min(Math.ceil(projects.length / 6), p + 1))}
            disabled={currentPage === Math.ceil(projects.length / 6)}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
      </main>
    </div>
  );
}