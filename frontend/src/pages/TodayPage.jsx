import React from 'react';
import { useAuth } from '../context/AuthContext';
import TaskInput from '../components/TaskInput';
import TodayTaskList from '../components/TodayTaskList';
import AIHelper from '../components/AIHelper';
import './TodayPage.css';

function TodayPage() {
  const { user } = useAuth();

  return (
    <div className="today-page">
      <div className="today-header">
        <div>
          <h1>Today's Goals</h1>
          <p className="today-subtitle">
            Welcome back, {user?.username}. Let's make today count! 👋
          </p>
        </div>
      </div>

      <div className="today-grid">
        <div className="today-main">
          <TaskInput />
          <TodayTaskList />
        </div>

        <div className="today-sidebar">
          <AIHelper />
        </div>
      </div>
    </div>
  );
}

export default TodayPage;

