import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';
import XPNotification from './XPNotification';
import './TodayTaskList.css';

function TodayTaskList() {
  const { tasks, loading } = useTask();
  const [xpNotification, setXpNotification] = useState(null);

  // Filter for today's tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime() && !task.completed;
  });

  const completedToday = tasks.filter(task => {
    if (!task.completedAt) return false;
    const completedDate = new Date(task.completedAt);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  });

  const handleXPGain = (xpGained, newLevel) => {
    setXpNotification({ xpGained, newLevel });
  };

  const closeNotification = () => {
    setXpNotification(null);
  };

  return (
    <div className="today-task-list">
      <div className="task-section">
        <div className="section-header">
          <h3>Active Tasks</h3>
          <span className="task-count">{todayTasks.length}</span>
        </div>
        
        <div className="task-grid">
          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : todayTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add your first goal! 🎯</p>
            </div>
          ) : (
            todayTasks.map(task => <TaskItem key={task.id} task={task} onXPGain={handleXPGain} />)
          )}
        </div>
      </div>

      {completedToday.length > 0 && (
        <div className="task-section completed-section">
          <div className="section-header">
            <h3>
              <div className="section-icon">✓</div>
              Completed Today
            </h3>
            <span className="task-count">{completedToday.length}</span>
          </div>
          
          <div className="task-grid">
            {completedToday.map(task => <TaskItem key={task.id} task={task} onXPGain={handleXPGain} showCompleted />)}
          </div>
        </div>
      )}

      {xpNotification && (
        <XPNotification
          xpGained={xpNotification.xpGained}
          newLevel={xpNotification.newLevel}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default TodayTaskList;

