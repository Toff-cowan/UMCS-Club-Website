import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaWhatsapp, FaInstagram, FaArrowUp } from "react-icons/fa";
import logo from "../../assets/UMCS Logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-ribbon"></div>
      <div className="footer-logo">
        <img
          src={logo}
          alt="Computing Society Logo"
        />
      </div>

      <div className="footer-nav-section">
        <div className="footer-socials">
          <a href="#" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/uwimonacs?igsh=NDgyNnN5amY2eGE1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/sigs">SIGs</Link>
          <Link to="/about">About</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/exec">Meet the Team</Link>
        </div>
      </div>

      {/* Right: CTA */}
      <div className="footer-actions">
        <button className="footer-cta">Join Us!!!</button>
      </div>
      
      {/* Floating Back to Top Button */}
      <button className="back-to-top-float" onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
