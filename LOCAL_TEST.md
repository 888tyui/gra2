# 🧪 Local Testing Guide (PostgreSQL Version)

Test all features locally before deploying!

## 1️⃣ PostgreSQL Setup

### Install PostgreSQL

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
1. Download from https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the password you set!

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Create Database

```bash
# macOS/Linux
createdb grass

# Windows (in psql)
CREATE DATABASE grass;
```

### Set DATABASE_URL

Create `backend/.env`:
```env
PORT=3001
DATABASE_URL=postgresql://postgres:password@localhost:5432/grass?schema=public
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Note:** Replace `password` with your PostgreSQL password

---

## 2️⃣ Backend Setup & Test

### Terminal 1 - Backend

```bash
cd backend
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start server
npm run dev
```

### ✅ Verify Backend

**Check console output:**
```
✅ PostgreSQL Connected
🌱 Grass Backend running on port 3001
```

**Test API:**
```
Open browser: http://localhost:3001
Should see: {"message":"🌱 Grass API - Touch Grass!"}
```

**View Database (Optional):**
```bash
# Open Prisma Studio
npx prisma studio
# Opens at http://localhost:5555
```

---

## 3️⃣ Frontend Setup & Test

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

### ✅ Verify Frontend

**Check console output:**
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

**Open browser:**
```
http://localhost:5173
```

---

## 4️⃣ Full Feature Testing

### Landing Page (`/`)
- [ ] Hero section displays
- [ ] All icons/images load
- [ ] "Get Started" button works
- [ ] Navigation links work
- [ ] Footer links work

### App Page (`/app`)
1. **Wallet Connection**
   - [ ] Click "Launch App"
   - [ ] Select Phantom wallet
   - [ ] Connect and sign message
   - [ ] Dashboard loads

2. **Task Creation**
   - [ ] Enter task title
   - [ ] Click details button (sparkle icon)
   - [ ] Set category and priority
   - [ ] Add task
   - [ ] Task appears in list

3. **Task Completion**
   - [ ] Click checkbox
   - [ ] Task marked as complete
   - [ ] XP increases in header
   - [ ] Stats update

4. **Task Management**
   - [ ] Switch between Active/Completed filters
   - [ ] Delete task
   - [ ] Uncomplete task

5. **Statistics**
   - [ ] View current level and XP
   - [ ] Check completion stats
   - [ ] Verify streak counter
   - [ ] See category breakdown

6. **AI Helper** (if OpenAI configured)
   - [ ] Click "AI Helper" button
   - [ ] Get task suggestions
   - [ ] Add suggested task
   - [ ] Get motivational tip

---

## 5️⃣ Database Verification

### Check Data in Prisma Studio

```bash
# In backend directory
npx prisma studio
```

**Verify:**
- [ ] User created in `User` table
- [ ] Tasks appear in `Task` table
- [ ] XP and level update correctly
- [ ] Timestamps are correct

### Manual Database Check (Optional)

```bash
# Connect to PostgreSQL
psql grass

# Check tables
\dt

# View users
SELECT * FROM "User";

# View tasks
SELECT * FROM "Task";

# Exit
\q
```

---

## 6️⃣ Error Handling Tests

### Test Invalid Inputs

1. **Empty task title**
   - [ ] Shows error message

2. **Wallet disconnection**
   - [ ] Redirects to login

3. **Network offline**
   - [ ] Shows appropriate error

### Check Browser Console

**Open DevTools (F12) → Console**

✅ **Should NOT see:**
- CORS errors
- API errors (except expected ones)
- Uncaught exceptions

---

## 7️⃣ Responsive Design Test

### Test Different Screen Sizes

**Use Chrome DevTools (F12) → Toggle Device Toolbar**

1. **Mobile (375px)**
   - [ ] Layout stacks properly
   - [ ] Buttons are tappable
   - [ ] Text is readable

2. **Tablet (768px)**
   - [ ] Grid adjusts correctly
   - [ ] Navigation works

3. **Desktop (1440px)**
   - [ ] Full layout displays
   - [ ] Sidebar shows properly

---

## 8️⃣ Performance Check

### Chrome Lighthouse

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select categories
4. Click "Analyze page load"

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+

---

## 9️⃣ Common Issues & Solutions

### ❌ "PostgreSQL not found"

**Solution:**
```bash
# Verify PostgreSQL is running
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Windows
# Check Services app for PostgreSQL
```

### ❌ "Database 'grass' does not exist"

**Solution:**
```bash
# Create database
createdb grass

# Or in psql
CREATE DATABASE grass;
```

### ❌ "Prisma schema not found"

**Solution:**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### ❌ "Port 3001 already in use"

**Solution:**
```bash
# Find and kill process
# macOS/Linux
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### ❌ "Wallet not connecting"

**Solution:**
- Install Phantom wallet extension
- Unlock wallet
- Refresh page
- Check browser console for errors

---

## 🔟 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors
- [ ] All features work
- [ ] Responsive on all devices
- [ ] Fast page loads
- [ ] Smooth animations

### Database
- [ ] Migrations run successfully
- [ ] Tables created correctly
- [ ] Data persists properly
- [ ] Indexes working

### Security
- [ ] No sensitive data in code
- [ ] Environment variables used
- [ ] API keys not committed
- [ ] CORS configured correctly

### Functionality
- [ ] Wallet authentication works
- [ ] Tasks CRUD operations work
- [ ] XP system functions
- [ ] Stats calculate correctly
- [ ] AI helper works (or gracefully fails)

---

## Quick Test Script

Run this to verify everything quickly:

```bash
# 1. Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev &

# 2. Frontend (new terminal)
cd frontend
npm install
npm run dev &

# 3. Open browser
open http://localhost:5173

# 4. Test features
# - Connect wallet
# - Add task
# - Complete task
# - Check stats

# 5. Clean up
killall node
```

---

## All Tests Passed? ✅

You're ready to deploy! 🚀

**Next Step:** Follow **DEPLOYMENT.md** to deploy to Railway with PostgreSQL!

---

## Database Tools

### Prisma Studio (GUI)
```bash
npx prisma studio
# http://localhost:5555
```

### psql (CLI)
```bash
psql grass
```

### pgAdmin (Desktop App)
Download from https://www.pgadmin.org/

---

**Good luck with testing! 🌱**
