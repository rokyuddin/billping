import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createSubscription } from '@/app/actions/subscriptions'

export default function NewSubscriptionPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold mb-2">ADD NEW SUBSCRIPTION</h1>
          <p className="text-muted-foreground">Track a new recurring expense.</p>
        </div>

        <form action={createSubscription} className="brutal-card p-8 bg-card">
          <div className="space-y-6">
            <div>
              <label className="block font-bold mb-2 text-sm uppercase" htmlFor="name">
                Service Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                placeholder="Netflix, Spotify, etc."
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
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                  placeholder="9.99"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm uppercase" htmlFor="currency">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
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
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                >
                  <option value="">Select cycle</option>
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
                  className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm uppercase" htmlFor="website_url">
                Website URL (Optional)
              </label>
              <input
                type="url"
                id="website_url"
                name="website_url"
                className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                placeholder="https://example.com"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="brutal-btn px-8 py-3 font-bold flex-1">
                Add Subscription
              </button>
              <Link
                href="/dashboard"
                className="px-8 py-3 font-bold border-2 border-border hover:bg-muted transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
