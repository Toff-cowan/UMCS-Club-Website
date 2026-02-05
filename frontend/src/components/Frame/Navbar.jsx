import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/UMCS Logo.png';

const Navbar = () => {
    const [opacity, setOpacity] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            // Home page: fade based on hero section position
            if (location.pathname === '/') {
                const heroSection = document.querySelector('.hero-section');
                if (!heroSection) {
                    setOpacity(1);
                    return;
                }
                const heroRect = heroSection.getBoundingClientRect();
                const heroHeight = heroRect.height;
                const heroTop = heroRect.top;
                const fadeStart = heroHeight * 0.3;
                const fadeEnd = heroHeight * 0.8;
                if (heroTop > fadeStart) {
                    setOpacity(1);
                } else if (heroTop < -fadeEnd) {
                    setOpacity(0);
                } else {
                    const fadeRange = fadeStart + fadeEnd;
                    const fadeProgress = (fadeStart - heroTop) / fadeRange;
                    setOpacity(Math.max(0, Math.min(1, 1 - fadeProgress)));
                }
                return;
            }

            // Other pages: fade when scrolling down
            const scrollY = window.scrollY || window.pageYOffset;
            const fadeAfter = 60;
            const fadeOver = 180;
            if (scrollY <= fadeAfter) {
                setOpacity(1);
            } else if (scrollY >= fadeAfter + fadeOver) {
                setOpacity(0);
            } else {
                const progress = (scrollY - fadeAfter) / fadeOver;
                setOpacity(1 - progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

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