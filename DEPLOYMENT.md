# 🚂 Railway Deployment Guide

## Prerequisites

1. **GitHub Account** - Code must be pushed to GitHub
2. **Railway Account** - Sign up at https://railway.app
3. **OpenAI API Key** (Optional) - https://platform.openai.com

---

## Step 1: Push Code to GitHub

### 1-1. Initialize Git Repository

```bash
# From project root
git init
git add .
git commit -m "Initial commit: Grass app with PostgreSQL"
```

### 1-2. Create GitHub Repository

1. Create new repository on GitHub (e.g., `grass-app`)
2. Choose Public or Private

### 1-3. Push Code

```bash
# Replace your-username with your GitHub username
git remote add origin https://github.com/your-username/grass-app.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Railway

### 2-1. Create New Project

1. Go to https://railway.app and login
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub access
5. Select your `grass-app` repository

### 2-2. Add PostgreSQL Database

**IMPORTANT: Do this BEFORE configuring backend**

1. In the same project, click "New"
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway will automatically create the database
5. The `DATABASE_URL` variable is automatically added

### 2-3. Configure Backend Service

1. Click on your backend service (the one from GitHub)
2. Go to Settings tab
3. Set **Root Directory**:
   ```
   backend
   ```
4. Set **Start Command**:
   ```
   npm start
   ```

### 2-4. Add Environment Variables

Settings → Variables:

```env
NODE_ENV=production
OPENAI_API_KEY=sk-...
FRONTEND_URL=https://temporary-url.railway.app
```

**IMPORTANT**: 
- `DATABASE_URL` is automatically set by Railway PostgreSQL
- `FRONTEND_URL` will be updated after frontend deployment

### 2-5. Verify Deployment

1. Check Deployments tab for build progress
2. Wait for successful deployment
3. Copy the generated URL (e.g., `https://grass-backend-production.up.railway.app`)
4. Test the endpoint in browser - should see:
   ```json
   {"message":"🌱 Grass API - Touch Grass!"}
   ```

---

## Step 3: Deploy Frontend to Railway

### 3-1. Add New Service

1. In the same project, click "New"
2. Select "GitHub Repo"
3. Choose the same repository

### 3-2. Configure Frontend Service

1. Go to Settings tab
2. Set **Root Directory**:
   ```
   frontend
   ```
3. Set **Build Command**:
   ```
   npm run build
   ```
4. Set **Start Command**:
   ```
   npm run preview
   ```

### 3-3. Add Environment Variables

Settings → Variables:

```env
VITE_API_URL=https://grass-backend-production.up.railway.app
```

**IMPORTANT**: Use the exact Backend URL from Step 2-5

### 3-4. Verify Deployment

1. Check Deployments tab
2. Wait for successful build
3. Copy the generated URL (e.g., `https://grass-frontend-production.up.railway.app`)
4. Open in browser - landing page should load

---

## Step 4: Update Backend CORS

Now that we have the Frontend URL, update Backend environment variables.

### 4-1. Go to Backend Service

1. Click on Backend service in Railway
2. Go to Settings → Variables

### 4-2. Update FRONTEND_URL

```env
FRONTEND_URL=https://grass-frontend-production.up.railway.app
```

**IMPORTANT**: Use the exact Frontend URL from Step 3-4

### 4-3. Redeploy

1. Variables are automatically saved
2. Backend will redeploy automatically
3. Wait for redeployment to complete

---

## Step 5: Final Testing

### 5-1. Access Frontend

1. Visit your Frontend URL
2. Verify landing page loads correctly

### 5-2. Test All Features

1. **Click "Launch App"**
2. **Connect Solana wallet** (Phantom, etc.)
3. **Sign authentication message**
4. **Add a task**
5. **Complete task** → Check XP gain
6. **View statistics**
7. **Test AI Helper** (if OpenAI API configured)

---

## Troubleshooting

### ❌ Backend Won't Start

**Check:**
- Root Directory is set to `backend`
- DATABASE_URL exists (added by PostgreSQL service)
- Check logs: Deployments → View Logs

**Solution:**
```bash
# Test locally first
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm start
```

### ❌ Database Connection Failed

**Check:**
- PostgreSQL service is running in Railway
- DATABASE_URL is present in backend variables
- Prisma migrations ran successfully

