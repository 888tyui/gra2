import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sparkles, TrendingUp, Award, Zap, Users, Shield } from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Gamified Self-Improvement Platform</span>
          </div>

          <h1 className="hero-title">
            Transform Your Daily
            <br />
            <span className="text-gradient">Habits Into Growth</span>
          </h1>

          <p className="hero-description">
            Grass helps you build better habits by combining task management with
            gamification. Earn XP, level up, and track your progress as you
            build a healthier, more productive lifestyle.
          </p>

          <div className="hero-cta">
            <Link to="/app" className="cta-primary">
              Get Started - It's Free
            </Link>
            <Link to="/docs" className="cta-secondary">
              Learn More
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">2K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="hero-gradient"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Everything You Need to Succeed</h2>
            <p>Powerful features designed to help you build lasting habits</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>XP & Level System</h3>
              <p>
                Earn experience points for completing tasks and level up your
                profile. Track your growth journey visually.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Award size={32} />
              </div>
              <h3>Streak Tracking</h3>
              <p>
                Build consistency with daily streaks. Get bonus XP for maintaining
                your momentum and staying active.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Progress Analytics</h3>
              <p>
                Visualize your productivity with detailed statistics. See your
                completion rate, category breakdown, and more.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Sparkles size={32} />
              </div>
              <h3>AI Assistant</h3>
              <p>
                Get personalized task suggestions and motivational tips from our
                AI helper to keep you on track.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Web3 Authentication</h3>
              <p>
                Connect securely with your Solana wallet. No passwords, no
                hassle—just pure simplicity.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Community Focused</h3>
              <p>
                Join a community of like-minded individuals building better
                habits and supporting each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in three simple steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Connect Your Wallet</h3>
              <p>
                Sign in securely using your Solana wallet like Phantom or
                Solflare. No email or password required.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Create Your Tasks</h3>
              <p>
                Add daily tasks, set priorities, and organize them by category.
                Get AI suggestions for healthy habits.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Complete & Level Up</h3>
              <p>
                Check off tasks to earn XP, maintain your streak, and watch
                yourself level up as you build better habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Touch Grass?</h2>
          <p>
            Join thousands of users building better habits and achieving their
            goals every day.
          </p>
          <Link to="/app" className="cta-button">
            Launch App Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;


