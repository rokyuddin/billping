'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2, ExternalLink, Calendar, DollarSign, FileText } from 'lucide-react'
import { updateSubscription, deleteSubscription } from '@/app/actions/subscriptions'
import { format } from 'date-fns'

type Subscription = {
  id: string
  name: string
  category: string | null
  amount: number
  currency: string
  billing_cycle: string
  next_billing_date: string
  status: string
  website_url: string | null
  logo_url: string | null
  receipt_url: string | null
}

type Payment = {
  id: string
  amount: number
  date: string
  status: string
  notes: string | null
}

export default function SubscriptionDetailClient({
  subscription,
  payments,
}: {
  subscription: Subscription
  payments: Payment[]
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const categories = [
    'Entertainment',
    'Productivity',
    'Utilities',
    'Software',
    'Health & Fitness',
    'Education',
    'News & Media',
    'Cloud Storage',
    'Other',
  ]

  const billingCycles = ['monthly', 'yearly', 'weekly', 'custom']

  const handleDelete = async () => {
    await deleteSubscription(subscription.id)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex gap-2">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 font-bold border-2 border-border hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 font-bold border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!isEditing ? (
          // View Mode
          <div className="space-y-8">
            {/* Header Card */}
            <div className="brutal-card p-8 bg-card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted border-2 border-border rounded-sm flex items-center justify-center font-heading font-bold text-3xl">
                    {subscription.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="font-heading text-4xl font-bold mb-1">{subscription.name}</h1>
                    {subscription.category && (
                      <p className="text-muted-foreground">{subscription.category}</p>
                    )}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-bold border-2 border-border ${
                    subscription.status === 'active'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {subscription.status.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="brutal-card p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-chart-1" />
                    <p className="font-bold text-sm uppercase text-muted-foreground">Cost</p>
                  </div>
                  <p className="font-heading text-3xl font-bold">
                    {subscription.currency === 'USD' && '$'}
                    {subscription.currency === 'EUR' && '€'}
                    {subscription.currency === 'GBP' && '£'}
                    {subscription.currency === 'BDT' && '৳'}
                    {subscription.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">per {subscription.billing_cycle}</p>
                </div>

                <div className="brutal-card p-4 bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-chart-3" />
                    <p className="font-bold text-sm uppercase text-muted-foreground">Next Bill</p>
                  </div>
                  <p className="font-heading text-3xl font-bold">
                    {format(new Date(subscription.next_billing_date), 'MMM dd')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(subscription.next_billing_date), 'yyyy')}
                  </p>
                </div>
              </div>

              {subscription.website_url && (
                <div className="mt-6 pt-6 border-t-2 border-border">
                  <a
                    href={subscription.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold hover:underline decoration-2 underline-offset-4 mr-6"
                  >
                    Visit Website <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {subscription.receipt_url && (
                <div className={subscription.website_url ? "mt-2" : "mt-6 pt-6 border-t-2 border-border"}>
                  <a
                    href={subscription.receipt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-bold hover:underline decoration-2 underline-offset-4"
                  >
                    View Receipt <FileText className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Payment History */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">PAYMENT HISTORY</h2>
              {payments.length === 0 ? (
                <div className="brutal-card p-8 bg-card text-center">
                  <p className="text-muted-foreground">No payment history yet.</p>
                </div>
              ) : (
                <div className="brutal-card p-6 bg-card">
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between pb-4 border-b-2 border-border last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-bold">{format(new Date(payment.date), 'MMM dd, yyyy')}</p>
                          {payment.notes && (
                            <p className="text-sm text-muted-foreground">{payment.notes}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-heading font-bold text-lg">${payment.amount.toFixed(2)}</p>
                          <span
                            className={`text-xs font-bold ${
                              payment.status === 'paid'
                                ? 'text-accent'
                                : payment.status === 'pending'
                                ? 'text-chart-4'
                                : 'text-destructive'
                            }`}
                          >
                            {payment.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-3xl font-bold mb-6">EDIT SUBSCRIPTION</h2>
            <form action={updateSubscription.bind(null, subscription.id)} className="space-y-6">
              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="name">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={subscription.name}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue={subscription.category || ''}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2 text-sm uppercase" htmlFor="amount">
                    Amount *
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    required
                    step="0.01"
                    min="0"
                    defaultValue={subscription.amount}
                    className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 text-sm uppercase" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    defaultValue={subscription.currency}
                    className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2 text-sm uppercase" htmlFor="billing_cycle">
                    Billing Cycle *
                  </label>
                  <select
                    id="billing_cycle"
                    name="billing_cycle"
                    required
                    defaultValue={subscription.billing_cycle}
                    className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  >
                    {billingCycles.map((cycle) => (
                      <option key={cycle} value={cycle}>
                        {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-2 text-sm uppercase" htmlFor="next_billing_date">
                    Next Billing Date *
                  </label>
                  <input
                    type="date"
                    id="next_billing_date"
                    name="next_billing_date"
                    required
                    defaultValue={subscription.next_billing_date}
                    className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="status">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  defaultValue={subscription.status}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                >
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="paused">Paused</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="website_url">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  id="website_url"
                  name="website_url"
                  defaultValue={subscription.website_url || ''}
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="brutal-btn px-8 py-3 font-bold flex-1">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 font-bold border-2 border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="brutal-card p-8 bg-card max-w-md w-full">
            <h3 className="font-heading text-2xl font-bold mb-4">DELETE SUBSCRIPTION?</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete <strong>{subscription.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <form action={handleDelete} className="flex-1">
                <button
                  type="submit"
                  className="w-full brutal-btn bg-destructive text-destructive-foreground border-destructive px-6 py-3 font-bold"
                >
                  Delete Forever
                </button>
              </form>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 font-bold border-2 border-border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
