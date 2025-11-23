import React, { useEffect } from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import './XPNotification.css';

function XPNotification({ xpGained, newLevel, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="xp-notification" onClick={onClose}>
      <div className="xp-content">
        <div className="xp-icon">
          <Zap size={24} />
        </div>
        <div className="xp-info">
          <div className="xp-amount mono">+{xpGained} XP</div>
          <div className="xp-message">Great job!</div>
        </div>
        {newLevel && (
          <div className="level-up">
            <TrendingUp size={20} />
            <span className="mono">LV {newLevel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default XPNotification;

