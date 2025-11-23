import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Github } from 'lucide-react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Leaf size={32} strokeWidth={2.5} />
            <span>Grass</span>
          </div>
          <p className="footer-tagline">
            Touch Grass. Build Better Habits.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/app">Launch App</Link>
            <Link to="/docs">Documentation</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <Link to="/docs">Getting Started</Link>
            <Link to="/docs#api">API Reference</Link>
            <Link to="/docs#faq">FAQ</Link>
          </div>

          <div className="footer-column">
            <h4>Community</h4>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter/X
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Grass. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

