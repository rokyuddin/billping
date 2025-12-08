import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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
          <h1 className="font-heading text-5xl font-bold mb-4">PRIVACY POLICY</h1>
          <p className="text-muted-foreground">Last updated: December 8, 2024</p>
        </div>

        <div className="space-y-8 prose prose-lg max-w-none">
          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">1. INFORMATION WE COLLECT</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We collect information you provide directly to us when you create an account, use our services, or communicate with us.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Email address, name, password (encrypted)</li>
                <li><strong>Subscription Data:</strong> Service names, amounts, billing dates you choose to track</li>
                <li><strong>Usage Data:</strong> How you interact with our service, features used</li>
                <li><strong>Device Information:</strong> Browser type, IP address, device identifiers</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">2. HOW WE USE YOUR INFORMATION</h2>
            <div className="space-y-4 text-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you billing reminders and notifications</li>
                <li>Respond to your comments and questions</li>
                <li>Detect, prevent, and address technical issues or fraud</li>
                <li>Analyze usage patterns to improve user experience</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">3. INFORMATION SHARING</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Supabase (database), Resend (email delivery)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">4. DATA SECURITY</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Encryption at rest for sensitive data</li>
                <li>Row Level Security (RLS) in our database</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">5. YOUR RIGHTS</h2>
            <div className="space-y-4 text-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your subscription data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from email notifications</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, visit your account settings or contact us at{' '}
                <a href="mailto:privacy@billping.app" className="font-bold hover:underline">
                  privacy@billping.app
                </a>
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">6. COOKIES & TRACKING</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We use cookies and similar technologies to maintain your session and improve your experience. You can control cookies through your browser settings.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for authentication and security</li>
                <li><strong>Analytics:</strong> Help us understand how you use our service</li>
                <li><strong>Preferences:</strong> Remember your settings and choices</li>
              </ul>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">7. CHILDREN&apos;S PRIVACY</h2>
            <div className="space-y-4 text-foreground">
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">8. CHANGES TO THIS POLICY</h2>
            <div className="space-y-4 text-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>
          </section>

          <section className="brutal-card p-8 bg-card">
            <h2 className="font-heading text-2xl font-bold mb-4">9. CONTACT US</h2>
            <div className="space-y-4 text-foreground">
              <p>If you have questions about this Privacy Policy, please contact us:</p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:privacy@billping.app" className="font-bold hover:underline">privacy@billping.app</a></li>
                <li><strong>Website:</strong> <a href="https://billping.app" className="font-bold hover:underline">billping.app</a></li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
