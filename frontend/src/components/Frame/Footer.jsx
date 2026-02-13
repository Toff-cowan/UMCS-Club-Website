import React from "react";
import "./Footer.css";
import { FaWhatsapp, FaInstagram, FaArrowUp } from "react-icons/fa";
import logo from "../../assets/UMCS Logo.png";

const Footer = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Meet the team' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      {/* Cyan Ribbon at top */}
      <div className="footer-ribbon"></div>
      {/* Left: Logo */}
      <div className="footer-logo">
        <img
          src={logo}
          alt="Computing Society Logo"
        />
      </div>

      {/* Center: Navigation with Social Icons Above */}
      <div className="footer-nav-section">
        <div className="footer-socials">
          <a href="#" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/uwimonacs?igsh=NDgyNnN5amY2eGE1" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/resources">Resources</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/exec">Meet the Team</a>
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
