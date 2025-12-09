import Link from "next/link";
import Footer from "@/components/footer";
import CtaSection from "@/components/cta";
import PricingSection from "@/components/pricing";
import SocialProofSection from "@/components/social-proof";
import FeaturesGridSection from "@/components/features-grid";
import HeroSection from "@/components/hero";
import { createClient } from "@/lib/supabase/server";
import AuthButtons from "@/components/auth-buttons";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="border-b-2 border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl border-2 border-border brutal-shadow-sm">
              B
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">BillPing</span>
          </div>
          <nav className="hidden md:flex gap-6 font-medium">
            <Link href="#features" className="hover:underline decoration-2 underline-offset-4">Features</Link>
            <Link href="#pricing" className="hover:underline decoration-2 underline-offset-4">Pricing</Link>
            <Link href="#faq" className="hover:underline decoration-2 underline-offset-4">FAQ</Link>
          </nav>
<AuthButtons user={user} />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
       <HeroSection />

        {/* Features Grid */}
      <FeaturesGridSection />

        {/* Social Proof */}
        <SocialProofSection />

        {/* Pricing */}
       <PricingSection />

        {/* CTA */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
   
    </div>
  );
}
