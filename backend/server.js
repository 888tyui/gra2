import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import userRoutes from './routes/users.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test Database Connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL Connected');
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error);
    process.exit(1);
  }
}

testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🌱 Grass API - Touch Grass!' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🌱 Grass Backend running on port ${PORT}`);
});
