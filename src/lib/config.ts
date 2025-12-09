/**
 * Public runtime configuration
 * These values are embedded at build time and available in the browser
 */

export const publicConfig = {
  vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
} as const;

// Validate required config
if (typeof window === 'undefined') {
  // Server-side validation
  const missing: string[] = [];
  
  if (!publicConfig.supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!publicConfig.supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  if (!publicConfig.vapidPublicKey) {
    console.warn('NEXT_PUBLIC_VAPID_PUBLIC_KEY not set - push notifications will not work');
  }
}
