import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Zap } from 'lucide-react';
import './CheckInModal.css';

function CheckInModal({ onClose }) {
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    // Award 10 XP for check-in
    if (user) {
      const newXP = (user.xp || 0) + 10;
      const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;
      
      refreshUser({
        xp: newXP,
        level: newLevel
      });

      // Auto close after 3 seconds
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="checkin-overlay" onClick={onClose}>
      <div className="checkin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkin-icon">
          <CheckCircle size={48} />
        </div>
        
        <h3>Daily Check-In!</h3>
        <p>Welcome back! Here's your daily reward 🌱</p>
        
        <div className="checkin-reward">
          <Zap size={24} />
          <span className="reward-amount mono">+10 XP</span>
        </div>

        <button className="checkin-btn" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}

export default CheckInModal;


