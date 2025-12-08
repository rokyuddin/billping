import { BarChart3, Bell, Zap } from 'lucide-react'
import React from 'react'

export default function FeaturesGridSection() {
  return (
      <section id="features" className="py-20 bg-muted/30 border-b-2 border-border">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">WHY YOU NEED THIS.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">Spreadsheets are boring. Bank statements are confusing. BillPing is neither.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="brutal-card p-6 bg-card relative group">
                <div className="absolute top-4 right-4 w-12 h-12 bg-chart-1 border-2 border-border flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3 mt-4">Smart Reminders</h3>
                <p className="text-muted-foreground">We ping you before you pay. Never get hit with a surprise renewal again. Customizable alerts via email or push.</p>
              </div>

              {/* Feature 2 */}
              <div className="brutal-card p-6 bg-card relative group">
                <div className="absolute top-4 right-4 w-12 h-12 bg-chart-2 border-2 border-border flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3 mt-4">Expense Analytics</h3>
                <p className="text-muted-foreground">See where your money bleeds. Visual breakdowns of your monthly burn rate by category and timeline.</p>
              </div>

              {/* Feature 3 */}
              <div className="brutal-card p-6 bg-card relative group">
                <div className="absolute top-4 right-4 w-12 h-12 bg-chart-3 border-2 border-border flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3 mt-4">Unified Dashboard</h3>
                <p className="text-muted-foreground">Netflix, Spotify, AWS, Gym. All in one command center. Sort, filter, and manage with god-like power.</p>
              </div>
            </div>
          </div>
        </section>
  )
}
