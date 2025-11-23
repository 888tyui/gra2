import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import { getAISuggestions, getAIHelp } from '../utils/api';
import { Sparkles, Plus, Lightbulb } from 'lucide-react';
import './AIHelper.css';

function AIHelper() {
  const { user } = useAuth();
  const { addTask } = useTask();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [tip, setTip] = useState('');

  const handleGetSuggestions = async () => {
    setLoading(true);
    try {
      const { data } = await getAISuggestions('', 3);
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error('AI suggestions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTip = async () => {
    setLoading(true);
    try {
      const { data } = await getAIHelp('', {
        level: user?.level,
        streak: user?.streak,
        completedTasks: user?.totalTasksCompleted
      });
      setTip(data.tip || '');
    } catch (err) {
      console.error('AI tip error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuggestion = async (suggestion) => {
    try {
      await addTask({
        title: suggestion.title,
        description: suggestion.description || '',
        category: suggestion.category || 'other',
        priority: 'medium',
        xpReward: suggestion.xpReward || 15,
        aiSuggested: true
      });
      
      setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
    } catch (err) {
      console.error('Add suggestion error:', err);
    }
  };

  return (
    <div className="ai-helper-card fade-in">
      <div className="ai-header">
        <div className="ai-title">
          <Sparkles size={24} />
          <h3>AI Helper</h3>
        </div>
      </div>

      <div className="ai-actions">
        <button 
          className="ai-action-button"
          onClick={handleGetSuggestions}
          disabled={loading}
        >
          <Sparkles size={18} />
          <span>Get Task Suggestions</span>
        </button>

        <button 
          className="ai-action-button"
          onClick={handleGetTip}
          disabled={loading}
        >
          <Lightbulb size={18} />
          <span>Get Motivated</span>
        </button>
      </div>

      {tip && (
        <div className="ai-tip fade-in">
          <div className="tip-icon">💡</div>
          <p>{tip}</p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="ai-suggestions fade-in">
          <h4>AI Suggested Tasks</h4>
          <div className="suggestion-list">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <div className="suggestion-content">
                  <h5>{suggestion.title}</h5>
                  {suggestion.description && (
                    <p>{suggestion.description}</p>
                  )}
                  <div className="suggestion-meta">
                    <span className="suggestion-category">
                      {suggestion.category}
                    </span>
                    <span className="suggestion-xp mono">
                      +{suggestion.xpReward} XP
                    </span>
                  </div>
                </div>
                <button
                  className="add-suggestion-button"
                  onClick={() => handleAddSuggestion(suggestion)}
                  title="Add task"
                >
                  <Plus size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="ai-loading">
          <div className="loading-spinner"></div>
          <p>AI is thinking...</p>
        </div>
      )}
    </div>
  );
}

export default AIHelper;

