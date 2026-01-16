import React from "react";
import "./Footer.css";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import logo from "../../assets/UMCS Logo.png";

const Footer = () => {
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

      {/* Center: Navigation */}
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/resources">Resources</a>
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
        <a href="/exec">Meet the Team</a>
      </div>

      {/* Right: Social + CTA */}
      <div className="footer-actions">
        <div className="footer-socials">
          <a href="#" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        <button className="footer-cta">Join Us!!!</button>
      </div>
    </footer>
  );
};

export default Footer;
