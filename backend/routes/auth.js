import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Verify wallet and login/register
router.post('/verify', authenticate, async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
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
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Get nonce for signing
router.get('/nonce/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  const nonce = `Sign this message to authenticate with Grass: ${Date.now()}`;
  
  res.json({ nonce, walletAddress });
});

export default router;
