import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../utils/api';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ completed: 'false', category: 'all' });

  const fetchTasks = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    try {
      const { data } = await api.getTasks(filter);
      setTasks(data.tasks);
    } catch (err) {
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const { data } = await api.createTask(taskData);
      setTasks(prev => [data.task, ...prev]);
      return data.task;
    } catch (err) {
      console.error('Add task error:', err);
      throw err;
    }
  };

  const updateTaskData = async (taskId, updates) => {
    try {
      const { data } = await api.updateTask(taskId, updates);
      setTasks(prev => prev.map(t => t._id === taskId ? data.task : t));
      return data.task;
    } catch (err) {
      console.error('Update task error:', err);
      throw err;
    }
  };

  const completeTaskAction = async (taskId) => {
    try {
      const { data } = await api.completeTask(taskId);
      setTasks(prev => prev.map(t => t._id === taskId ? data.task : t));
      refreshUser(data.user);
      return data;
    } catch (err) {
      console.error('Complete task error:', err);
      throw err;
    }
  };

  const uncompleteTaskAction = async (taskId) => {
    try {
      const { data } = await api.uncompleteTask(taskId);
      setTasks(prev => prev.map(t => t._id === taskId ? data.task : t));
      return data.task;
    } catch (err) {
      console.error('Uncomplete task error:', err);
      throw err;
    }
  };

  const removeTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (err) {
      console.error('Delete task error:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, filter]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filter,
        setFilter,
        fetchTasks,
        addTask,
        updateTask: updateTaskData,
        completeTask: completeTaskAction,
        uncompleteTask: uncompleteTaskAction,
        deleteTask: removeTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

