import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Award } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton';
import logoMain from '../logot.png';
import './LoginPage.css';

const grassBlades = [
  { left: '2%', delay: '0s', height: 130, duration: 4.5, opacity: 0.35, width: 10 },
  { left: '8%', delay: '1s', height: 110, duration: 3.5, opacity: 0.25, width: 6 },
  { left: '14%', delay: '0.4s', height: 150, duration: 4, opacity: 0.4, width: 11 },
  { left: '21%', delay: '0.8s', height: 125, duration: 3.8, opacity: 0.3, width: 8 },
  { left: '28%', delay: '1.2s', height: 140, duration: 4.2, opacity: 0.35, width: 9 },
  { left: '36%', delay: '0.2s', height: 160, duration: 4.8, opacity: 0.45, width: 12 },
  { left: '44%', delay: '1.4s', height: 120, duration: 3.6, opacity: 0.28, width: 7 },
  { left: '52%', delay: '0.6s', height: 155, duration: 4.3, opacity: 0.4, width: 10 },
  { left: '60%', delay: '0.9s', height: 135, duration: 3.7, opacity: 0.32, width: 8 },
  { left: '68%', delay: '0.3s', height: 150, duration: 4.5, opacity: 0.38, width: 9 },
  { left: '76%', delay: '1.1s', height: 125, duration: 3.9, opacity: 0.3, width: 7 },
  { left: '84%', delay: '0.5s', height: 165, duration: 4.7, opacity: 0.42, width: 12 },
  { left: '92%', delay: '1.3s', height: 130, duration: 3.8, opacity: 0.3, width: 8 },
  { left: '97%', delay: '0.7s', height: 145, duration: 4.1, opacity: 0.34, width: 9 }
];

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-hero">
            <img src={logoMain} alt="Grass logotype" className="hero-logo-mark" />
            <h1 className="hero-wordmark">Grass.</h1>
            <p className="hero-subline">Gamified Self improvement for degens.</p>
            <div className="hero-buttons">
              <Link to="/app" className="hero-btn primary">Go to app</Link>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn secondary"
              >
                Twitter
              </a>
              <a
                href="https://twitter.com/search?q=%24GRASS"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn tertiary"
              >
                $GRASS
              </a>
            </div>
          </div>
        </div>

        <div className="login-content">
          <p className="subtitle">
            Get rewarded for building healthy habits
          </p>

          <div className="features">
            <div className="feature">
              <Sparkles size={24} />
              <span>Gamified Self-Improvement</span>
            </div>
            <div className="feature">
              <TrendingUp size={24} />
              <span>Level Up with XP</span>
            </div>
            <div className="feature">
              <Award size={24} />
              <span>Track Your Streaks</span>
            </div>
          </div>

          <div className="wallet-connect">
            <ConnectWalletButton />
          </div>

          <p className="hint">
            Connect your wallet to start building better habits
          </p>
          
          <p className="network-hint">
            Supports BNB Smart Chain (BSC)
          </p>
        </div>
      </div>

      <div className="login-bg">
        {grassBlades.map((blade, index) => (
          <div
            key={index}
            className="grass-blade"
            style={{
              left: blade.left,
              animationDelay: blade.delay,
              height: `${blade.height}px`,
              animationDuration: `${blade.duration}s`,
              opacity: blade.opacity,
              width: `${blade.width}px`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;
