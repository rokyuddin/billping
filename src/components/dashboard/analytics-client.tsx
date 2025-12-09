'use client'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, PieChart as PieChartIcon, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns'

type Subscription = {
  id: string
  name: string
  category: string | null
  amount: number
  currency: string
  billing_cycle: string
  status: string
}

type Payment = {
  id: string
  subscription_id: string
  amount: number
  date: string
  status: string
}

export default function AnalyticsClient({
  subscriptions,
  payments,
}: {
  subscriptions: Subscription[]
  payments: Payment[]
}) {
  // Calculate category breakdown
  const categoryData = subscriptions
    .filter((sub) => sub.status === 'active')
    .reduce((acc, sub) => {
      const category = sub.category || 'Other'
      const existing = acc.find((item) => item.name === category)
      
      let monthlyAmount = sub.amount
      if (sub.billing_cycle === 'yearly') {
        monthlyAmount = sub.amount / 12
      } else if (sub.billing_cycle === 'weekly') {
        monthlyAmount = sub.amount * 4.33
      }

      if (existing) {
        existing.value += monthlyAmount
      } else {
        acc.push({ name: category, value: monthlyAmount })
      }
      return acc
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value)

  // Calculate monthly spending trend (last 6 months)
  const last6Months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date(),
  })

  const monthlyTrend = last6Months.map((month) => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)

    const monthPayments = payments.filter((payment) => {
      const paymentDate = new Date(payment.date)
      return paymentDate >= monthStart && paymentDate <= monthEnd && payment.status === 'paid'
    })

    const total = monthPayments.reduce((sum, payment) => sum + payment.amount, 0)

    return {
      month: format(month, 'MMM'),
      amount: total,
    }
  })

  // Colors for charts
  const COLORS = ['#2563eb', '#a3e635', '#ec4899', '#facc15', '#9ca3af', '#3b82f6', '#84cc16']

  const totalMonthly = categoryData.reduce((sum, cat) => sum + cat.value, 0)
  const totalYearly = totalMonthly * 12

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="font-heading text-xl font-bold">ANALYTICS</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-chart-1" />
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">
                Monthly Average
              </h3>
            </div>
            <p className="font-heading text-4xl font-bold">${totalMonthly.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">per month</p>
          </div>

          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-chart-2" />
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">
                Yearly Total
              </h3>
            </div>
            <p className="font-heading text-4xl font-bold">${totalYearly.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">per year</p>
          </div>

          <div className="brutal-card p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <PieChartIcon className="w-5 h-5 text-chart-3" />
              <h3 className="font-heading font-bold text-sm uppercase text-muted-foreground">
                Categories
              </h3>
            </div>
            <p className="font-heading text-4xl font-bold">{categoryData.length}</p>
            <p className="text-sm text-muted-foreground mt-1">active categories</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <div className="brutal-card p-6 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-6">SPENDING BY CATEGORY</h2>
            {categoryData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            <div className="mt-6 space-y-2">
              {categoryData.slice(0, 5).map((cat, index) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 border-2 border-border"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span className="font-heading font-bold">${cat.value.toFixed(2)}/mo</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="brutal-card p-6 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-6">SPENDING TREND (6 MONTHS)</h2>
            {monthlyTrend.every((m) => m.amount === 0) ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No payment data available
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #0f0f0f',
                        borderRadius: '0',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="#2563eb" name="Monthly Spending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* Top Subscriptions */}
        <div className="mt-8">
          <h2 className="font-heading text-2xl font-bold mb-4">TOP SUBSCRIPTIONS</h2>
          <div className="brutal-card p-6 bg-card">
            <div className="space-y-4">
              {subscriptions
                .filter((sub) => sub.status === 'active')
                .sort((a, b) => {
                  const aMonthly = a.billing_cycle === 'yearly' ? a.amount / 12 : a.amount
                  const bMonthly = b.billing_cycle === 'yearly' ? b.amount / 12 : b.amount
                  return bMonthly - aMonthly
                })
                .slice(0, 5)
                .map((sub, index) => {
                  const monthlyAmount =
                    sub.billing_cycle === 'yearly'
                      ? sub.amount / 12
                      : sub.billing_cycle === 'weekly'
                      ? sub.amount * 4.33
                      : sub.amount

                  return (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between pb-4 border-b-2 border-border last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted border-2 border-border rounded-sm flex items-center justify-center font-heading font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-bold">{sub.name}</p>
                          <p className="text-sm text-muted-foreground">{sub.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-heading font-bold text-lg">${monthlyAmount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
