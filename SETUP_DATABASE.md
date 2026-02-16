# Database Setup Instructions

Your seed route is failing because you don't have a real database configured.

## Option 1: Vercel Postgres (Recommended - Free & Easy)

1. Go to https://vercel.com/dashboard
2. Click "Storage" tab
3. Click "Create Database" → Select "Postgres"
4. Copy the connection strings
5. Paste them into your `.env` file
6. Restart your dev server

## Option 2: Neon (Free PostgreSQL)

1. Go to https://neon.tech
2. Sign up for free
3. Create a new project
4. Copy the connection string
5. Update your `.env` file:
   ```
   POSTGRES_URL="your-connection-string-here"
   ```
6. Restart your dev server

## Option 3: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database
3. Update `.env`:
   ```
   POSTGRES_URL="postgresql://postgres:password@localhost:5432/nextjs_dashboard"
   ```
4. Restart your dev server

## After Setting Up Database:

1. Stop your dev server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Visit http://localhost:3000/seed
4. You should see: `{"message":"Database seeded successfully"}`
