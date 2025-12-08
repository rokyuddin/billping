import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import SubscriptionDetailClient from './subscription-detail-client'

export default async function SubscriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch subscription
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !subscription) {
    notFound()
  }

  // Fetch payment history
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('subscription_id', id)
    .order('date', { ascending: false })
    .limit(10)

  return (
    <SubscriptionDetailClient
      subscription={subscription}
      payments={payments || []}
    />
  )
}
