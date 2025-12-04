import React from 'react';
import { Leaf, Sparkles, TrendingUp, Award } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <Leaf size={48} strokeWidth={2.5} />
          </div>
          <h1 className="logo-text text-gradient">Grass</h1>
          <p className="tagline">Touch Grass</p>
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
        <div className="grass-blade" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="grass-blade" style={{ left: '25%', animationDelay: '0.5s' }}></div>
        <div className="grass-blade" style={{ left: '40%', animationDelay: '1s' }}></div>
        <div className="grass-blade" style={{ left: '55%', animationDelay: '0.3s' }}></div>
        <div className="grass-blade" style={{ left: '70%', animationDelay: '0.8s' }}></div>
        <div className="grass-blade" style={{ left: '85%', animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}

export default LoginPage;
