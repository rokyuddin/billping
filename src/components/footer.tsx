import Link from 'next/link'

export default function Footer() {
  return (
         <footer className="py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-border">B</div>
            <span className="font-heading font-bold text-xl">BillPing</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground hover:underline">Terms</Link>
            <Link href="/contact" className="hover:text-foreground hover:underline">Contact</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 BillPing. Built with hate for hidden fees.
          </div>
        </div>
      </footer>
  )
}
