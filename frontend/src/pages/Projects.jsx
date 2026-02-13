import { useEffect, useState } from 'react';
//import './Projects.css';
import Tile from '../components/Frame/Tile.jsx';

/**
 * Projects Page
 * Fetches project data from backend and displays in a paginated grid using Tile component.
 * Shows loading and error states. Uses mock data if backend is unavailable.
*/

// Minimal mock fallback if backend is unavailable
const mockProjects = new Array(9).fill(0).map((_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  description: `Short description for project ${i + 1}`,
}));

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <main className="lt-main">
      {loading && <div className="lt-loading">Loading projects...</div>}
      {error && <div className="lt-error">Backend error: {error}</div>}

      {/* Grid for current page (9 items per page) */}
      <section className="lt-grid">
        {projects.slice((currentPage - 1) * 9, currentPage * 9).map((p, idx) => (
          <Tile
            key={p._id || p.id || idx + (currentPage - 1) * 9}
            project={p}
          />
        ))}
      </section>

      {/* Pagination controls */}
      {projects.length > 9 && (
        <div className="lt-pagination">
          {/** previous button **/}
          <button
            className="lt-page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </button>

          {/** page indicators **/}
          <div className="lt-page-indicators">
            {Array.from({ length: Math.ceil(projects.length / 9) }).map((_, i) => (
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

          {/** next button **/}
          <button
            className="lt-page-btn"
            onClick={() => setCurrentPage((p) => Math.min(Math.ceil(projects.length / 9), p + 1))}
            disabled={currentPage === Math.ceil(projects.length / 9)}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}