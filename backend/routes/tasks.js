import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../server.js';
import { calculateLevel, calculateStreakBonus, updateStreak } from '../lib/userHelpers.js';

const router = express.Router();

// Get all tasks for user
router.get('/', requireAuth, async (req, res) => {
  try {
    const { completed, category, startDate, endDate } = req.query;
    
    const where = { userId: req.user.id };
    
    if (completed !== undefined) {
      where.completed = completed === 'true';
    }
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }
    
    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create new task
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, category, priority, dueDate, recurring, xpReward } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title is required' });
    }
    
    const task = await prisma.task.create({
      data: {
        userId: req.user.id,
        walletAddress: req.user.walletAddress,
        title: title.trim(),
        description: description || '',
        category: category || 'other',
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        recurring: recurring || 'none',
        xpReward: xpReward || 10
      }
    });
    
    res.status(201).json({ task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task
router.patch('/:taskId', requireAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, category, priority, dueDate, recurring } = req.body;
    
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.user.id
      }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        category: category !== undefined ? category : undefined,
        priority: priority !== undefined ? priority : undefined,
        dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : undefined,
        recurring: recurring !== undefined ? recurring : undefined
      }
    });
    
    res.json({ task: updatedTask });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Complete task (rewards XP)
router.post('/:taskId/complete', requireAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.user.id
      }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (task.completed) {
      return res.status(400).json({ error: 'Task already completed' });
    }
    
    // Mark task as completed
    const completedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: true,
        completedAt: new Date()
      }
    });
    
    // Calculate XP and update user
    const user = req.user;
    const xpGained = task.xpReward;
    const newStreak = updateStreak(user);
    const streakBonus = calculateStreakBonus(newStreak);
    const totalXP = xpGained + streakBonus;
    const newXP = user.xp + totalXP;
    const newLevel = calculateLevel(newXP);
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastActiveDate: new Date(),
        totalTasksCompleted: user.totalTasksCompleted + 1
      }
    });
    
    res.json({
      task: completedTask,
      xpGained: totalXP,
      user: {
        xp: updatedUser.xp,
        level: updatedUser.level,
        streak: updatedUser.streak,
        totalTasksCompleted: updatedUser.totalTasksCompleted
      }
    });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// Uncomplete task
router.post('/:taskId/uncomplete', requireAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.user.id
      }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        completed: false,
        completedAt: null
      }
    });
    
    res.json({ task: updatedTask });
  } catch (error) {
    console.error('Uncomplete task error:', error);
    res.status(500).json({ error: 'Failed to uncomplete task' });
  }
});

// Delete task
router.delete('/:taskId', requireAuth, async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: req.user.id
      }
    });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
