import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AddSubscriptionForm from '@/components/dashboard/add-subscription-form'

export default function NewSubscriptionPage() {
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

        <AddSubscriptionForm />
      </main>
    </div>
  )
}
