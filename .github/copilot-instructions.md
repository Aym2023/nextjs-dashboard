# AI Coding Agent Instructions for Next.js Dashboard App

## Architecture Overview
This is a Next.js 13+ App Router dashboard application built with TypeScript and Tailwind CSS. The app follows a feature-based component organization under `app/ui/` and uses Supabase PostgreSQL for data persistence with direct SQL queries. Authentication is handled via NextAuth.js.

### Key Components
- **Data Layer**: `app/lib/data.ts` contains async functions for fetching data from Postgres (e.g., `fetchRevenue()`, `fetchLatestInvoices()`)
- **Type Definitions**: `app/lib/definitions.ts` defines TypeScript interfaces for User, Customer, Invoice, Revenue, etc.
- **Utilities**: `app/lib/utils.ts` provides formatting functions like `formatCurrency()` (converts cents to dollars) and `formatDateToLocal()`
- **UI Components**: Organized by feature in `app/ui/` (dashboard, invoices, customers) with reusable components like `Button`
- **API Routes**: Placeholder routes in `app/query/route.ts` and seeding in `app/seed/route.ts`

### Data Patterns
- Amounts stored as cents in database, formatted to currency strings in UI
- Invoice status: `'pending' | 'paid'` string union
- Customer relationships via `customer_id` foreign keys
- Revenue data aggregated by month

## Development Workflow
- **Start dev server**: `pnpm dev --turbopack`
- **Build**: `pnpm build`
- **Start production**: `pnpm start`
- Database seeding: POST to `/seed` route to create tables and insert placeholder data from `app/lib/placeholder-data.ts`

## Environment Variables
Required environment variables in `.env.local`:
- `POSTGRES_URL`: Supabase Postgres connection string with pooling
- `POSTGRES_PRISMA_URL`: Alternative Postgres URL for Prisma (if used)
- `POSTGRES_URL_NON_POOLING`: Non-pooling connection string
- `POSTGRES_USER`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`: Individual Postgres credentials
- `AUTH_SECRET`: Secret key for NextAuth.js (generate with `openssl rand -base64 32`)
- `AUTH_URL`: Base URL for authentication (e.g., `http://localhost:3000/api/auth`)

## Coding Conventions
- **Imports**: Use `@/` path alias for absolute imports (configured in `tsconfig.json`)
- **Styling**: Tailwind CSS with custom blue palette (400: #2589FE, 500: #0070F3, 600: #2F6FEB)
- **Conditional Classes**: Use `clsx()` for dynamic class names (e.g., active nav links in `app/ui/dashboard/nav-links.tsx`)
- **Icons**: Heroicons from `@heroicons/react/24/outline`
- **Client Components**: Mark with `'use client'` directive when using hooks like `usePathname()`
- **Error Handling**: Data fetch functions throw `Error` with descriptive messages for UI display
- **Forms**: Server components with form elements; actions not yet implemented (placeholder forms exist)

## Component Patterns
- **Navigation**: Side nav with active link highlighting using `usePathname()` and `clsx`
- **Buttons**: Reusable `Button` component extending HTML button props with default blue styling
- **Tables**: Feature-specific table components (e.g., `app/ui/customers/table.tsx`) for displaying data
- **Charts**: Revenue chart in `app/ui/dashboard/revenue-chart.tsx` using utility functions for axis generation

## Database Schema
- **users**: id (UUID), name, email, password (hashed with bcrypt)
- **customers**: id (UUID), name, email, image_url
- **invoices**: id (UUID), customer_id (UUID), amount (INT cents), status, date
- **revenue**: month, revenue (aggregated)

Reference `app/seed/route.ts` for exact table creation SQL and `app/lib/placeholder-data.ts` for sample data structure.</content>
<parameter name="filePath">c:\MY PROGRARMS\Next\dashboard-app\nextjs-dashboard\.github\copilot-instructions.md