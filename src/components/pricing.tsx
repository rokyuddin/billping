import { Check } from 'lucide-react'
import Link from 'next/link'

export default function PricingSection() {
  return (
     <section id="pricing" className="py-20 bg-muted/30 border-b-2 border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">SIMPLE PRICING.</h2>
              <p className="text-xl text-muted-foreground">No hidden fees. No nonsense.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free */}
              <div className="brutal-card p-8 bg-card flex flex-col">
                <h3 className="font-heading text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> 5 Subscriptions</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Basic Reminders</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Monthly Summary</li>
                </ul>
                <Link href="/signup" className="w-full border-2 border-border py-3 font-bold text-center hover:bg-muted transition-colors">Start Free</Link>
              </div>

              {/* Pro */}
              <div className="brutal-card p-8 bg-primary text-primary-foreground flex flex-col relative transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold border-l-2 border-b-2 border-border">POPULAR</div>
                <h3 className="font-heading text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-6">$5<span className="text-lg text-primary-foreground/70 font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> Unlimited Subscriptions</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> Custom Reminders</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> Advanced Analytics</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> Multi-currency</li>
                </ul>
                <Link href="/signup?plan=pro" className="w-full bg-accent text-accent-foreground border-2 border-transparent py-3 font-bold text-center hover:bg-accent/90 transition-colors brutal-shadow">Go Pro</Link>
              </div>

              {/* Business */}
              <div className="brutal-card p-8 bg-card flex flex-col">
                <h3 className="font-heading text-2xl font-bold mb-2">Business</h3>
                <div className="text-4xl font-bold mb-6">$15<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Team Management</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> API Access</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /> Priority Support</li>
                </ul>
                <a href="mailto:sales@billping.app" className="w-full border-2 border-border py-3 font-bold text-center hover:bg-muted transition-colors block">Contact Sales</a>
              </div>
            </div>
          </div>
        </section>
  )
}
