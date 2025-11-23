import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { TASK_CATEGORIES } from '../config';
import { Check, Trash2, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import './TaskList.css';

function TaskItem({ task }) {
  const { completeTask, uncompleteTask, deleteTask } = useTask();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (task.completed) {
        await uncompleteTask(task._id);
      } else {
        await completeTask(task._id);
      }
    } catch (err) {
      console.error('Toggle task error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  const categoryInfo = TASK_CATEGORIES.find(c => c.value === task.category);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} slide-in`}>
      <button
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={handleToggle}
        disabled={loading}
      >
        {task.completed && <Check size={18} strokeWidth={3} />}
      </button>

      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div className="task-meta">
            <span className="task-category">{categoryInfo?.label || '✨ Other'}</span>
            <span className="task-xp mono">+{task.xpReward} XP</span>
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-footer">
          <span className="task-date">
            {format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm')}
          </span>
        </div>
      </div>

      <button 
        className="task-delete"
        onClick={handleDelete}
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

function TaskList() {
  const { tasks, filter, setFilter, loading } = useTask();

  const filters = [
    { label: 'Active', value: 'false' },
    { label: 'Completed', value: 'true' }
  ];

  return (
    <div className="task-list-card">
      <div className="task-list-header">
        <h3>My Tasks</h3>
        
        <div className="task-filters">
          {filters.map(f => (
            <button
              key={f.value}
              className={`filter-button ${filter.completed === f.value ? 'active' : ''}`}
              onClick={() => setFilter({ ...filter, completed: f.value })}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="task-list">
        {loading ? (
          <div className="task-list-empty">
            <p>Loading...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="task-list-empty">
            <p>
              {filter.completed === 'true' 
                ? 'No completed tasks yet' 
                : 'Add your first task to get started! 🌱'}
            </p>
          </div>
        ) : (
          tasks.map(task => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default TaskList;

