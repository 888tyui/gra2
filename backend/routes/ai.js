import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import OpenAI from 'openai';

const router = express.Router();

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Get AI suggestions for tasks
router.post('/suggest', requireAuth, async (req, res) => {
  try {
    if (!openai) {
      return res.status(503).json({ 
        error: 'AI service not configured',
        suggestions: [
          { title: 'Morning walk', category: 'exercise', xpReward: 15 },
          { title: 'Drink 8 glasses of water', category: 'health', xpReward: 10 },
          { title: 'Read for 30 minutes', category: 'learning', xpReward: 20 }
        ]
      });
    }
    
    const { context, count = 3 } = req.body;
    
    const prompt = `You are a helpful assistant for a productivity app called "Grass - Touch Grass". 
Suggest ${count} healthy, productive daily tasks that promote good lifestyle habits.
${context ? `Context: ${context}` : ''}

Return ONLY a JSON array of tasks with this exact format:
[
  {
    "title": "task title (brief, actionable)",
    "description": "optional brief description",
    "category": "health|exercise|learning|work|social|creative|other",
    "xpReward": 10-30
  }
]`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });
    
    const response = completion.choices[0].message.content.trim();
    const suggestions = JSON.parse(response);
    
    res.json({ suggestions });
  } catch (error) {
    console.error('AI suggestion error:', error);
    
    // Fallback suggestions
    res.json({
      suggestions: [
        { title: 'Take a 20-minute walk outside', category: 'exercise', xpReward: 15, description: 'Get some fresh air and sunlight' },
        { title: 'Practice mindfulness for 10 minutes', category: 'health', xpReward: 15, description: 'Meditation or breathing exercises' },
        { title: 'Learn something new', category: 'learning', xpReward: 20, description: 'Read an article or watch an educational video' }
      ]
    });
  }
});

// Get AI help/tips
router.post('/help', requireAuth, async (req, res) => {
  try {
    if (!openai) {
      return res.json({ 
        tip: 'Start small! Complete one task at a time and build momentum. Consistency is key! 🌱'
      });
    }
    
    const { question, userStats } = req.body;
    
    const prompt = `You are a motivational coach for "Grass - Touch Grass", a productivity app.
${question ? `User question: ${question}` : 'Give a motivational tip about building healthy habits.'}
${userStats ? `User stats: Level ${userStats.level}, ${userStats.streak} day streak, ${userStats.completedTasks} tasks completed` : ''}

Give a brief, encouraging response (2-3 sentences max). Use the 🌱 emoji if appropriate.`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 150
    });
    
    const tip = completion.choices[0].message.content.trim();
    
    res.json({ tip });
  } catch (error) {
    console.error('AI help error:', error);
    res.json({ 
      tip: 'Keep going! Every completed task is a step toward a better you. Touch grass and stay consistent! 🌱'
    });
  }
});

export default router;
