-- CreateEnum
CREATE TYPE "Category" AS ENUM ('health', 'exercise', 'learning', 'work', 'social', 'creative', 'other');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "Recurring" AS ENUM ('none', 'daily', 'weekly', 'monthly');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "totalTasksCompleted" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "xpReward" INTEGER NOT NULL DEFAULT 10,
    "category" "Category" NOT NULL DEFAULT 'other',
    "priority" "Priority" NOT NULL DEFAULT 'medium',
    "dueDate" TIMESTAMP(3),
    "recurring" "Recurring" NOT NULL DEFAULT 'none',
    "aiSuggested" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "User_walletAddress_idx" ON "User"("walletAddress");

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "Task"("userId");

-- CreateIndex
CREATE INDEX "Task_walletAddress_idx" ON "Task"("walletAddress");

-- CreateIndex
CREATE INDEX "Task_createdAt_idx" ON "Task"("createdAt");

-- CreateIndex
CREATE INDEX "Task_userId_completed_idx" ON "Task"("userId", "completed");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

