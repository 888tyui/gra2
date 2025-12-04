import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import LoginPage from './LoginPage';
import TodayPage from '../pages/TodayPage';
import CalendarPage from '../pages/CalendarPage';
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import CheckInModal from './CheckInModal';
import './AppLayout.css';

function AppLayout() {
  const { isAuthenticated, user } = useAuth();
  const [showCheckIn, setShowCheckIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user checked in today
      const lastCheckIn = localStorage.getItem(`checkIn_${user.walletAddress}`);
      const today = new Date().toDateString();
      
      if (lastCheckIn !== today) {
        setShowCheckIn(true);
      }
    }
  }, [isAuthenticated, user]);

  const handleCheckInClose = () => {
    if (user) {
      localStorage.setItem(`checkIn_${user.walletAddress}`, new Date().toDateString());
    }
    setShowCheckIn(false);
  };

  if (!isAuthenticated) {
    return <LoginPage variant="connect" />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <TopBar />
        <div className="app-content">
          <Routes>
            <Route index element={<Navigate to="today" replace />} />
            <Route path="today" element={<TodayPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="today" replace />} />
          </Routes>
        </div>
      </div>

      {showCheckIn && <CheckInModal onClose={handleCheckInClose} />}
    </div>
  );
}

export default AppLayout;


