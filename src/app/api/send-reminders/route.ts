/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import webpush from 'web-push'
import { Resend } from 'resend';



webpush.setVapidDetails(
  "mailto:rokyuddin.dev@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  currency: string
  next_billing_date: string
}

interface Profile {
  id: string
  email: string
  full_name: string
  preferences: {
    notifications?: {
      email?: boolean
      push?: boolean
    }
  }
  push_subscription?: any // PushSubscription object
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}



export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: NextRequest) {
  try {
    // Optional: Add API key verification for security
    const authHeader = request.headers.get('authorization')
    const expectedApiKey = process.env.CRON_SECRET

    if (expectedApiKey && authHeader !== `Bearer ${expectedApiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: corsHeaders }
      )
    }

    const supabaseClient = createAdminClient()

    // Get current date and dates for reminder checks
    const today = new Date()
    const oneDayFromNow = new Date(today)
    oneDayFromNow.setDate(today.getDate() + 1)

    const threeDaysFromNow = new Date(today)
    threeDaysFromNow.setDate(today.getDate() + 3)

    const sevenDaysFromNow = new Date(today)
    sevenDaysFromNow.setDate(today.getDate() + 7)

    // Get subscriptions that need reminders
    const { data: subscriptions, error: subsError } = await supabaseClient
      .from('subscriptions')
      .select('*, profiles!inner(email, full_name, preferences)')
      .eq('status', 'active')
      .or(
        `next_billing_date.eq.${oneDayFromNow.toISOString().split('T')[0]},next_billing_date.eq.${threeDaysFromNow.toISOString().split('T')[0]},next_billing_date.eq.${sevenDaysFromNow.toISOString().split('T')[0]}`
      )



    if (subsError) throw subsError

    const emailsSent: Array<{ subscription: string; user: string; daysUntil: number }> = []
    const errors: Array<{ subscription: string; error: unknown }> = []

        const resendApiKey = process.env.RESEND_API_KEY
        if (!resendApiKey) {
          throw new Error('RESEND_API_KEY is not configured')
        }
    const resend = new Resend(resendApiKey);


    // Process each subscription
    for (const sub of subscriptions as Array<Subscription & { profiles: Profile }>) {
      const profile = sub.profiles

      // Check if user has email notifications enabled
      if (profile.preferences?.notifications?.email === false) {
        continue
      }

      // Calculate days until billing
      const billingDate = new Date(sub.next_billing_date)
      const daysUntil = Math.ceil(
        (billingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )



      // Send email via Resend
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billping.app'

       const emailResponse = await resend.emails.send({
          from: 'BillPing <onboarding@resend.dev>',
          to: ['rokyuddin.dev@gmail.com'],
          subject: `Reminder: ${sub.name} payment in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`,
 html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f0f0f; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #0f0f0f; color: #ffffff; padding: 20px; text-align: center; border: 2px solid #0f0f0f; }
                    .content { background: #ffffff; padding: 30px; border: 2px solid #0f0f0f; border-top: none; }
                    .amount { font-size: 32px; font-weight: bold; color: #ec4899; margin: 20px 0; }
                    .button { display: inline-block; background: #0f0f0f; color: #ffffff; padding: 12px 24px; text-decoration: none; font-weight: bold; border: 2px solid #0f0f0f; box-shadow: 4px 4px 0px 0px #ec4899; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1 style="margin: 0; font-size: 24px;">💸 BILLPING REMINDER</h1>
                    </div>
                    <div class="content">
                      <h3>Hey ${profile.full_name || 'there'},</h3>
                      <p>Just a heads up: your <strong>${sub.name}</strong> subscription is coming up!</p>
                      
                      <div class="amount">
                        ${getCurrencySymbol(sub.currency)}${sub.amount.toFixed(2)}
                      </div>
                      
                      <p><strong>Due in ${daysUntil} day${daysUntil > 1 ? 's' : ''}</strong> on ${new Date(sub.next_billing_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      
                      <p>Want to review or cancel? Head to your dashboard:</p>
                      
                      <a href="${siteUrl}/dashboard/subscription/${sub.id}" class="button" style="color: #ffffff;">
                        View Subscription
                      </a>
                      
                      <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
                        Don't want these reminders? Update your notification preferences in settings.
                      </p>
                    </div>
                    <div class="footer">
                      <p>BillPing - Stop burning money on forgotten subscriptions</p>
                      <p>Built with hate for hidden fees 💀</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
        })

        
        if (!emailResponse.error) {
          emailsSent.push({ subscription: sub.name, user: profile.email, daysUntil })
        } else {
          errors.push({ subscription: sub.name, error: emailResponse.error })
        }
      } catch (emailError) {
        errors.push({
          subscription: sub.name,
          error: emailError instanceof Error ? emailError.message : 'Unknown error',
        })
      }

      // Send push notification if enabled
      if (profile.preferences?.notifications?.push && (profile as any).push_subscription) {
        try {
          const pushSubscription = (profile as any).push_subscription
          
          // Note: In production, you would use web-push library with VAPID keys
          // For now, we'll use the Web Push API directly
          const notificationPayload = {
            title: `${sub.name} - Bill Due ${daysUntil === 1 ? 'Tomorrow' : `in ${daysUntil} Days`}`,
            body: `${getCurrencySymbol(sub.currency)}${sub.amount.toFixed(2)} will be charged on ${new Date(sub.next_billing_date).toLocaleDateString()}`,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: `bill-${sub.id}`,
            data: {
              url: `/dashboard/subscription/${sub.id}`,
              subscriptionId: sub.id,
              amount: sub.amount,
              currency: sub.currency
            }
          }

          // In a real implementation, you would use web-push library here
          // For demonstration, we're logging the notification
          console.log('Would send push notification:', {
            subscription: pushSubscription,
            payload: notificationPayload
          })
          
          // TODO: Implement actual push notification sending with web-push library
          await webpush.sendNotification(pushSubscription, JSON.stringify(notificationPayload))
          
        } catch (pushError) {
          console.error('Push notification error:', pushError)
          // Don't add to errors array as email was sent successfully
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        emailsSent: emailsSent.length,
        errors: errors.length,
        details: { emailsSent, errors },
      },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400, headers: corsHeaders }
    )
  }
}

function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BDT: '৳',
  }
  return symbols[currency] || currency + ' '
}
