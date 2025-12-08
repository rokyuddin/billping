import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-heading text-5xl font-bold mb-4">TERMS OF SERVICE</h1>
          <p className="text-muted-foreground">Last updated: December 8, 2024</p>
        </div>

        <div className="space-y-8 prose prose-lg max-w-none">
          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">1. ACCEPTANCE OF TERMS</h2>
            <div className="space-y-4 text-foreground">
              <p>
                By accessing or using BillPing (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">2. DESCRIPTION OF SERVICE</h2>
            <div className="space-y-4 text-foreground">
              <p>
                BillPing is a subscription tracking and reminder service that helps you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Track recurring subscription payments</li>
                <li>Receive reminders before billing dates</li>
                <li>Analyze spending patterns</li>
                <li>Manage multiple subscriptions in one place</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">3. USER ACCOUNTS</h2>
            <div className="space-y-4 text-foreground">
              <p><strong>Account Creation:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must be at least 13 years old to use the Service</li>
                <li>One person or entity may not maintain more than one free account</li>
              </ul>
              <p className="mt-4"><strong>Account Security:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">4. USER RESPONSIBILITIES</h2>
            <div className="space-y-4 text-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use automated systems to access the Service without permission</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">5. SUBSCRIPTION PLANS & PAYMENT</h2>
            <div className="space-y-4 text-foreground">
              <p><strong>Free Plan:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Limited to 10 subscriptions</li>
                <li>Basic reminder features</li>
                <li>No payment required</li>
              </ul>
              <p className="mt-4"><strong>Paid Plans:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Billed monthly or annually</li>
                <li>Automatic renewal unless cancelled</li>
                <li>Refunds available within 14 days of initial purchase</li>
                <li>Price changes will be communicated 30 days in advance</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">6. INTELLECTUAL PROPERTY</h2>
            <div className="space-y-4 text-foreground">
              <p>
                The Service and its original content, features, and functionality are owned by BillPing and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p className="mt-4"><strong>Your Content:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You retain ownership of data you input into the Service</li>
                <li>You grant us a license to use your data to provide the Service</li>
                <li>We will not share your data with third parties except as described in our Privacy Policy</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">7. DISCLAIMER OF WARRANTIES</h2>
            <div className="space-y-4 text-foreground">
              <p>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="mt-4">
                We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Service will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>The Service is free of viruses or harmful components</li>
                <li>Results from using the Service will be accurate or reliable</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">8. LIMITATION OF LIABILITY</h2>
            <div className="space-y-4 text-foreground">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BILLPING SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">9. TERMINATION</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Breach of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Request by law enforcement</li>
                <li>Extended periods of inactivity</li>
              </ul>
              <p className="mt-4">
                You may terminate your account at any time through your account settings. Upon termination, your right to use the Service will immediately cease.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">10. CHANGES TO TERMS</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Posting the new Terms on this page</li>
                <li>Updating the &quot;Last updated&quot; date</li>
                <li>Sending an email notification (for significant changes)</li>
              </ul>
              <p className="mt-4">
                Your continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">11. GOVERNING LAW</h2>
            <div className="space-y-4 text-foreground">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which BillPing operates, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">12. CONTACT US</h2>
            <div className="space-y-4 text-foreground">
              <p>If you have questions about these Terms, please contact us:</p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:legal@billping.app" className="font-bold hover:underline">legal@billping.app</a></li>
                <li><strong>Website:</strong> <a href="https://billping.app" className="font-bold hover:underline">billping.app</a></li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
