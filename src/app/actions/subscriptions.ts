'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createSubscription(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const data = {
    user_id: user.id,
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    amount: parseFloat(formData.get('amount') as string),
    currency: formData.get('currency') as string || 'USD',
    billing_cycle: formData.get('billing_cycle') as string,
    next_billing_date: formData.get('next_billing_date') as string,
    website_url: formData.get('website_url') as string || null,
    status: 'active',
  }

  const { error } = await supabase.from('subscriptions').insert([data])

  if (error) {
    redirect(`/dashboard/new?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateSubscription(id: string, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    amount: parseFloat(formData.get('amount') as string),
    currency: formData.get('currency') as string || 'USD',
    billing_cycle: formData.get('billing_cycle') as string,
    next_billing_date: formData.get('next_billing_date') as string,
    website_url: formData.get('website_url') as string || null,
    status: formData.get('status') as string,
  }

  const { error } = await supabase
    .from('subscriptions')
    .update(data)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    redirect(`/dashboard/subscription/${id}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteSubscription(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('subscriptions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    redirect(`/dashboard/subscription/${id}?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
