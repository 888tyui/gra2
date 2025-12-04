import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import '../components/MainApp.css';

function AppPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="main-app">
      <Header />
      <Dashboard />
    </div>
  );
}

export default AppPage;


