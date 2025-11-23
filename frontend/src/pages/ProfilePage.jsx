import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateUsername } from '../utils/api';
import { Edit2, Save, Award, Zap, Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import './ProfilePage.css';

function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (username.trim().length < 3) {
      alert('Username must be at least 3 characters');
      return;
    }

    setSaving(true);
    try {
      await updateUsername(username.trim(), bio.trim());
      refreshUser({ username: username.trim(), bio: bio.trim() });
      setEditing(false);
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const xpToNextLevel = (user?.level || 1) * (user?.level || 1) * 100;
  const xpProgress = ((user?.xp || 0) / xpToNextLevel) * 100;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-grid">
        <div className="profile-main">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {(user?.username || 'U')[0].toUpperCase()}
              </div>
            </div>

            {editing ? (
              <div className="profile-edit">
                <div className="edit-field">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    className="profile-input"
                  />
                </div>

                <div className="edit-field">
                  <label>Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="profile-textarea"
                    rows="3"
                  />
                </div>

                <div className="edit-actions">
                  <button 
                    onClick={() => setEditing(false)} 
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave} 
                    className="btn-primary"
                    disabled={saving}
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-view">
                <div className="profile-info">
                  <h2>{user?.username}</h2>
                  {user?.bio && <p className="profile-bio">{user.bio}</p>}
                </div>

                <button onClick={() => setEditing(true)} className="edit-btn">
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              </div>
            )}

            <div className="profile-wallet">
              <span className="wallet-label">Wallet Address</span>
              <code className="wallet-address">
                {user?.walletAddress.slice(0, 8)}...{user?.walletAddress.slice(-8)}
              </code>
            </div>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="stats-card">
            <h3>Statistics</h3>

            <div className="level-display">
              <div className="level-badge">
                <Award size={32} />
                <span className="level-num mono">LV {user?.level || 1}</span>
              </div>
              <div className="xp-progress">
                <div className="xp-bar">
                  <div className="xp-fill" style={{ width: `${Math.min(xpProgress, 100)}%` }} />
                </div>
                <span className="xp-text mono">{user?.xp || 0} / {xpToNextLevel} XP</span>
              </div>
            </div>

            <div className="stat-items">
              <div className="stat-row">
                <div className="stat-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Tasks Completed</span>
                  <span className="stat-value mono">{user?.totalTasksCompleted || 0}</span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-icon">
                  <Zap size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Total XP</span>
                  <span className="stat-value mono">{user?.xp || 0}</span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-icon streak-icon">
                  🔥
                </div>
                <div className="stat-content">
                  <span className="stat-label">Current Streak</span>
                  <span className="stat-value mono">{user?.streak || 0} days</span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat-icon">
                  <Calendar size={20} />
                </div>
                <div className="stat-content">
                  <span className="stat-label">Member Since</span>
                  <span className="stat-value">{user?.createdAt ? format(new Date(user.createdAt), 'MMM yyyy') : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

