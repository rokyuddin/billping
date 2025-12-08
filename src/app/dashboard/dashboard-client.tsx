'use client'

import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { Plus, TrendingUp, Calendar, DollarSign, LogOut, Settings } from 'lucide-react'
import { signOut } from '@/app/actions/auth'
import { useState } from 'react'
import OnboardingTour from '@/components/onboarding-tour'
import MobileNav from '@/components/mobile-nav'

type Subscription = {
  id: string
  name: string
  category: string | null
  amount: number
  currency: string
  billing_cycle: string
  next_billing_date: string
  status: string
  logo_url: string | null
}

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
}

export default function DashboardClient({
  user,
  profile,
  subscriptions,
}: {
  user: User
  profile: Profile | null
  subscriptions: Subscription[]
}) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Calculate total monthly cost
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    if (sub.status !== 'active') return sum
    
    let monthlyAmount = sub.amount
    if (sub.billing_cycle === 'yearly') {
      monthlyAmount = sub.amount / 12
    } else if (sub.billing_cycle === 'weekly') {
      monthlyAmount = sub.amount * 4.33
    }
    return sum + monthlyAmount
  }, 0)

  const yearlyTotal = monthlyTotal * 12

  // Get upcoming subscriptions (next 7 days)
  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const upcomingSubscriptions = subscriptions.filter((sub) => {
    const billDate = new Date(sub.next_billing_date)
    return billDate >= today && billDate <= nextWeek
  })

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Onboarding Tour */}
      <OnboardingTour />

      {/* Header */}
      <header className="border-b-2 border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl border-2 border-border brutal-shadow-sm">
              B
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">BillPing</span>
          </Link>
          
          <nav className="hidden md:flex gap-6 font-medium">
            <Link href="/dashboard" className="hover:underline decoration-2 underline-offset-4">
              Dashboard
            </Link>
            <Link href="/dashboard/analytics" className="hover:underline decoration-2 underline-offset-4">
              Analytics
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard/new" className="hidden sm:flex brutal-btn px-4 py-2 font-bold text-sm items-center gap-2">
              <Plus className="w-4 h-4" /> Add Subscription
            </Link>
            
            {/* Desktop User Menu */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-sm border-2 border-border"
              >
                <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                  {profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 brutal-card bg-card p-2">
                  <div className="px-3 py-2 border-b-2 border-border mb-2">
                    <p className="font-bold text-sm">{profile?.full_name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link href="/dashboard/settings" className="px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <form action={signOut}>
                    <button type="submit" className="w-full text-left px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2 text-destructive">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <MobileNav userEmail={user.email || ''} profile={profile} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">Monthly Cost</h3>
              <div className="w-10 h-10 bg-chart-1 border-2 border-border rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold">${monthlyTotal.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">per month</p>
          </div>

          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">Yearly Cost</h3>
              <div className="w-10 h-10 bg-chart-2 border-2 border-border rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold">${yearlyTotal.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">per year</p>
          </div>

          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">Active Subscriptions</h3>
              <div className="w-10 h-10 bg-chart-3 border-2 border-border rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold">{subscriptions.filter(s => s.status === 'active').length}</p>
            <p className="text-sm text-muted-foreground mt-1">subscriptions</p>
          </div>
        </div>

        {/* Upcoming Bills */}
        {upcomingSubscriptions.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">UPCOMING BILLS (Next 7 Days)</h2>
            <div className="brutal-card p-6 bg-chart-4/20 border-l-8 border-l-chart-4">
              <div className="space-y-3">
                {upcomingSubscriptions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-card border-2 border-border rounded-sm flex items-center justify-center font-bold">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(sub.next_billing_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="font-heading font-bold text-lg">${sub.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Subscriptions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl font-bold">ALL SUBSCRIPTIONS</h2>
            <Link href="/dashboard/new" className="font-bold hover:underline decoration-2 underline-offset-4">
              + Add New
            </Link>
          </div>

          {subscriptions.length === 0 ? (
            <div className="brutal-card p-12 bg-card text-center">
              <p className="font-heading text-xl font-bold mb-2">NO SUBSCRIPTIONS YET.</p>
              <p className="text-muted-foreground mb-6">Start tracking your recurring expenses.</p>
              <Link href="/dashboard/new" className="brutal-btn px-6 py-3 font-bold inline-flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Your First Subscription
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((sub) => (
                <Link key={sub.id} href={`/dashboard/subscription/${sub.id}`}>
                  <div className="brutal-card p-6 bg-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-muted border-2 border-border rounded-sm flex items-center justify-center font-heading font-bold text-xl">
                        {sub.name.charAt(0)}
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold border-2 border-border ${
                        sub.status === 'active' ? 'bg-accent text-accent-foreground' : 'bg-muted'
                      }`}>
                        {sub.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-1">{sub.name}</h3>
                    {sub.category && (
                      <p className="text-sm text-muted-foreground mb-3">{sub.category}</p>
                    )}
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-heading text-3xl font-bold">${sub.amount.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">/ {sub.billing_cycle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Next: {new Date(sub.next_billing_date).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
