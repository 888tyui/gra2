import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserStats } from '../utils/api';
import { TrendingUp, CheckCircle, Target, Award } from 'lucide-react';
import './Stats.css';

function Stats() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!isAuthenticated) return;
      
      try {
        const { data } = await getUserStats();
        setStats(data.stats);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, user]);

  if (loading) {
    return (
      <div className="stats-card">
        <h3>Statistics</h3>
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  const xpToNextLevel = (user?.level || 1) * (user?.level || 1) * 100;
  const xpProgress = ((user?.xp || 0) / xpToNextLevel) * 100;

  return (
    <div className="stats-card">
      <h3>Statistics</h3>

      <div className="level-progress">
        <div className="level-header">
          <span className="level-label">Level {user?.level || 1}</span>
          <span className="xp-label mono">{user?.xp || 0} / {xpToNextLevel} XP</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(xpProgress, 100)}%` }}
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon" style={{ background: 'var(--grass-100)' }}>
            <CheckCircle size={24} color="var(--grass-700)" />
          </div>
          <div className="stat-info">
            <span className="stat-value mono">{stats?.completedTasks || 0}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon" style={{ background: 'var(--grass-100)' }}>
            <Target size={24} color="var(--grass-700)" />
          </div>
          <div className="stat-info">
            <span className="stat-value mono">{stats?.todayCompleted || 0}</span>
            <span className="stat-label">Today</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon" style={{ background: 'var(--grass-100)' }}>
            <TrendingUp size={24} color="var(--grass-700)" />
          </div>
          <div className="stat-info">
            <span className="stat-value mono">{stats?.completionRate || 0}%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--grass-500), var(--grass-700))' }}>
            <Award size={24} color="white" />
          </div>
          <div className="stat-info">
            <span className="stat-value mono">🔥 {user?.streak || 0}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      {stats?.categoryStats && Object.keys(stats.categoryStats).length > 0 && (
        <div className="category-stats">
          <h4>Completed by Category</h4>
          <div className="category-list">
            {Object.entries(stats.categoryStats).map(([category, count]) => (
              <div key={category} className="category-stat">
                <span className="category-name">{category}</span>
                <span className="category-count mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;

