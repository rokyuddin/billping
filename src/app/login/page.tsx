import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signIn, signInWithGoogle } from "@/app/actions/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="brutal-card p-8 bg-card">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">WELCOME BACK.</h1>
            <p className="text-muted-foreground">Enter your credentials to access the command center.</p>
          </div>

          <form action={signIn} className="space-y-4">
            <div>
              <label className="block font-bold mb-1 text-sm uppercase" htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                required
                className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-bold mb-1 text-sm uppercase" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password"
                required
                className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="w-full brutal-btn py-3 font-bold mt-4">
              Sign In
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-0.5 bg-border flex-1"></div>
            <span className="font-bold text-xs uppercase text-muted-foreground">OR</span>
            <div className="h-0.5 bg-border flex-1"></div>
          </div>

          <form action={signInWithGoogle}>
            <button type="submit" className="w-full border-2 border-border py-3 font-bold hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/signup" className="font-bold hover:underline decoration-2 underline-offset-4">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