**Solution:**
1. Check Railway PostgreSQL service status
2. Verify DATABASE_URL format:
   ```
   postgresql://user:password@host:port/database?schema=public
   ```

### ❌ Prisma Migration Error

**Error:** `Prisma schema not found`

**Solution:**
1. Make sure Prisma schema exists at `backend/prisma/schema.prisma`
2. Start command includes: `npx prisma migrate deploy`

### ❌ Frontend Build Fails

**Check:**
- Root Directory is `frontend`
- VITE_API_URL is set
- Build Command is `npm run build`

**Solution:**
```bash
# Test build locally
cd frontend
npm install
npm run build
```

### ❌ CORS Error

**Problem:** `Access-Control-Allow-Origin` error

**Solution:**
1. Verify `FRONTEND_URL` in backend variables
2. Must match exact frontend URL (no trailing slash)
3. Redeploy backend after updating

### ❌ Wallet Connection Failed

**Check:**
- Phantom or Solflare wallet is installed
- Check browser console for errors

**Solution:**
- Refresh the page
- Unlock wallet
- Try different browser

---

## Project Structure in Railway

Your Railway project should have **3 services**:

```
grass-app (Project)
├── 📦 Backend (GitHub)
│   ├── Root: backend/
│   ├── DATABASE_URL (from PostgreSQL)
│   ├── OPENAI_API_KEY
│   └── FRONTEND_URL
│
├── 🗄️ PostgreSQL (Database)
│   └── Automatically provides DATABASE_URL
│
└── 🎨 Frontend (GitHub)
    ├── Root: frontend/
    └── VITE_API_URL (Backend URL)
```

---

## Environment Variables Checklist

### ✅ Backend
```env
NODE_ENV=production
DATABASE_URL=postgresql://...  (auto-generated by Railway)
OPENAI_API_KEY=sk-...
FRONTEND_URL=https://your-frontend.railway.app
```

### ✅ Frontend
```env
VITE_API_URL=https://your-backend.railway.app
```

---

## Database Management

### View Database

**Option 1: Prisma Studio**
```bash
# Run locally with Railway DATABASE_URL
DATABASE_URL="postgresql://..." npx prisma studio
```

**Option 2: Railway Dashboard**
1. Click PostgreSQL service
2. Go to "Data" tab
3. View tables and data

### Run Migrations

Migrations run automatically on deployment via `npm start`.

**Manual migration:**
```bash
# Locally
npx prisma migrate dev

# On Railway
# Included in start command
```

### Reset Database (⚠️ Deletes all data)

```bash
# Locally
npx prisma migrate reset

# On Railway
# Manually delete and recreate PostgreSQL service
```

---

## Custom Domain (Optional)

### Add Custom Domain

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Railway service → Settings → Domains
3. Click "Custom Domain"
4. Follow DNS configuration instructions

**Example:**
- Frontend: `app.yourdomain.com`
- Backend: `api.yourdomain.com`

---

## Monitoring

### Railway Dashboard

**Metrics Tab:**
- CPU usage
- Memory usage
- Network traffic
- Request count

**Logs Tab:**
- Application logs
- Error messages
- API requests
- Database queries

### PostgreSQL Monitoring

**Data Tab:**
- Table sizes
- Row counts
- Query performance

---

## Updating Code

After making changes:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Railway automatically detects changes and redeploys! 🚀

---

## Costs

- **Railway**: $5/month Hobby Plan (can start with free trial)
- **PostgreSQL**: Included in Railway plan
- **OpenAI API**: Pay-as-you-go (optional)

**Free Tier:**
- Railway offers $5 free credit monthly
- Perfect for testing and small projects

---

## Benefits of PostgreSQL on Railway

✅ **All-in-one**: Database and app in same project
✅ **Automatic connection**: DATABASE_URL auto-generated
✅ **Easy management**: Built-in database viewer
✅ **No external accounts**: No MongoDB Atlas needed
✅ **Backups**: Automatic backups included
✅ **Fast**: Low latency between services

---

## Additional Tips

1. **Monitor logs regularly** - Check for errors
2. **Set up backups** - Railway provides automatic backups
3. **Environment variables** - Never commit secrets to GitHub
4. **Database indexes** - Already optimized in Prisma schema
5. **Keep packages updated** - Run `npm update` periodically

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Prisma Docs: https://www.prisma.io/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/

---

**Congratulations! 🎉 Your Grass app is now live with PostgreSQL!** 🌱
