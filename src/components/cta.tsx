import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CtaSection() {
  return (
    <section className="py-20 bg-chart-4 border-b-2 border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8">READY TO STOP THE BLEEDING?</h2>
            <Link href="/signup" className="brutal-btn px-12 py-6 text-xl font-bold inline-flex items-center gap-3 bg-white text-black">
              Create Free Account <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="mt-6 font-medium">No credit card required for free plan.</p>
          </div>
        </section>
  )
}
