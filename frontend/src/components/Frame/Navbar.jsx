import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/UMCS Logo.png';

const Navbar = () => {
    const [opacity, setOpacity] = useState(1);
    const location = useLocation();

    useEffect(() => {
        // Only apply fade effect on home page
        if (location.pathname !== '/') {
            setOpacity(1);
            return;
        }

        const handleScroll = () => {
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) {
                setOpacity(1);
                return;
            }

            const heroRect = heroSection.getBoundingClientRect();
            const heroHeight = heroRect.height;
            const heroTop = heroRect.top;
            
            // Calculate opacity based on hero section position
            // Fade out as hero section scrolls up
            const fadeStart = heroHeight * 0.3; // Start fading when 30% of hero is scrolled
            const fadeEnd = heroHeight * 0.8; // Fully faded when 80% of hero is scrolled
            
            // When heroTop is positive, we're above the hero section (fully visible)
            // When heroTop becomes negative, we're scrolling past it
            if (heroTop > fadeStart) {
                setOpacity(1);
            } else if (heroTop < -fadeEnd) {
                setOpacity(0);
            } else {
                // Linear fade between fadeStart and fadeEnd
                const fadeRange = fadeStart + fadeEnd;
                const fadeProgress = (fadeStart - heroTop) / fadeRange;
                setOpacity(Math.max(0, Math.min(1, 1 - fadeProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    return (
        <nav className="navbar" style={{ opacity }}>
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="UMCS Logo" />
            </Link>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/sigs" className="nav-link">SIGs</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/projects" className="nav-link">Projects</Link>
                <Link to="/executives" className="nav-link">Executives</Link>
            </div>
        </nav>
    );
};
export default Navbar;