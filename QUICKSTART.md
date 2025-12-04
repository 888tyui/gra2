# 🚀 Quick Start Guide

## Running Locally

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Setup Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/grass
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your local machine:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows
# Start MongoDB service from Services

# Linux
sudo systemctl start mongod
```

Or use **MongoDB Atlas** (cloud):
1. Create a free account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend/.env

### Step 4: Run the Applications

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Open Your Browser

Visit: http://localhost:5173

## Project Structure

```
grass2/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── pages/     # Landing, About, Docs, App pages
│   │   ├── components/ # Reusable components
│   │   └── context/   # React Context for state
│   └── package.json
│
├── backend/           # Express API
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth middleware
│   └── package.json
│
└── README.md
```

## Available Routes

- `/` - Landing page
- `/about` - About page
- `/docs` - Documentation
- `/app` - Main application (requires wallet login)

## Testing the App

1. Install **Phantom Wallet** browser extension
2. Create or import a Solana wallet
3. Visit http://localhost:5173
4. Click "Launch App" 
5. Connect your wallet
6. Start adding tasks and earning XP!

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### Wallet Connection Issues
- Install Phantom or Solflare wallet extension
- Make sure you're on the correct network
- Try refreshing the page

### Port Already in Use
- Backend: Change `PORT` in backend/.env
- Frontend: Change port in `vite.config.js`

## What's Next?

1. **Customize**: Update colors, fonts, and branding
2. **Deploy**: Follow Railway deployment guide in README.md
3. **Extend**: Add more features like social sharing, leaderboards, etc.

---

Need help? Check out the full [README.md](./README.md) or [Documentation](http://localhost:5173/docs)


