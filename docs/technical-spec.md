# Technical Specification: BillPing

## 1. Project Overview

BillPing is a Subscription Reminder Micro SaaS platform designed to help users track recurring expenses, receive reminders, and analyze spending habits.

## 2. Architecture

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI.
- **Backend**: Next.js Server Actions / API Routes.
- **Database**: Supabase (PostgreSQL).
- **Auth**: Supabase Auth (Email/Password, Google OAuth).
- **Storage**: Supabase Storage (for receipt attachments).
- **Jobs**: Supabase Edge Functions or Cron (for reminder processing).

## 3. Database Schema

### `users`

- `id` (UUID, PK)
- `email` (Text, Unique)
- `full_name` (Text)
- `avatar_url` (Text)
- `created_at` (Timestamp)
- `preferences` (JSONB) - e.g., default currency, theme

### `subscriptions`

- `id` (UUID, PK)
- `user_id` (UUID, FK -> users.id)
- `name` (Text) - e.g., "Netflix"
- `category` (Text) - e.g., "Entertainment", "Utilities"
- `amount` (Decimal)
- `currency` (Text) - default "USD"
- `billing_cycle` (Text) - "monthly", "yearly", "weekly", "custom"
- `next_billing_date` (Date)
- `website_url` (Text, Optional)
- `logo_url` (Text, Optional)
- `status` (Text) - "active", "cancelled", "paused"
- `created_at` (Timestamp)

### `reminders`

- `id` (UUID, PK)
- `subscription_id` (UUID, FK -> subscriptions.id)
- `type` (Text) - "email", "push"
- `days_before` (Integer) - e.g., 1, 3, 7
- `is_enabled` (Boolean)

### `payments` (History)

- `id` (UUID, PK)
- `subscription_id` (UUID, FK -> subscriptions.id)
- `amount` (Decimal)
- `date` (Date)
- `status` (Text) - "paid", "pending", "overdue"
- `receipt_url` (Text, Optional)
- `notes` (Text, Optional)

## 4. API Specification (Internal)

### Authentication

- handled by `@supabase/auth-helpers-nextjs`

### Subscriptions

- `GET /api/subscriptions`: List all user subscriptions (supports filtering/sorting).
- `POST /api/subscriptions`: Create new subscription.
- `GET /api/subscriptions/:id`: Get details.
- `PUT /api/subscriptions/:id`: Update.
- `DELETE /api/subscriptions/:id`: Delete.

### Analytics

- `GET /api/analytics/spending`: Get spending breakdown by category/time.
- `GET /api/analytics/upcoming`: Get timeline of upcoming bills.

## 5. Security & Privacy

- **RLS (Row Level Security)**: Enabled on all tables. Users can only access their own data.
- **Encryption**: Sensitive data in transit (SSL) and at rest (Postgres).
- **Compliance**: GDPR compliant data export/deletion.
