# 🌱 Grass - Feature Overview

## 🎨 Design System

### Color Palette (Grass Theme)
- **Primary Green**: #2eb82e (--grass-500)
- **Light Green**: #d9f2d9 (--grass-100)
- **Dark Green**: #0d3d0d (--grass-900)
- **Backgrounds**: Soft whites and light greens
- **Gradients**: All buttons and accents use grass green gradients

### Typography
- **Body Text**: Inter (Google Fonts)
- **Monospace**: Roboto Mono (for XP, levels, stats)
- **Style**: Clean, modern, minimal

### UI Style
- TaskFlow-inspired landing page
- Large hero sections with gradients
- Card-based layouts
- Smooth animations and transitions
- Fully responsive design

## 📄 Pages

### 1. Landing Page (`/`)
- Hero section with main value proposition
- Feature showcase (6 key features)
- "How It Works" step-by-step guide
- Statistics display
- Call-to-action sections
- Footer with links

### 2. About Page (`/about`)
- Mission statement
- Core values (Health, Simplicity, Community)
- Story behind the project
- Team/community focus
- CTA to get started

### 3. Docs Page (`/docs`)
- Getting Started guide
- Features overview
- Authentication explanation
- API reference
- FAQ section
- Sticky sidebar navigation

### 4. App Page (`/app`)
- Main dashboard (requires wallet login)
- Task management interface
- XP and level tracking
- Statistics and progress
- AI helper integration

## 🔐 Authentication Flow

1. User clicks "Launch App" or "Get Started"
2. Redirected to `/app`
3. Wallet connection modal appears
4. User connects Phantom/Solflare wallet
5. Sign authentication message
6. Backend verifies signature
7. User logged in and dashboard loads

## ✨ Main Features

### Task Management
- Create tasks with title, description, category, priority
- Mark tasks as complete/incomplete
- Delete tasks
- Filter by status (Active/Completed)
- Real-time updates

### Gamification
- **XP System**: Earn 10-25 XP per task based on priority
- **Leveling**: Level = √(XP / 100) + 1
- **Streaks**: Daily activity tracking with bonus XP
- **Progress Bar**: Visual XP progress to next level

### Statistics Dashboard
- Current level and XP
- Tasks completed (total and today)
- Success rate percentage
- Current streak
- Category breakdown

### AI Assistant
- Task suggestions based on healthy habits
- Motivational tips and messages
- Powered by OpenAI GPT
- Fallback suggestions if API not configured

### Categories
- 🌿 Health
- 💪 Exercise
- 📚 Learning
- 💼 Work
- 👥 Social
- 🎨 Creative
- ✨ Other

## 🎯 User Experience

### First-Time User Journey
1. Land on homepage → See value proposition
2. Click "Get Started" → Wallet connection
3. Create first task → Immediate XP reward
4. Complete task → Level up animation
5. View stats → See progress visualization
6. Try AI helper → Get suggestions

### Returning User Journey
1. Connect wallet → Auto-login
2. See current streak and level
3. View pending tasks
4. Complete daily tasks → Maintain streak
5. Track progress over time

## 🔧 Technical Features

### Frontend
- React Router for navigation
- Context API for state management
- Solana Wallet Adapter integration
- Axios for API calls
- Responsive CSS with custom properties
- Smooth page transitions

### Backend
- RESTful API design
- MongoDB for data persistence
- JWT-free auth (wallet signatures)
- XP calculation and level management
- Streak tracking with date logic
- AI integration (optional)

## 🎨 Component Structure

### Layout Components
- `Navbar` - Top navigation with links
- `Footer` - Bottom section with links and info
- `Header` - App header with user stats

### Page Components
- `LandingPage` - Marketing homepage
- `AboutPage` - About the project
- `DocsPage` - Documentation
- `AppPage` - Main application
- `LoginPage` - Wallet connection

### Feature Components
- `Dashboard` - Main app interface
- `TaskInput` - Task creation form
- `TaskList` - Task display and management
- `Stats` - Statistics widget
- `AIHelper` - AI assistant panel

### Context Providers
- `AuthContext` - User authentication state
- `TaskContext` - Task management and CRUD

## 🚀 Performance Features

- Lazy loading where appropriate
- Optimized images and assets
- Minimal dependencies
- Fast Vite build system
- Efficient MongoDB queries
- Client-side caching

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar
- **Tablet**: Adjusted grid layouts
- **Mobile**: Stacked layouts, hidden elements
- All touch-friendly with appropriate sizing

## 🔄 Future Enhancement Ideas

- [ ] Social sharing of achievements
- [ ] Leaderboards
- [ ] Team/group challenges
- [ ] Custom themes
- [ ] More AI features
- [ ] Mobile app (React Native)
- [ ] Blockchain rewards
- [ ] Calendar view
- [ ] Habit analytics
- [ ] Export data

---

**Note**: All features are built with scalability and maintainability in mind. The codebase is well-organized and documented for easy extension.

