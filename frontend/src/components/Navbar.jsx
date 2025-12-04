import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import './Navbar.css';

function Navbar({ showCTA = true }) {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/docs', label: 'Docs' },
    { path: 'https://twitter.com', label: 'X', external: true }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Leaf size={28} strokeWidth={2.5} />
          </div>
          <span className="navbar-logo-text">Grass</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-link"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {showCTA && (
          <Link to="/app" className="navbar-cta">
            Launch App
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


