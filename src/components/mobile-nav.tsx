'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BarChart3, Settings as SettingsIcon, LogOut, Plus } from 'lucide-react'
import { signOut } from '@/app/actions/auth'

type Profile = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
}

export default function MobileNav({
  userEmail,
  profile,
}: {
  userEmail: string
  profile: Profile | null
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 border-2 border-border hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-card border-l-2 border-border z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl border-2 border-border brutal-shadow-sm">
                B
              </div>
              <span className="font-heading font-bold text-xl">BillPing</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-sm transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="brutal-card p-4 bg-muted/50 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl">
                {profile?.full_name?.charAt(0).toUpperCase() || userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{profile?.full_name || 'User'}</p>
                <p className="text-sm text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 mb-8">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 font-bold hover:bg-muted transition-colors border-2 border-transparent hover:border-border flex items-center"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/analytics"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 font-bold hover:bg-muted transition-colors border-2 border-transparent hover:border-border flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" /> Analytics
            </Link>
            <Link
              href="/dashboard/new"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 font-bold hover:bg-muted transition-colors border-2 border-transparent hover:border-border flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Subscription
            </Link>
            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 font-bold hover:bg-muted transition-colors border-2 border-transparent hover:border-border flex items-center gap-2"
            >
              <SettingsIcon className="w-5 h-5" /> Settings
            </Link>
          </nav>

          {/* Logout Button */}
          <form action={signOut}>
            <button
              type="submit"
              className="w-full px-4 py-3 font-bold border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
