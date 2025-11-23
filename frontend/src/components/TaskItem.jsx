import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { Check, Trash2, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { TASK_CATEGORIES } from '../config';
import ConfirmModal from './ConfirmModal';
import './TaskItem.css';

function TaskItem({ task, onXPGain, showCompleted }) {
  const { completeTask, uncompleteTask, deleteTask } = useTask();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      if (task.completed) {
        await uncompleteTask(task.id);
      } else {
        const result = await completeTask(task.id);
        // Show XP notification
        if (result && onXPGain) {
          onXPGain(result.xpGained, result.user?.level);
        }
      }
    } catch (err) {
      console.error('Toggle task error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const categoryInfo = TASK_CATEGORIES.find(c => c.value === task.category);
  
  const getRecurringLabel = (recurring) => {
    const labels = {
      daily: 'Daily',
      weekly: 'Weekly',
      weekdays: 'Weekdays',
      weekends: 'Weekends',
      none: null
    };
    return labels[recurring] || labels.none;
  };

  const recurringLabel = getRecurringLabel(task.recurring);

  return (
    <>
      <div className={`task-item-card ${task.completed ? 'completed' : ''} ${showCompleted ? 'show-completed' : ''}`}>
        <button
          className={`task-check ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          disabled={loading}
        >
          {task.completed && <Check size={16} strokeWidth={3} />}
        </button>

        <div className="task-info">
          <div className="task-main">
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
              <p className="task-desc">{task.description}</p>
            )}
          </div>

          <div className="task-badges">
            {recurringLabel && (
              <span className="task-recurring">
                <Repeat size={12} />
                {recurringLabel}
              </span>
            )}
            <span className="task-category">{categoryInfo?.label || '✨'}</span>
            <span className="task-xp mono">+{task.xpReward} XP</span>
          </div>
        </div>

        <button 
          className="task-delete-btn"
          onClick={() => setShowDeleteConfirm(true)}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete Task?"
          message="This action cannot be undone. Are you sure you want to delete this task?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
}

export default TaskItem;
