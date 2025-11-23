import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { prisma } from '../server.js';

const router = express.Router();

// Get user profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      user: {
        id: user.id,
        walletAddress: user.walletAddress,
        username: user.username,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        totalTasksCompleted: user.totalTasksCompleted,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update username
router.patch('/me/username', requireAuth, async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username || username.trim().length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { username: username.trim() }
    });
    
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Update username error:', error);
    res.status(500).json({ error: 'Failed to update username' });
  }
});

// Get user statistics
router.get('/me/stats', requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [
      totalTasks,
      completedTasks,
      todayTasks,
      todayCompleted,
      categoryStats
    ] = await Promise.all([
      prisma.task.count({
        where: { userId: user.id }
      }),
      prisma.task.count({
        where: { userId: user.id, completed: true }
      }),
      prisma.task.count({
        where: {
          userId: user.id,
          createdAt: { gte: today }
        }
      }),
      prisma.task.count({
        where: {
          userId: user.id,
          completed: true,
          completedAt: { gte: today }
        }
      }),
      prisma.task.groupBy({
        by: ['category'],
        where: {
          userId: user.id,
          completed: true
        },
        _count: true
      })
    ]);
    
    const categoryStatsObj = categoryStats.reduce((acc, item) => {
      acc[item.category] = item._count;
      return acc;
    }, {});
    
    res.json({
      stats: {
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        totalTasks,
        completedTasks,
        todayTasks,
        todayCompleted,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        categoryStats: categoryStatsObj
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
