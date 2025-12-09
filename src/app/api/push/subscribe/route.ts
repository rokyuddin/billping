import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subscription } = await request.json()

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription data required' }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('preferences')
      .eq('id', user.id)
      .single()

    const currentPreferences = profile?.preferences ?? {}

    const updatedPreferences = {
      ...currentPreferences,
      notifications: {
        ...currentPreferences.notifications,
        push: true,
      },
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        push_subscription: subscription,
        preferences: updatedPreferences,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (error) {
      console.error(error)
      return NextResponse.json({ error: 'Failed to save subscription' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

