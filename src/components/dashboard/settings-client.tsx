'use client'

import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import PushNotificationToggle from '@/components/push-notification-toggle'
import { ThemeToggle } from '@/components/theme-toggle'

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  budget_goal?: number | null
  preferences: {
    currency?: string
    theme?: string
    notifications?: {
      email?: boolean
      push?: boolean
      days_before?: number[]
    }
  }
}

export default function SettingsClient({
  user,
  profile,
}: {
  user: User
  profile: Profile | null
}) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const checkboxRef = useRef<HTMLInputElement>(null)
  const [pushEnabled, setPushEnabled] = useState(profile?.preferences?.notifications?.push ?? false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const updates = {
      full_name: formData.get('full_name') as string,
      budget_goal: formData.get('budget_goal') ? parseFloat(formData.get('budget_goal') as string) : null,
      preferences: {
        currency: formData.get('currency') as string,
        theme: formData.get('theme') as string,
        notifications: {
          email: formData.get('email_notifications') === 'on',
          push: formData.get('push_notifications') === 'on',
          days_before: [1, 3, 7], // Default reminder days
        },
      },
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (error) {
      setMessage('Error saving settings: ' + error.message)
    } else {
      setMessage('Settings saved successfully!')
      router.refresh()
    }

    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-2">SETTINGS</h1>
          <p className="text-muted-foreground">Manage your account and preferences.</p>
        </div>

        {message && (
          <div
            className={`brutal-card p-4 mb-6 ${
              message.includes('Error')
                ? 'bg-destructive/10 border-l-8 border-l-destructive'
                : 'bg-accent/10 border-l-8 border-l-accent'
            }`}
          >
            <p className="font-bold">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Section */}
          <div className="brutal-card p-6 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-6">PROFILE</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email || ''}
                  disabled
                  className="w-full p-3 border-2 border-border bg-muted text-muted-foreground font-mono cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="full_name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  defaultValue={profile?.full_name || ''}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="brutal-card p-6 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-6">PREFERENCES</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="currency">
                  Default Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  defaultValue={profile?.preferences?.currency || 'USD'}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="BDT">BDT (৳)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="budget_goal">
                  Monthly Budget Goal
                </label>
                <input
                  type="number"
                  id="budget_goal"
                  name="budget_goal"
                  defaultValue={profile?.budget_goal || ''}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  placeholder="e.g. 500"
                />
                <p className="text-xs text-muted-foreground mt-1">Set a target for your monthly subscription spending</p>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="theme">
                  Theme
                </label>
                <div className="mt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="brutal-card p-6 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-6">NOTIFICATIONS</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-border">
                <div>
                  <p className="font-bold">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive reminders via email</p>
                </div>
                <input
                  type="checkbox"
                  id="email_notifications"
                  name="email_notifications"
                  defaultChecked={profile?.preferences?.notifications?.email ?? true}
                  className="w-6 h-6 border-2 border-border accent-accent"
                />
              </div>

              <PushNotificationToggle
                enabled={pushEnabled}
                onToggle={(enabled) => {
                  console.log(enabled)
                  setPushEnabled(enabled)
                  if(checkboxRef.current && checkboxRef.current.checked !== enabled){
                    checkboxRef.current.checked = enabled
                  }
                }}
              />
              {/* Hidden checkbox for form submission */}
              <input
                ref={checkboxRef}
                type="checkbox"
                id="push_notifications"
                name="push_notifications"
                defaultChecked={profile?.preferences?.notifications?.push ?? false}
                className="hidden"
              />

              <div className="p-4 border-2 border-border bg-muted/30">
                <p className="font-bold mb-2">Reminder Schedule</p>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll receive reminders 1 day, 3 days, and 7 days before each billing date.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Custom schedules coming soon</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="brutal-btn px-8 py-3 font-bold flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            <Link
              href="/dashboard"
              className="px-8 py-3 font-bold border-2 border-border hover:bg-muted transition-colors text-center flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-12 brutal-card p-6 bg-card border-l-8 border-l-destructive">
          <h2 className="font-heading text-2xl font-bold mb-4 text-destructive">DANGER ZONE</h2>
          <p className="text-muted-foreground mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button onClick={() => {
            alert("Feature not implemented yet")
          }} className="px-6 py-3 font-bold border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors">
            Delete Account
          </button>
        </div>
      </main>
    </div>
  )
}
