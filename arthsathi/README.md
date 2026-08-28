# ArthSathi

ArthSathi (Arth = wealth/finance, Sathi = companion) is an AI-powered, voice-first, multilingual financial companion web app designed for underprivileged and low-literacy users in rural India.

## Features (MVP)

- 🌐 Multilingual UI — Hindi, Marathi, Punjabi, Tamil, Telugu, Bengali, English
- 🎤 Voice input & text-to-speech via browser Web Speech API
- 📋 Onboarding — collect income, debts, and financial goals
- 🗺️ Financial Roadmap — rule-based personalised plan (no AI hallucinations)
- 🏛️ Scheme Matching — ranked government schemes based on user profile
- 🔊 Per-card read-aloud for low-literacy users

## Folder Structure

- `frontend/` — Next.js 14 + Tailwind CSS (Progressive Web App)
- `backend/` — Node.js + Express + TypeScript API
- `docs/` — Architecture and design notes

---

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

---

### Backend

```bash
cd arthsathi/backend
npm install
```

Copy the env file and fill in your database URL:
```bash
cp .env.example .env
# Edit .env and set DATABASE_URL=postgresql://user:password@localhost:5432/arthsathi
```

Create the database and run the schema:
```bash
createdb arthsathi
psql arthsathi < src/db/schema.sql
```

Start the dev server:
```bash
npm run dev
# API runs on http://localhost:5000
```

**Available endpoints:**
- `GET  /api/health` — liveness check
- `GET  /api/db-health` — database check
- `POST /api/users` — register a user
- `POST /api/financial-profiles` — save income/debts/goals
- `GET  /api/schemes/match?goal=&income=` — get matched schemes

---

### Frontend

```bash
cd arthsathi/frontend
npm install
```

Create a local env file:
```bash
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:5000" > .env.local
```

Start the dev server:
```bash
npm run dev
# App runs on http://localhost:3000
```

**Pages:**
- `/` — Landing page
- `/onboarding` — User profile form
- `/roadmap` — Personalised financial roadmap
- `/schemes` — Matched government schemes
- `/schemes/[slug]` — Scheme detail

---

## User Flow

```
Landing → Onboarding (language + income + goal) → Roadmap → Schemes
```
