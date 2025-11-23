// User helper functions for XP and level calculations

export function calculateLevel(xp) {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function updateUserLevel(user) {
  const newLevel = calculateLevel(user.xp);
  return newLevel;
}

export function calculateStreakBonus(streak) {
  return Math.floor(streak * 0.5);
}

export function updateStreak(user) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!user.lastActiveDate) {
    return 1;
  }
  
  const lastActive = new Date(user.lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  
  const diffTime = today - lastActive;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  if (diffDays === 1) {
    return user.streak + 1;
  } else if (diffDays > 1) {
    return 1;
  }
  
  return user.streak;
}

