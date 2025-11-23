import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { TASK_CATEGORIES, TASK_PRIORITIES, XP_REWARDS } from '../config';
import { Plus, Sparkles } from 'lucide-react';
import './TaskInput.css';

function TaskInput() {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [priority, setPriority] = useState('medium');
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    setLoading(true);
    try {
      await addTask({
        title: title.trim(),
        description: description.trim(),
        category,
        priority,
        xpReward: XP_REWARDS[priority]
      });

      setTitle('');
      setDescription('');
      setCategory('other');
      setPriority('medium');
      setShowDetails(false);
    } catch (err) {
      console.error('Failed to add task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-input-card">
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-group-main">
          <input
            type="text"
            placeholder="Add a task for today..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input-main"
          />
          
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="details-toggle"
            title="More options"
          >
            <Sparkles size={20} />
          </button>

          <button 
            type="submit" 
            className="add-button"
            disabled={!title.trim() || loading}
          >
            <Plus size={24} />
          </button>
        </div>

        {showDetails && (
          <div className="input-details fade-in">
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="task-description"
              rows="2"
            />

            <div className="input-row">
              <div className="input-field">
                <label>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="task-select"
                >
                  {TASK_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <label>Priority</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="task-select"
                >
                  {TASK_PRIORITIES.map(p => (
                    <option key={p.value} value={p.value}>
                      {p.label} (+{XP_REWARDS[p.value]} XP)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TaskInput;

