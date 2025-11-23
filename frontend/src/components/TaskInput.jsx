import React, { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { TASK_CATEGORIES, TASK_PRIORITIES, XP_REWARDS } from '../config';
import { Plus, Sparkles, Wand2 } from 'lucide-react';
import { getAIHelp } from '../utils/api';
import './TaskInput.css';

function TaskInput() {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('other');
  const [priority, setPriority] = useState('medium');
  const [recurring, setRecurring] = useState('none');
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAIRewrite = async () => {
    if (!title.trim()) return;

    setAiLoading(true);
    try {
      const { data } = await getAIHelp(
        `Rewrite this task to be more actionable and clear: "${title}". Return ONLY the improved task title, nothing else.`,
        null
      );
      
      const improvedTitle = data.tip.replace(/["""]/g, '').trim();
      setTitle(improvedTitle);
    } catch (err) {
      console.error('AI rewrite error:', err);
    } finally {
      setAiLoading(false);
    }
  };

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
        recurring,
        xpReward: XP_REWARDS[priority]
      });

      setTitle('');
      setDescription('');
      setCategory('other');
      setPriority('medium');
      setRecurring('none');
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
            onClick={handleAIRewrite}
            className="ai-rewrite-btn"
            title="AI Rewrite"
            disabled={!title.trim() || aiLoading}
          >
            <Wand2 size={18} />
          </button>
          
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

            <div className="input-field">
              <label>Recurring</label>
              <select 
                value={recurring} 
                onChange={(e) => setRecurring(e.target.value)}
                className="task-select"
              >
                <option value="none">No Repeat</option>
                <option value="daily">Every Day</option>
                <option value="weekly">Every Week</option>
                <option value="weekdays">Weekdays (Mon-Fri)</option>
                <option value="weekends">Weekends (Sat-Sun)</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default TaskInput;

