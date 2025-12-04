import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, Zap } from 'lucide-react';
import ConnectWalletButton from './ConnectWalletButton';
import './TopBar.css';

function TopBar() {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-stats">
        <div className="stat-badge">
          <Award size={18} />
          <span className="mono">LV {user?.level || 1}</span>
        </div>
        <div className="stat-badge">
          <Zap size={18} />
          <span className="mono">{user?.xp || 0} XP</span>
        </div>
        <div className="stat-badge streak">
          <span className="mono">🔥 {user?.streak || 0}</span>
        </div>
      </div>

      <ConnectWalletButton compact variant="secondary" />
    </div>
  );
}

export default TopBar;


