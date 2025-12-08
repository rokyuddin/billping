# Supabase Edge Functions

This directory contains Supabase Edge Functions for BillPing.

## Functions

### send-reminders

Sends email reminders for upcoming subscription payments.

**Trigger**: Cron job (daily at 9:00 AM UTC)

**Logic**:

- Checks for subscriptions due in 1, 3, or 7 days
- Sends email via Resend API
- Respects user notification preferences
- Only sends to users with email notifications enabled

**Environment Variables Required**:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Deployment

### 1. Install Supabase CLI

```bash
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link to your project

```bash
supabase link --project-ref vkhnlqdzeqqfhkrjanui
```

### 4. Deploy the function

```bash
supabase functions deploy send-reminders
```

### 5. Set environment variables

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
supabase secrets set NEXT_PUBLIC_SITE_URL=https://billping.app
```

### 6. Set up cron job

In Supabase Dashboard → Database → Cron Jobs:

```sql
SELECT cron.schedule(
  'send-daily-reminders',
  '0 9 * * *', -- 9:00 AM UTC daily
  $$
  SELECT net.http_post(
    url := 'https://vkhnlqdzeqqfhkrjanui.supabase.co/functions/v1/send-reminders',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
  ) AS request_id;
  $$
);
```

## Testing Locally

```bash
supabase functions serve send-reminders --env-file .env.local
```

Then trigger manually:

```bash
curl -X POST http://localhost:54321/functions/v1/send-reminders \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Email Service Setup

This function uses [Resend](https://resend.com) for sending emails.

1. Sign up at https://resend.com
2. Get your API key
3. Add your domain and verify DNS
4. Set the API key as a secret (see step 5 above)

## Monitoring

Check function logs in Supabase Dashboard → Edge Functions → send-reminders → Logs
