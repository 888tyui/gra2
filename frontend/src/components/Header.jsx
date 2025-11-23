import React from 'react';
import { useAuth } from '../context/AuthContext';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Leaf, Award, Zap } from 'lucide-react';
import './Header.css';

function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-small">
            <Leaf size={32} strokeWidth={2.5} />
          </div>
          <h1 className="logo-text-small text-gradient">Grass</h1>
        </div>

        <div className="header-right">
          <div className="user-stats">
            <div className="stat">
              <Award size={20} />
              <span className="mono">LV {user?.level || 1}</span>
            </div>
            <div className="stat">
              <Zap size={20} />
              <span className="mono">{user?.xp || 0} XP</span>
            </div>
            <div className="stat streak">
              <span className="mono">🔥 {user?.streak || 0}</span>
            </div>
          </div>

          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}

export default Header;

