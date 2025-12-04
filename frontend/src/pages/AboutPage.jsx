import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Target, Heart, Zap, Users } from 'lucide-react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />

      <section className="about-hero">
        <div className="about-hero-container">
          <h1>About Grass</h1>
          <p className="about-subtitle">
            Empowering individuals to build better habits through gamification
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Grass, we believe that building healthy habits shouldn't feel like
              a chore. Our mission is to make self-improvement enjoyable, rewarding,
              and sustainable through the power of gamification.
            </p>
            <p>
              We combine modern technology with behavioral psychology to create a
              platform that motivates you to "touch grass" – to step outside, be
              active, and build a lifestyle that promotes physical and mental
              well-being.
            </p>
          </div>

          <div className="mission-image">
            <div className="mission-illustration">
              <Target size={120} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-container">
          <h2 className="values-title">Our Values</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Heart size={40} />
              </div>
              <h3>Health First</h3>
              <p>
                We prioritize your physical and mental well-being above all else.
                Every feature is designed to encourage healthy, sustainable habits.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Zap size={40} />
              </div>
              <h3>Simplicity</h3>
              <p>
                We believe in keeping things simple and intuitive. No complicated
                setups, just straightforward tools that work.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Users size={40} />
              </div>
              <h3>Community</h3>
              <p>
                Building better habits is easier together. We foster a supportive
                community that celebrates progress and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-container">
          <div className="story-content">
            <h2>The Story Behind Grass</h2>
            <p>
              Grass was born from a simple observation: people spend too much time
              in front of screens without rewarding themselves for healthy,
              productive activities. We wanted to create a system that makes going
              outside, exercising, learning, and being productive feel like
              achievements worth celebrating.
            </p>
            <p>
              By combining task management with XP systems, leveling mechanics, and
              streak tracking, we've created an environment where every positive
              action counts toward your personal growth journey.
            </p>
            <p>
              Today, thousands of users are building better habits, one task at a
              time, and we're just getting started.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-container">
          <h2>Join Us on This Journey</h2>
          <p>
            Ready to transform your daily habits into meaningful growth?
          </p>
          <Link to="/app" className="about-cta-button">
            Get Started Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;


