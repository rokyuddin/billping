import AnalyticsClient from '@/components/dashboard/analytics-client'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all subscriptions
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)

  // Fetch payment history (last 12 months)
  const twelveMonthsAgo = new Date()
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

  const { data: payments } = await supabase
    .from('payments')
    .select('*, subscriptions!inner(user_id)')
    .eq('subscriptions.user_id', user.id)
    .gte('date', twelveMonthsAgo.toISOString())
    .order('date', { ascending: true })

  return <AnalyticsClient subscriptions={subscriptions || []} payments={payments || []} />
}
