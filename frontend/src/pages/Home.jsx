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
  const eventIntervalRef = useRef(null);
  const heroSectionRef = useRef(null);
  const presidentSectionRef = useRef(null);
  const sigsSectionRef = useRef(null);
  const newsEventsSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState({
    president: false,
    sigs: false,
    newsEvents: false,
    projects: false,
  });

  useEffect(() => {
    const fetchPresident = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/executives");
        if (!response.ok) {
          throw new Error(`Failed to fetch executives: ${response.status}`);
        }
        const executives = await response.json();
        
        // Find the lead executive: President first, then Vice President, then first in list
        const presidentData = executives.find((exec) => {
          if (!exec || !exec.position) return false;
          const p = exec.position.trim().toLowerCase();
          return p === "president";
        });
        const vicePresidentData = executives.find((exec) => {
          if (!exec || !exec.position) return false;
          const p = exec.position.trim().toLowerCase();
          return p === "vice president";
        });

        if (presidentData) {
          setPresident(presidentData);
        } else if (vicePresidentData) {
          setPresident(vicePresidentData);
        } else if (executives.length > 0) {
          setPresident(executives[0]);
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

  // Float-in on scroll: observe sections and set visible when they enter view
  useEffect(() => {
    const pairs = [
      { ref: presidentSectionRef, key: "president" },
      { ref: sigsSectionRef, key: "sigs" },
      { ref: newsEventsSectionRef, key: "newsEvents" },
      { ref: projectsSectionRef, key: "projects" },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute("data-float-section");
          if (key)
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    const observed = [];
    pairs.forEach(({ ref, key }) => {
      if (ref.current) {
        ref.current.setAttribute("data-float-section", key);
        observer.observe(ref.current);
        observed.push(ref.current);
      }
    });
    return () => {
      observed.forEach((el) => el.removeAttribute("data-float-section"));
      observer.disconnect();
    };
  }, []);

  // Auto-scroll slider - smooth infinite scrolling through all SIGs (duplicated for seamless loop)
  useEffect(() => {
    if (sigs.length === 0 || !sliderRef.current) return;

    const slider = sliderRef.current;
    const scrollSpeed = 0.6; // Pixels per frame (smooth scroll)
    const halfWidth = slider.scrollWidth / 2; // We render SIGs twice, so half is one full set

    const scroll = () => {
      // Pause if any card is being hovered
      if (isCardHoveredRef.current) {
        animationFrameRef.current = requestAnimationFrame(scroll);
        return;
      }

      // When we've scrolled past the first set, jump back for seamless infinite loop
      if (slider.scrollLeft >= halfWidth - 1) {
        slider.scrollLeft -= halfWidth;
      }

      slider.scrollLeft += scrollSpeed;
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

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
      <section
        ref={presidentSectionRef}
        className={`president-section section-float-in ${visibleSections.president ? "section-float-in-visible" : ""}`}
      >
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
              <span className="banner-text">
                {president?.position?.toLowerCase() === "president"
                  ? "Message from Our President"
                  : president?.position?.toLowerCase() === "vice president"
                    ? "Message from Our Vice President"
                    : president
                      ? `Message from Our ${president.position}`
                      : "Message from the Executive"}
              </span>
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
      <section
        ref={sigsSectionRef}
        className={`sigs-section section-float-in ${visibleSections.sigs ? "section-float-in-visible" : ""}`}
      >
        <Link to="/sigs" className="sigs-title-link">
          <h2 className="sigs-title">SPECIAL INTEREST GROUPS</h2>
        </Link>
        <div className="sigs-container">
          <div className="sigs-slider" ref={sliderRef}>
            {sigsLoading ? (
              <div className="sigs-loading">Loading SIGs...</div>
            ) : sigs.length > 0 ? (
              // Render SIGs twice for seamless infinite loop
              [...sigs, ...sigs].map((sig, index) => (
                <div
                  key={`${sig._id}-${index}`}
                  className="sig-card"
                  onClick={() => handleSIGClick(sig._id)}
                  onMouseEnter={(e) => {
                    isCardHoveredRef.current = true;
                    e.currentTarget.querySelector('.sig-description').style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    isCardHoveredRef.current = false;
                    e.currentTarget.querySelector('.sig-description').style.opacity = '0';
                  }}
                >
                  <div className="sig-title">{sig.name}</div>
                  <div className="sig-description">{sig.description}</div>
                </div>
              ))
            ) : (
              <div className="sigs-empty">No SIGs available</div>
            )}
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section
        ref={newsEventsSectionRef}
        className={`news-events-section section-float-in ${visibleSections.newsEvents ? "section-float-in-visible" : ""}`}
      >
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
      <section
        ref={projectsSectionRef}
        className={`projects-section section-float-in ${visibleSections.projects ? "section-float-in-visible" : ""}`}
      >
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
