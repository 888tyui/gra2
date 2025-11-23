import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import Stats from './Stats';
import AIHelper from './AIHelper';
import { Sparkles } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2>Welcome back, {user?.username} 👋</h2>
            <p className="dashboard-subtitle">
              Let's make today count
            </p>
          </div>

          <button 
            className="ai-button"
            onClick={() => setShowAI(!showAI)}
          >
            <Sparkles size={20} />
            <span>AI Helper</span>
          </button>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-main">
            <TaskInput />
            <TaskList />
          </div>

          <div className="dashboard-sidebar">
            <Stats />
            {showAI && <AIHelper />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

