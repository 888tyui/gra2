export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const TASK_CATEGORIES = [
  { value: 'health', label: '🌿 Health', color: 'var(--grass-500)' },
  { value: 'exercise', label: '💪 Exercise', color: 'var(--grass-600)' },
  { value: 'learning', label: '📚 Learning', color: 'var(--grass-700)' },
  { value: 'work', label: '💼 Work', color: 'var(--grass-400)' },
  { value: 'social', label: '👥 Social', color: 'var(--grass-500)' },
  { value: 'creative', label: '🎨 Creative', color: 'var(--grass-600)' },
  { value: 'other', label: '✨ Other', color: 'var(--grass-500)' }
];

export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export const XP_REWARDS = {
  low: 10,
  medium: 15,
  high: 25
};

