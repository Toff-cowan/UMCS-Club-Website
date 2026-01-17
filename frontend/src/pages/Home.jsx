import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import clubLogo from "../assets/UMCS Logo.png";

const Home = () => {
  const navigate = useNavigate();
  const [president, setPresident] = useState(null);
  const [presidentLoading, setPresidentLoading] = useState(true);
  const [sigs, setSigs] = useState([]);
  const [sigsLoading, setSigsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const sliderRef = useRef(null);
  const projectsSliderRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isCardHoveredRef = useRef(false);
  const [showRestartArrow, setShowRestartArrow] = useState(false);
  const eventIntervalRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const fetchPresident = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/executives");
        if (!response.ok) {
          throw new Error(`Failed to fetch executives: ${response.status}`);
        }
        const executives = await response.json();
        
        // Find the president - search for exact match (case-insensitive)
        const presidentData = executives.find((exec) => {
          if (!exec || !exec.position) return false;
          // Normalize the position string: trim whitespace and convert to lowercase
          const normalizedPosition = exec.position.trim().toLowerCase();
          return normalizedPosition === "president";
        });

        if (presidentData) {
          // Image URL is now a full web URL from the backend
          setPresident(presidentData);
          console.log("Found president:", presidentData.name);
        } else {
          console.warn("No president found in executives list. Available positions:", 
            executives.map(e => e.position));
          // Fallback to first executive if no president is found
          if (executives.length > 0) {
            setPresident(executives[0]);
          }
        }
        setPresidentLoading(false);
      } catch (error) {
        console.error("Error fetching president:", error);
        setPresidentLoading(false);
      }
    };

    const fetchSIGs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sigs");
        if (!response.ok) {
          throw new Error(`Failed to fetch SIGs: ${response.status}`);
        }
        const sigsData = await response.json();
        setSigs(sigsData);
        setSigsLoading(false);
      } catch (error) {
        console.error("Error fetching SIGs:", error);
        setSigsLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }
        const eventsData = await response.json();
        setEvents(eventsData);
        setEventsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventsLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        const projectsData = await response.json();
        setProjects(projectsData);
        setProjectsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsLoading(false);
      }
    };

    fetchPresident();
    fetchSIGs();
    fetchEvents();
    fetchProjects();
  }, []);

  // Auto-scroll slider - smooth scrolling through all SIGs
  useEffect(() => {
    if (sigs.length === 0 || !sliderRef.current) return;

    const slider = sliderRef.current;
    const scrollSpeed = 0.6; // Pixels per frame (smooth scroll)
    
    const scroll = () => {
      // Pause if any card is being hovered
      if (isCardHoveredRef.current) {
        animationFrameRef.current = requestAnimationFrame(scroll);
        return;
      }
      
      // Calculate max scroll position
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      
      // Check if we've reached the end
      if (slider.scrollLeft >= maxScroll - 1) {
        // Reached the end - show restart arrow and stop scrolling
        setShowRestartArrow(true);
        // Keep animation running to check for restart
        animationFrameRef.current = requestAnimationFrame(scroll);
        return;
      } else {
        // Hide arrow if not at end
        setShowRestartArrow(false);
      }
      
      // Increment scroll smoothly
      slider.scrollLeft += scrollSpeed;
      
      // Continue animation
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sigs]);

  // Auto-cycle through events
  useEffect(() => {
    if (events.length === 0) return;

    eventIntervalRef.current = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // Change event every 5 seconds

    return () => {
      if (eventIntervalRef.current) {
        clearInterval(eventIntervalRef.current);
      }
    };
  }, [events]);

  // Mouse-based parallax effect for hero section
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroSectionRef.current) {
        const heroSection = heroSectionRef.current;
        const rect = heroSection.getBoundingClientRect();
        const background = document.getElementById('hero-background');
        
        if (background) {
          // Calculate mouse position relative to hero section
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Calculate percentage (0 to 1)
          const xPercent = x / rect.width;
          const yPercent = y / rect.height;
          
          // Parallax movement (adjust intensity with multiplier)
          const parallaxIntensity = 20; // pixels
          const moveX = (xPercent - 0.5) * parallaxIntensity;
          const moveY = (yPercent - 0.5) * parallaxIntensity;
          
          background.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      }
    };

    const heroSection = heroSectionRef.current;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      return () => heroSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Handle restart button click
  const handleRestart = () => {
    if (sliderRef.current) {
      // Reset scroll position instantly
      sliderRef.current.scrollLeft = 0;
      setShowRestartArrow(false);
      // Animation will continue automatically from the useEffect
    }
  };

  const handleSIGClick = (sigId) => {
    navigate(`/sigs/${sigId}`);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" ref={heroSectionRef}>
        <div className="hero-background" id="hero-background"></div>
        <div className="hero-overlay">
          <div className="hero-grid"></div>
        </div>
      </section>

      {/* Message from President Section */}
      <section className="president-section">
        <div className="president-container">
          {/* White Message Box */}
          <div className="message-box">
            <p className="message-text">
              A landing page is generally considered a specific page designed to
              receive and convert traffic from an online marketing campaign but
              could also serve as the first introduction to a company or product.
            </p>
            {president && (
              <p className="president-name">{president.name}</p>
            )}
            {/* Blue Banner attached to bottom of box */}
            <div className="message-banner">
              <span className="banner-text">Message from Our President</span>
            </div>
          </div>

          {/* President Image Rectangle */}
          <div className="president-image-container">
            {president && president.image ? (
              <img
                src={president.image}
                alt={president.name || "President"}
                className="president-image"
              />
            ) : (
              <img
                src={clubLogo}
                alt="Club Logo"
                className="president-image"
              />
            )}
          </div>
        </div>
      </section>

      {/* Container for all sections below president's message */}
      <div className="sections-container">
      {/* Special Interest Groups Section */}
      <section className="sigs-section">
        <Link to="/sigs" className="sigs-title-link">
          <h2 className="sigs-title">SPECIAL INTEREST GROUPS</h2>
        </Link>
        <div className="sigs-container">
          <div className="sigs-slider" ref={sliderRef}>
            {sigsLoading ? (
              <div className="sigs-loading">Loading SIGs...</div>
            ) : sigs.length > 0 ? (
              // Show all SIGs (no duplication)
              sigs.map((sig) => {
                return (
                  <div
                    key={sig._id}
                    className="sig-card"
                    onClick={() => handleSIGClick(sig._id)}
                    onMouseEnter={(e) => {
                      // Pause autoscroll when hovering over card
                      isCardHoveredRef.current = true;
                      e.currentTarget.querySelector('.sig-description').style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      // Resume autoscroll when leaving card
                      isCardHoveredRef.current = false;
                      e.currentTarget.querySelector('.sig-description').style.opacity = '0';
                    }}
                  >
                    <div className="sig-title">{sig.name}</div>
                    <div className="sig-description">{sig.description}</div>
                  </div>
                );
              })
            ) : (
              <div className="sigs-empty">No SIGs available</div>
            )}
          </div>
          {/* Floating restart arrow */}
          {showRestartArrow && (
            <button 
              className="restart-arrow"
              onClick={handleRestart}
              aria-label="Restart slider"
            >
              ↻
            </button>
          )}
        </div>
      </section>

      {/* News and Events Section */}
      <section className="news-events-section">
        <h2 className="news-events-title-centered">NEWS AND EVENTS</h2>
        <div className="news-events-container">
          {/* Left Column - Text Content */}
          <div className="news-events-text">
            {eventsLoading ? (
              <p className="news-events-description">Loading events...</p>
            ) : events.length > 0 ? (
              <>
                <p className="news-events-description">
                  {events[currentEventIndex]?.description || "No description available."}
                </p>
                {/* Hover details - shown on hover */}
                <div className="news-events-details">
                  <h3 className="details-title">{events[currentEventIndex]?.title || ""}</h3>
                  <p className="details-full-description">
                    {events[currentEventIndex]?.description || ""}
                  </p>
                  {events[currentEventIndex]?.createdAt && (
                    <p className="details-date">
                      {new Date(events[currentEventIndex].createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="news-events-description">No events available at this time.</p>
            )}
          </div>

          {/* Right Column - Image Carousel */}
          <div className="news-events-image-container">
            {eventsLoading ? (
              <div className="news-events-image-placeholder">Loading...</div>
            ) : events.length > 0 ? (
              <>
                {events.map((event, index) => (
                  <div
                    key={event._id || index}
                    className={`news-events-image ${index === currentEventIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${event.image || clubLogo})` }}
                  >
                  </div>
                ))}
                {/* Pagination indicators - rendered once outside the loop */}
                <div className="image-pagination">
                  {events.map((_, idx) => (
                    <div
                      key={idx}
                      className={`pagination-dot ${idx === currentEventIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="news-events-image-placeholder">No events available</div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        {/* PROJECTS Title */}
        <Link to="/projects" className="projects-title-link">
          <h2 className="projects-title">PROJECTS</h2>
        </Link>

        {/* Projects Slider */}
        <div className="projects-slider-container">
          {projectsLoading ? (
            <div className="projects-loading">Loading projects...</div>
          ) : projects.length > 0 ? (
            <div className="projects-slider" ref={projectsSliderRef}>
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="project-card"
                  onClick={() => handleProjectClick(project._id)}
                >
                  {project.image && (
                    <div 
                      className="project-image"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>
                  )}
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    {project.description && (
                      <p className="project-description">{project.description}</p>
                    )}
                    {project.status && (
                      <span className={`project-status project-status-${project.status.toLowerCase()}`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="projects-empty">No projects available</div>
          )}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;
