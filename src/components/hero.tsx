import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
     <section className="py-20 md:py-32  bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 -skew-x-12 translate-x-1/2 border-l-2 border-border hidden lg:block"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block bg-chart-4 border-2 border-border px-3 py-1 font-bold text-xs uppercase tracking-wider mb-6 brutal-shadow-sm -rotate-2">
                Beta Access Open
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold leading-20 mb-6 tracking-tight">
                STOP BURNING MONEY ON <span className="bg-primary text-primary-foreground px-2">FORGOTTEN</span> SUBSCRIPTIONS.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                The brutally simple tracker for your recurring digital life. Get alerts, track spending, and cancel the noise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="brutal-btn px-8 py-4 text-lg font-bold flex items-center justify-center gap-2">
                  Start Tracking - Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#demo" className="px-8 py-4 text-lg font-bold border-2 border-border bg-background hover:bg-muted transition-colors flex items-center justify-center brutal-shadow">
                  View Live Demo
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-4 text-sm font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-border"></div>
                  ))}
                </div>
                <p>Trusted by 1,000+ money savers</p>
              </div>
            </div>
          </div>
        </section>
  )
}
