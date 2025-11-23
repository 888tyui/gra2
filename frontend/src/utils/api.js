import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add wallet address to requests
export const setAuthHeader = (walletAddress) => {
  if (walletAddress) {
    api.defaults.headers.common['x-wallet-address'] = walletAddress;
  } else {
    delete api.defaults.headers.common['x-wallet-address'];
  }
};

// Auth
export const getNonce = (walletAddress) => 
  api.get(`/auth/nonce/${walletAddress}`);

export const verifyWallet = (walletAddress, signature, message) =>
  api.post('/auth/verify', { walletAddress, signature, message });

// User
export const getUserProfile = () => api.get('/users/me');
export const updateUsername = (username, bio) => api.patch('/users/me/username', { username, bio });
export const getUserStats = () => api.get('/users/me/stats');

// Tasks
export const getTasks = (filters = {}) => api.get('/tasks', { params: filters });
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTask = (taskId, updates) => api.patch(`/tasks/${taskId}`, updates);
export const completeTask = (taskId) => api.post(`/tasks/${taskId}/complete`);
export const uncompleteTask = (taskId) => api.post(`/tasks/${taskId}/uncomplete`);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

// AI
export const getAISuggestions = (context = '', count = 3) =>
  api.post('/ai/suggest', { context, count });

export const getAIHelp = (question = '', userStats = null) =>
  api.post('/ai/help', { question, userStats });

export default api;

