# 🌱 Grass - Touch Grass

**A gamified self-improvement platform that rewards you for building healthy habits**

Grass is a web application that encourages regular routines, healthy behaviors, and consistent exercise through direct rewards. With task management, XP systems, leveling up, streak tracking, and AI assistance, it supports a healthy and productive lifestyle.

## ✨ Key Features

- 🔐 **Solana Wallet Authentication** - Login with Phantom, Solflare, and other Solana wallets
- ✅ **Task Management** - Create, complete, and categorize your tasks
- ⚡ **XP & Level System** - Earn experience points and level up as you complete tasks
- 🔥 **Streak Tracking** - Get bonus XP for staying active every day
- 🤖 **AI Assistant** - Get task suggestions and motivational messages
- 📊 **Statistics Dashboard** - Visualize your progress and achievements
- 🎨 **Grass Theme Design** - Clean, modern, monochromatic UI

## 🏗️ Tech Stack

### Frontend
- React 18
- React Router
- Vite
- Solana Wallet Adapter
- Axios
- Lucide Icons
- Google Fonts (Inter & Roboto Mono)

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Solana Web3.js
- OpenAI API (AI features)
- TweetNaCl (signature verification)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- Solana wallet (Phantom recommended)
- OpenAI API Key (optional - for AI features)

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo>
cd grass2
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file:

\`\`\`env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/grass
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
\`\`\`

Start the backend:

\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup

\`\`\`bash
cd frontend
npm install
\`\`\`

Create a `.env` file:

\`\`\`env
VITE_API_URL=http://localhost:3001
\`\`\`

Start the frontend:

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:5173` in your browser

## 🚂 Railway Deployment

### Backend Deployment

1. Create a new project on Railway
2. Add MongoDB service (or use MongoDB Atlas)
3. Push backend folder to GitHub repository
4. Connect GitHub repository in Railway
5. Set Root Directory to `backend`
6. Configure environment variables:
   - `MONGODB_URI` - MongoDB connection string
   - `OPENAI_API_KEY` - OpenAI API key (optional)
   - `FRONTEND_URL` - Frontend URL (after deployment)
   - `NODE_ENV=production`

### Frontend Deployment

1. Add a new service in Railway
2. Connect the same GitHub repository
3. Set Root Directory to `frontend`
4. Configure environment variables:
   - `VITE_API_URL` - Backend API URL
5. Update backend's `FRONTEND_URL` with the generated URL

## 📁 Project Structure

\`\`\`
grass2/
├── backend/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   ├── server.js         # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React Context
│   │   ├── utils/        # Utility functions
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
\`\`\`

## 🎮 How to Use

1. **Login**: Connect your Solana wallet (Phantom, etc.)
2. **Add Tasks**: Create tasks in the input field
3. **Complete Tasks**: Click the checkbox to complete tasks and earn XP
4. **AI Helper**: Click the AI Helper button to get task suggestions
5. **View Stats**: Check your level, XP, and streak on the dashboard

## 📊 XP System

- **Low Priority**: +10 XP
- **Medium Priority**: +15 XP
- **High Priority**: +25 XP
- **Streak Bonus**: +0.5 XP per day of streak
- **Level Formula**: Level = √(XP / 100) + 1

## 🎨 Design Theme

- **Primary Colors**: Grass Green (#2eb82e ~ #0d3d0d)
- **Fonts**: 
  - Inter (body text)
  - Roboto Mono (numbers, code)
- **Style**: Minimal, monochromatic, modern

## 🔒 Security

- Solana wallet signature authentication
- Signature verification using TweetNaCl
- CORS configuration
- Environment variables for sensitive data

## 🤝 Contributing

Issues and pull requests are welcome!

## 📄 License

MIT License

---

**Grass - Touch Grass** 🌱

Start your journey to healthier habits, constructive behaviors, and consistent growth!
