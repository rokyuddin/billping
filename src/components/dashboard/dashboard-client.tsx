'use client'

import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { 
  Plus, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  LogOut, 
  Settings, 
  Search, 
  Filter, 
  ArrowUpDown,
  AlertTriangle,
  Download,
  FileText,
  Table as TableIcon
} from 'lucide-react'
import { signOut } from '@/app/actions/auth'
import { useState, useMemo } from 'react'
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

type SortOption = 'name' | 'amount' | 'next_billing_date' | 'category'
type SortDirection = 'asc' | 'desc'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('next_billing_date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const cats = new Set<string>()
    subscriptions.forEach((sub) => {
      if (sub.category) cats.add(sub.category)
    })
    return Array.from(cats).sort()
  }, [subscriptions])

  // Calculate totals
  const { monthlyTotal, yearlyTotal } = useMemo(() => {
    const monthly = subscriptions.reduce((sum, sub) => {
      if (sub.status !== 'active') return sum
      let monthlyAmount = sub.amount
      if (sub.billing_cycle === 'yearly') {
        monthlyAmount = sub.amount / 12
      } else if (sub.billing_cycle === 'weekly') {
        monthlyAmount = sub.amount * 4.33
      }
      return sum + monthlyAmount
    }, 0)
    return { monthlyTotal: monthly, yearlyTotal: monthly * 12 }
  }, [subscriptions])

  // Get upcoming subscriptions (next 7 days)
  const upcomingSubscriptions = useMemo(() => {
    const now = new Date()
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return subscriptions.filter((sub) => {
      const billDate = new Date(sub.next_billing_date)
      return billDate >= now && billDate <= weekFromNow && sub.status === 'active'
    })
  }, [subscriptions])

  // Get overdue subscriptions (past due date and still active)
  const overdueSubscriptions = useMemo(() => {
    const now = new Date()
    return subscriptions.filter((sub) => {
      const billDate = new Date(sub.next_billing_date)
      return billDate < now && sub.status === 'active'
    })
  }, [subscriptions])

  // Current date for display purposes
  const today = new Date()

  // Filter and sort subscriptions
  const filteredSubscriptions = useMemo(() => {
    let result = [...subscriptions]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (sub) =>
          sub.name.toLowerCase().includes(query) ||
          sub.category?.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((sub) => sub.category === categoryFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((sub) => sub.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'amount':
          comparison = a.amount - b.amount
          break
        case 'next_billing_date':
          comparison = new Date(a.next_billing_date).getTime() - new Date(b.next_billing_date).getTime()
          break
        case 'category':
          comparison = (a.category || '').localeCompare(b.category || '')
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [subscriptions, searchQuery, categoryFilter, statusFilter, sortBy, sortDirection])

  // Export functions
  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Amount', 'Currency', 'Billing Cycle', 'Next Billing Date', 'Status']
    const rows = subscriptions.map((sub) => [
      sub.name,
      sub.category || '',
      sub.amount.toString(),
      sub.currency,
      sub.billing_cycle,
      sub.next_billing_date,
      sub.status,
    ])

    const csvContent = [headers.join(','), ...rows.map((row) => row.map(cell => `"${cell}"`).join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `billping-subscriptions-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    setShowExportMenu(false)
  }

  const exportToPDF = () => {
    // Create a printable HTML document
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BillPing Subscriptions Export</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            .summary { margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px; }
            .summary p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background: #0f0f0f; color: white; }
            tr:nth-child(even) { background: #f9f9f9; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <h1>BillPing - Subscription Report</h1>
          <p style="color: #666;">Generated on ${new Date().toLocaleDateString()}</p>
          
          <div class="summary">
            <p><strong>Monthly Total:</strong> $${monthlyTotal.toFixed(2)}</p>
            <p><strong>Yearly Total:</strong> $${yearlyTotal.toFixed(2)}</p>
            <p><strong>Active Subscriptions:</strong> ${subscriptions.filter(s => s.status === 'active').length}</p>
            <p><strong>Overdue Bills:</strong> ${overdueSubscriptions.length}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Billing Cycle</th>
                <th>Next Billing Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${subscriptions.map(sub => `
                <tr>
                  <td>${sub.name}</td>
                  <td>${sub.category || '-'}</td>
                  <td>${sub.currency === 'USD' ? '$' : sub.currency === 'EUR' ? '€' : sub.currency === 'GBP' ? '£' : '৳'}${sub.amount.toFixed(2)}</td>
                  <td>${sub.billing_cycle}</td>
                  <td>${new Date(sub.next_billing_date).toLocaleDateString()}</td>
                  <td>${sub.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>BillPing - Stop burning money on forgotten subscriptions</p>
          </div>
        </body>
      </html>
    `
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
    setShowExportMenu(false)
  }



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
        <div className="grid md:grid-cols-4 gap-6 mb-8">
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
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">Active</h3>
              <div className="w-10 h-10 bg-chart-3 border-2 border-border rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-heading text-4xl font-bold">{subscriptions.filter(s => s.status === 'active').length}</p>
            <p className="text-sm text-muted-foreground mt-1">subscriptions</p>
          </div>

          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">Overdue</h3>
              <div className={`w-10 h-10 ${overdueSubscriptions.length > 0 ? 'bg-destructive' : 'bg-muted'} border-2 border-border rounded-full flex items-center justify-center`}>
                <AlertTriangle className={`w-5 h-5 ${overdueSubscriptions.length > 0 ? 'text-white' : 'text-muted-foreground'}`} />
              </div>
            </div>
            <p className={`font-heading text-4xl font-bold ${overdueSubscriptions.length > 0 ? 'text-destructive' : ''}`}>
              {overdueSubscriptions.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">bills overdue</p>
          </div>
        </div>

        {/* Overdue Bills Alert */}
        {overdueSubscriptions.length > 0 && (
          <div className="mb-8">
            <div className="brutal-card p-6 bg-destructive/10 border-l-8 border-l-destructive">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="font-heading text-xl font-bold text-destructive">OVERDUE BILLS</h2>
              </div>
              <div className="space-y-3">
                {overdueSubscriptions.map((sub) => {
                  const daysOverdue = Math.floor((today.getTime() - new Date(sub.next_billing_date).getTime()) / (1000 * 60 * 60 * 24))
                  return (
                    <Link key={sub.id} href={`/dashboard/subscription/${sub.id}`}>
                      <div className="flex items-center justify-between p-3 bg-card border-2 border-border hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-destructive/20 border-2 border-destructive rounded-sm flex items-center justify-center font-bold text-destructive">
                            {sub.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold">{sub.name}</p>
                            <p className="text-sm text-destructive font-medium">
                              {daysOverdue} day{daysOverdue > 1 ? 's' : ''} overdue
                            </p>
                          </div>
                        </div>
                        <p className="font-heading font-bold text-lg">${sub.amount.toFixed(2)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Bills */}
        {upcomingSubscriptions.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold mb-4">UPCOMING BILLS (Next 7 Days)</h2>
            <div className="brutal-card p-6 bg-chart-4/20 border-l-8 border-l-chart-4">
              <div className="space-y-3">
                {upcomingSubscriptions.map((sub) => (
                  <Link key={sub.id} href={`/dashboard/subscription/${sub.id}`}>
                    <div className="flex items-center justify-between hover:bg-card/50 p-2 -m-2 transition-colors">
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
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Subscriptions */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h2 className="font-heading text-2xl font-bold">ALL SUBSCRIPTIONS</h2>
            <div className="flex gap-2">
              {/* Export Button */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-4 py-2 font-bold border-2 border-border hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Export
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 brutal-card bg-card p-2 z-10">
                    <button
                      onClick={exportToCSV}
                      className="w-full text-left px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2"
                    >
                      <TableIcon className="w-4 h-4" /> Export as CSV
                    </button>
                    <button
                      onClick={exportToPDF}
                      className="w-full text-left px-3 py-2 hover:bg-muted font-medium text-sm flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" /> Export as PDF
                    </button>
                  </div>
                )}
              </div>
              <Link href="/dashboard/new" className="font-bold hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add New
              </Link>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="brutal-card p-4 bg-card mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 font-bold border-2 border-border flex items-center gap-2 transition-colors ${showFilters ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t-2 border-border grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block font-bold mb-1 text-sm uppercase">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full p-2 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block font-bold mb-1 text-sm uppercase">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-2 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block font-bold mb-1 text-sm uppercase">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full p-2 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  >
                    <option value="next_billing_date">Next Billing Date</option>
                    <option value="name">Name</option>
                    <option value="amount">Amount</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                {/* Sort Direction */}
                <div>
                  <label className="block font-bold mb-1 text-sm uppercase">Order</label>
                  <button
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    className="w-full p-2 border-2 border-border bg-input hover:bg-muted flex items-center justify-center gap-2 font-bold"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions
            </p>
          )}

          {filteredSubscriptions.length === 0 ? (
            <div className="brutal-card p-12 bg-card text-center">
              {subscriptions.length === 0 ? (
                <>
                  <p className="font-heading text-xl font-bold mb-2">NO SUBSCRIPTIONS YET.</p>
                  <p className="text-muted-foreground mb-6">Start tracking your recurring expenses.</p>
                  <Link href="/dashboard/new" className="brutal-btn px-6 py-3 font-bold inline-flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Your First Subscription
                  </Link>
                </>
              ) : (
                <>
                  <p className="font-heading text-xl font-bold mb-2">NO MATCHING SUBSCRIPTIONS.</p>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setCategoryFilter('all')
                      setStatusFilter('all')
                    }}
                    className="brutal-btn px-6 py-3 font-bold"
                  >
                    Clear Filters
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubscriptions.map((sub) => {
                const isOverdue = new Date(sub.next_billing_date) < today && sub.status === 'active'
                return (
                  <Link key={sub.id} href={`/dashboard/subscription/${sub.id}`}>
                    <div className={`brutal-card p-6 bg-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${isOverdue ? 'border-l-4 border-l-destructive' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${isOverdue ? 'bg-destructive/10' : 'bg-muted'} border-2 border-border rounded-sm flex items-center justify-center font-heading font-bold text-xl`}>
                          {sub.name.charAt(0)}
                        </div>
                        <div className="flex items-center gap-2">
                          {isOverdue && (
                            <span className="px-2 py-1 text-xs font-bold bg-destructive text-destructive-foreground border-2 border-destructive">
                              OVERDUE
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs font-bold border-2 border-border ${
                            sub.status === 'active' ? 'bg-accent text-accent-foreground' : 'bg-muted'
                          }`}>
                            {sub.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-1">{sub.name}</h3>
                      {sub.category && (
                        <p className="text-sm text-muted-foreground mb-3">{sub.category}</p>
                      )}
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="font-heading text-3xl font-bold">${sub.amount.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground">/ {sub.billing_cycle}</span>
                      </div>
                      <p className={`text-sm ${isOverdue ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                        {isOverdue ? 'Due: ' : 'Next: '}{new Date(sub.next_billing_date).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
