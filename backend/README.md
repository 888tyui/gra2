# Grass Backend API

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/grass?schema=public
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Database Setup

### PostgreSQL Setup

**Option 1: Local PostgreSQL**
```bash
# Install PostgreSQL
# macOS: brew install postgresql
# Windows: https://www.postgresql.org/download/windows/
# Linux: sudo apt install postgresql

# Start PostgreSQL
# macOS: brew services start postgresql
# Windows: Start service from Services
# Linux: sudo systemctl start postgresql

# Create database
createdb grass
```

**Option 2: Railway PostgreSQL**
```bash
# Railway automatically provides DATABASE_URL
# No manual setup needed!
```

### Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## API Endpoints

### Authentication
- `GET /api/auth/nonce/:walletAddress` - Get nonce for signing
- `POST /api/auth/verify` - Verify wallet signature and login

### Users
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me/username` - Update username
- `GET /api/users/me/stats` - Get user statistics

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:taskId` - Update task
- `POST /api/tasks/:taskId/complete` - Complete task
- `POST /api/tasks/:taskId/uncomplete` - Uncomplete task
- `DELETE /api/tasks/:taskId` - Delete task

### AI
- `POST /api/ai/suggest` - Get AI task suggestions
- `POST /api/ai/help` - Get AI help/motivation

## Authentication

Most endpoints require `x-wallet-address` header:

```javascript
headers: {
  'x-wallet-address': 'YourSolanaWalletAddressHere'
}
```

## Tech Stack

- **Express** - Web framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **Solana Web3** - Wallet authentication
- **OpenAI** - AI features (optional)
